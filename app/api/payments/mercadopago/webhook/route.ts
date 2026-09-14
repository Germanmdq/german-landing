import { NextResponse } from 'next/server';
import { processMercadoPagoPayment, verifyMercadoPagoSignature } from '../../../../lib/server/mercadopago-api';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { data?: { id?: string | number }; id?: string | number };
  const url = new URL(request.url);
  const dataId = String(body.data?.id ?? body.id ?? url.searchParams.get('data.id') ?? url.searchParams.get('id') ?? '').toLowerCase();
  const valid = verifyMercadoPagoSignature({ signature: request.headers.get('x-signature'), requestId: request.headers.get('x-request-id'), dataId, secret: process.env.MERCADOPAGO_WEBHOOK_SECRET });
  if (!dataId || !valid) return NextResponse.json({ error: 'Firma inválida.' }, { status: 401 });
  try { await processMercadoPagoPayment(dataId); return NextResponse.json({ received: true }); }
  catch (error) { console.error('[pagos] webhook de Mercado Pago rechazado:', error); return NextResponse.json({ error: 'No pudimos procesar la notificación.' }, { status: 400 }); }
}
