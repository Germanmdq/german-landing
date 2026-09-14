import { NextResponse } from 'next/server';
import { isPaymentPlan, PAYMENT_PLANS } from '../../../../lib/payments';
import { createPayPalOrder } from '../../../../lib/server/paypal-api';
import { authenticateRequest, createPaymentAttempt, paymentProviderAvailability, updatePayment } from '../../../../lib/server/payment-server';

export async function POST(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { plan?: unknown };
  if (!isPaymentPlan(body.plan)) return NextResponse.json({ error: 'Elegí una opción de acceso válida.' }, { status: 400 });
  if (!paymentProviderAvailability().paypal) return NextResponse.json({ error: 'PayPal estará disponible próximamente.' }, { status: 503 });
  try {
    const pricing = PAYMENT_PLANS[body.plan];
    const payment = await createPaymentAttempt({ userId: user.id, provider: 'paypal', plan: body.plan, amount: pricing.amount, currency: pricing.currency });
    const checkout = await createPayPalOrder({ paymentId: payment.id, plan: body.plan });
    await updatePayment(payment.id, { provider_order_id: checkout.orderId });
    return NextResponse.json({ checkoutUrl: checkout.checkoutUrl });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'No pudimos iniciar el pago.' }, { status: 502 }); }
}
