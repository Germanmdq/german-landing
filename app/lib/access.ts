// Decisión de acceso a partir de telegram_accounts, sin dependencias de
// servidor para poder testearla. El vencimiento de la prueba sólo bloquea la
// interfaz: no borra ni modifica inscripciones, entregas ni progreso.

export type AccessAccount = {
  access_tier?: string | null;
  trial_expires_at?: string | null;
  permissions?: unknown;
} | null | undefined;

export type AccessDecision = {
  active: boolean;
  blocked: boolean;
  trialExpired: boolean;
  accessTier: string;
  permissions: Record<string, boolean>;
};

export function resolveAccess(account: AccessAccount, now: Date = new Date()): AccessDecision {
  const rawPermissions = account?.permissions;
  const permissions = rawPermissions && typeof rawPermissions === 'object' && !Array.isArray(rawPermissions)
    ? rawPermissions as Record<string, boolean>
    : {};
  const accessTier = account?.access_tier ?? 'active';
  const blocked = accessTier === 'blocked' || permissions.all === false;
  // Sólo una cuenta en prueba con vencimiento ya pasado. Fundadores, activos,
  // limitados y cuentas sin registro de Telegram nunca vencen.
  const expiresAt = account?.trial_expires_at ? new Date(account.trial_expires_at) : null;
  const trialExpired = !blocked
    && accessTier === 'trial'
    && Boolean(expiresAt && !Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() <= now.getTime());
  return { active: !blocked && !trialExpired, blocked, trialExpired, accessTier, permissions };
}
