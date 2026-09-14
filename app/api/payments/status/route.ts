import { NextResponse } from 'next/server';
import { hasActiveAccess } from '../../../lib/payments';
import { authenticateRequest, findPaymentById, getEntitlement } from '../../../lib/server/payment-server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  const paymentId = new URL(request.url).searchParams.get('payment');
  if (!paymentId) return NextResponse.json({ error: 'Falta la referencia del pago.' }, { status: 400 });
  try {
    const payment = await findPaymentById(paymentId);
    if (!payment || payment.user_id !== user.id) return NextResponse.json({ error: 'No encontramos ese pago.' }, { status: 404 });
    const entitlement = await getEntitlement(user.id);
    return NextResponse.json({ status: payment.status, active: hasActiveAccess(entitlement), entitlement }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'No pudimos consultar el pago.' }, { status: 503 });
  }
}
