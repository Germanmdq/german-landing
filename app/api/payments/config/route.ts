import { NextResponse } from 'next/server';
import { PAYMENT_PLANS, type PaymentPlan } from '../../../lib/payments';
import { mercadoPagoPricing, paymentProviderAvailability } from '../../../lib/server/payment-server';

export const dynamic = 'force-dynamic';

export function GET() {
  const mercadoPagoPrices = Object.fromEntries((Object.keys(PAYMENT_PLANS) as PaymentPlan[]).flatMap((plan) => {
    const price = mercadoPagoPricing(plan);
    return price ? [[plan, price]] : [];
  }));
  return NextResponse.json({ providers: paymentProviderAvailability(), mercadoPagoPrices, paypalClientId: process.env.PAYPAL_CLIENT_ID || null }, { headers: { 'Cache-Control': 'no-store' } });
}
