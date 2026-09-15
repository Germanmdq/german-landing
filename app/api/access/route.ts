import { NextResponse } from 'next/server';
import { hasAccess } from '../../lib/payments';
import { authenticateRequest, getEntitlement } from '../../lib/server/payment-server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  try {
    const entitlement = await getEntitlement(user.id);
    return NextResponse.json({ active: hasAccess(entitlement, user.created_at) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'No pudimos consultar tu acceso.' }, { status: 503 });
  }
}
