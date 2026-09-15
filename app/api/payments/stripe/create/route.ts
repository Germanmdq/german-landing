import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isPaymentPlan, PAYMENT_PLANS } from '../../../../lib/payments';
import { authenticateRequest, createPaymentAttempt, paymentProviderAvailability } from '../../../../lib/server/payment-server';

export async function POST(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  if (!paymentProviderAvailability().stripe) return NextResponse.json({ error: 'El pago con tarjeta estará disponible próximamente.' }, { status: 503 });
  const body = await request.json().catch(() => ({})) as { plan?: unknown };
  if (!isPaymentPlan(body.plan)) return NextResponse.json({ error: 'Elegí una opción de acceso válida.' }, { status: 400 });
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: 'Stripe todavía no está configurado.' }, { status: 503 });
  try {
    const plan = PAYMENT_PLANS[body.plan];
    const payment = await createPaymentAttempt({ userId: user.id, provider: 'stripe', plan: body.plan, amount: plan.amount, currency: plan.currency });
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email || undefined,
      line_items: [{ price_data: { currency: 'usd', product_data: { name: `Germán Asistente · ${plan.name}` }, unit_amount: Math.round(Number(plan.amount) * 100) }, quantity: 1 }],
      metadata: { payment_id: payment.id, plan: body.plan },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://german.elclubdelaimaginacion.com'}/payment/success?provider=stripe&payment=${payment.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://german.elclubdelaimaginacion.com'}/payment/cancelled?provider=stripe&payment=${payment.id}`,
    });
    const { updatePayment } = await import('../../../../lib/server/payment-server');
    await updatePayment(payment.id, { provider_order_id: session.id });
    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'No pudimos iniciar el pago.' }, { status: 502 }); }
}
