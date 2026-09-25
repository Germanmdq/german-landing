import { NextResponse } from 'next/server';
import { authenticateRequest, getAdminClient } from '../../lib/server/app-server';
import { resolveAccess } from '../../lib/access';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });

  // El acceso general queda abierto salvo dos casos: cuenta bloqueada o prueba
  // de 72 horas vencida (sólo access_tier = 'trial'). Las excepciones por
  // sección se administran desde telegram_accounts.permissions: un permiso
  // ausente significa permitido; sólo un `false` explícito bloquea esa sección.
  const { data: telegramAccount, error } = await getAdminClient()
    .from('telegram_accounts')
    .select('access_tier,permissions,trial_expires_at')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: 'No pudimos comprobar tus permisos.' }, { status: 500 });

  return NextResponse.json(resolveAccess(telegramAccount), { headers: { 'Cache-Control': 'no-store' } });
}
