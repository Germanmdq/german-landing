import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '../../../../lib/server/paypal-api';
import { authenticateRequest, findPaymentById } from '../../../../lib/server/payment-server';

export async function POST(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { payment?: string; token?: string };
  if (!body.payment || !body.token) return NextResponse.json({ error: 'Falta la referencia del pago.' }, { status: 400 });
  try {
    const payment = await findPaymentById(body.payment, 'paypal');
    if (!payment || payment.user_id !== user.id || payment.provider_order_id !== body.token) return NextResponse.json({ error: 'La orden no corresponde a esta cuenta.' }, { status: 403 });
    const result = await capturePayPalOrder(body.token, `${payment.id}c`);
    return NextResponse.json(result);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'No pudimos confirmar el pago.' }, { status: 502 }); }
}
