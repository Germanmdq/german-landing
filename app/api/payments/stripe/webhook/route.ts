import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateVerifiedPayment } from '../../../../lib/payments';
import { findPaymentById, updatePayment, userExists } from '../../../../lib/server/payment-server';

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) return NextResponse.json({ error: 'Stripe no está configurado.' }, { status: 503 });
  const stripe = new Stripe(secret);
  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Firma inválida.' }, { status: 401 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret); }
  catch { return NextResponse.json({ error: 'Firma inválida.' }, { status: 401 }); }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const paymentId = session.metadata?.payment_id;
    if (paymentId && session.payment_status === 'paid') {
      const payment = await findPaymentById(paymentId, 'stripe');
      if (payment && payment.provider_order_id === session.id && !(payment as { processed_at?: string }).processed_at) {
        const ok = validateVerifiedPayment({ plan: session.metadata?.plan, amount: (session.amount_total || 0) / 100, currency: session.currency, status: 'approved', userExists: await userExists(payment.user_id), referenceMatches: true }, String(payment.amount), payment.currency);
        if (ok.ok) await updatePayment(payment.id, { status: 'approved', provider_payment_id: session.payment_intent, approved_at: new Date().toISOString(), raw_metadata: { event_id: event.id } });
        else await updatePayment(payment.id, { status: 'failed', raw_metadata: { event_id: event.id, verification_error: ok.reason } });
      }
    }
  }
  return NextResponse.json({ received: true });
}
