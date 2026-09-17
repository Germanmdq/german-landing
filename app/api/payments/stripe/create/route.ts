import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { authenticateRequest, paymentProviderAvailability } from '../../../../lib/server/payment-server';

export async function POST(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  if (!paymentProviderAvailability().stripe) return NextResponse.json({ error: 'El pago con tarjeta estará disponible próximamente.' }, { status: 503 });
  const secret = process.env.STRIPE_SECRET_KEY;
  const monthlyPriceId = process.env.STRIPE_MONTHLY_PRICE_ID;
  if (!secret || !monthlyPriceId) return NextResponse.json({ error: 'Stripe todavía no está configurado.' }, { status: 503 });
  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email || undefined,
      line_items: [{ price: monthlyPriceId, quantity: 1 }],
      client_reference_id: user.id,
      metadata: { user_id: user.id },
      subscription_data: { metadata: { user_id: user.id } },
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://german.elclubdelaimaginacion.com'}/payment/success?provider=stripe&subscription=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://german.elclubdelaimaginacion.com'}/access`,
    });
    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'No pudimos iniciar el pago.' }, { status: 502 }); }
}
