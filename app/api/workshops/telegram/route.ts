import { NextResponse } from 'next/server';
import { authenticateRequest, getAdminClient } from '../../../lib/server/app-server';
import { resolveAccess } from '../../../lib/access';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  const { data: account, error } = await getAdminClient()
    .from('telegram_accounts')
    .select('access_tier,permissions,trial_expires_at')
    .eq('user_id', user.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: 'No pudimos comprobar tu acceso.' }, { status: 500 });
  if (!resolveAccess(account).active) {
    return NextResponse.json({ error: 'Tu acceso no está habilitado en este momento.' }, { status: 403 });
  }
  const url = process.env.TELEGRAM_WORKSHOPS_URL?.trim();
  if (!url) return NextResponse.json({ error: 'El acceso a Telegram se habilitará próximamente.' }, { status: 503 });
  return NextResponse.json({ url }, { headers: { 'Cache-Control': 'no-store' } });
}
