import { NextResponse } from 'next/server';
import { authenticateRequest } from '../../lib/server/payment-server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Necesitás iniciar sesión.' }, { status: 401 });
  // TEMPORARY QA MODE: authenticated users have unrestricted access while Germán tests the app.
  // Restore the entitlement/initial-window check here when the paywall is re-enabled.
  return NextResponse.json({ active: true }, { headers: { 'Cache-Control': 'no-store' } });
}
