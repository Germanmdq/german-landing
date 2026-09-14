import { NextResponse } from 'next/server';
import { hasActiveAccess } from '../../../lib/payments';
import { authenticateRequest, getEntitlement } from '../../../lib/server/payment-server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  const entitlement = await getEntitlement(user.id).catch(() => null);
  if (!hasActiveAccess(entitlement)) return NextResponse.json({ error: 'Los talleres en vivo están incluidos con tu acceso al Club.' }, { status: 403 });
  const url = process.env.TELEGRAM_WORKSHOPS_URL?.trim();
  if (!url) return NextResponse.json({ error: 'El acceso a Telegram se habilitará próximamente.' }, { status: 503 });
  return NextResponse.json({ url }, { headers: { 'Cache-Control': 'no-store' } });
}
