import { NextResponse } from 'next/server';
import { verifyAndProcessPayPalOrder, verifyPayPalWebhook } from '../../../../lib/server/paypal-api';

export async function POST(request: Request) {
  const event = await request.json().catch(() => null) as { event_type?: string; resource?: { supplementary_data?: { related_ids?: { order_id?: string } } } } | null;
  if (!event || !await verifyPayPalWebhook(request.headers, event)) return NextResponse.json({ error: 'Firma inválida.' }, { status: 401 });
  if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    const orderId = event.resource?.supplementary_data?.related_ids?.order_id;
    if (orderId) {
      try { await verifyAndProcessPayPalOrder(orderId); }
      catch (error) { console.error('[pagos] webhook de PayPal rechazado:', error); return NextResponse.json({ error: 'No pudimos verificar la orden.' }, { status: 400 }); }
    }
  }
  return NextResponse.json({ received: true });
}
