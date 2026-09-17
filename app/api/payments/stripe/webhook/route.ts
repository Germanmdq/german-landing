import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminClient } from '../../../../lib/server/payment-server';

function stripeId(value: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null {
  if (!value) return null;
  return typeof value === 'string' ? value : value.id;
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.user_id;
  if (!userId) return;
  const admin = getAdminClient();
  const item = subscription.items.data[0];
  const periodEnd = item?.current_period_end ? new Date(item.current_period_end * 1000).toISOString() : null;

  await admin.from('stripe_subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: stripeId(subscription.customer),
    stripe_subscription_id: subscription.id,
    stripe_price_id: item?.price?.id || null,
    status: subscription.status,
    current_period_end: periodEnd,
    cancel_at_period_end: subscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });

  const grantsAccess = ['active', 'trialing', 'past_due'].includes(subscription.status);
  if (grantsAccess && periodEnd) {
    await admin.from('user_entitlements').upsert({
      user_id: userId,
      access_until: periodEnd,
      lifetime: false,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  }
}

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
    if (typeof session.subscription === 'string') await syncSubscription(await stripe.subscriptions.retrieve(session.subscription));
  }

  if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    await syncSubscription(event.data.object as Stripe.Subscription);
  }

  if (event.type === 'invoice.paid' || event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = typeof invoice.parent?.subscription_details?.subscription === 'string' ? invoice.parent.subscription_details.subscription : null;
    if (subscriptionId) await syncSubscription(await stripe.subscriptions.retrieve(subscriptionId));
  }

  return NextResponse.json({ received: true });
}
