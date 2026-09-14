import { NextResponse } from 'next/server';
import { isPaymentPlan } from '../../../../lib/payments';
import { createMercadoPagoPreference } from '../../../../lib/server/mercadopago-api';
import { authenticateRequest, createPaymentAttempt, mercadoPagoPricing, paymentProviderAvailability, updatePayment } from '../../../../lib/server/payment-server';

export async function POST(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { plan?: unknown };
  if (!isPaymentPlan(body.plan)) return NextResponse.json({ error: 'Elegí una opción de acceso válida.' }, { status: 400 });
  const pricing = mercadoPagoPricing(body.plan);
  if (!paymentProviderAvailability().mercadopago || !pricing) return NextResponse.json({ error: 'Mercado Pago estará disponible próximamente.' }, { status: 503 });
  try {
    const payment = await createPaymentAttempt({ userId: user.id, provider: 'mercadopago', plan: body.plan, amount: pricing.amount, currency: pricing.currency });
    const checkout = await createMercadoPagoPreference({ paymentId: payment.id, plan: body.plan, email: user.email });
    await updatePayment(payment.id, { provider_order_id: checkout.orderId });
    return NextResponse.json({ checkoutUrl: checkout.checkoutUrl });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'No pudimos iniciar el pago.' }, { status: 502 });
  }
}
