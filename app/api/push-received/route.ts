import { NextResponse } from 'next/server';
import { getAdminClient } from '../../lib/server/payment-server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { deliveryId?: unknown } | null;
  const deliveryId = typeof body?.deliveryId === 'string' ? body.deliveryId.trim() : '';

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(deliveryId)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const admin = getAdminClient();
    const { error } = await admin.rpc('mark_taller_delivery_received', { p_delivery_id: deliveryId });
    if (error) {
      console.error('[push-received] no se pudo marcar received_at:', error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[push-received] error inesperado:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
