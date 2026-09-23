import { NextResponse } from 'next/server';
import { authenticateRequest, getAdminClient } from '../../lib/server/app-server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });

  // El acceso general queda abierto. Las excepciones se administran por persona
  // desde telegram_accounts.permissions. Un permiso ausente significa permitido;
  // sólo un `false` explícito bloquea esa sección.
  const { data: telegramAccount, error } = await getAdminClient()
    .from('telegram_accounts')
    .select('access_tier,permissions')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: 'No pudimos comprobar tus permisos.' }, { status: 500 });

  const rawPermissions = telegramAccount?.permissions;
  const permissions = rawPermissions && typeof rawPermissions === 'object' && !Array.isArray(rawPermissions)
    ? rawPermissions as Record<string, boolean>
    : {};
  const blocked = telegramAccount?.access_tier === 'blocked' || permissions.all === false;

  return NextResponse.json({
    active: true,
    blocked,
    accessTier: telegramAccount?.access_tier ?? 'active',
    permissions,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
