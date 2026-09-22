import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')!;
const APP_URL = 'https://german.elclubdelaimaginacion.com/telegram';
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type TelegramUser = {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function hexToBytes(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index += 1) bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  return bytes;
}

async function hmac(key: Uint8Array | string, data: string) {
  const encoder = new TextEncoder();
  const rawKey = typeof key === 'string' ? encoder.encode(key) : key;
  const cryptoKey = await crypto.subtle.importKey('raw', rawKey, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data)));
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) mismatch |= a[index] ^ b[index];
  return mismatch === 0;
}

async function validateInitData(initData: string): Promise<TelegramUser | null> {
  if (!TELEGRAM_BOT_TOKEN || !initData) return null;
  const params = new URLSearchParams(initData);
  const receivedHash = params.get('hash');
  if (!receivedHash || !/^[0-9a-f]{64}$/i.test(receivedHash)) return null;

  const authDate = Number(params.get('auth_date'));
  const ageSeconds = Math.floor(Date.now() / 1000) - authDate;
  if (!Number.isFinite(authDate) || ageSeconds < -60 || ageSeconds > 86_400) return null;

  const dataCheckString = [...params.entries()]
    .filter(([key]) => key !== 'hash')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secretKey = await hmac('WebAppData', TELEGRAM_BOT_TOKEN);
  const calculatedHash = await hmac(secretKey, dataCheckString);
  if (!constantTimeEqual(calculatedHash, hexToBytes(receivedHash))) return null;

  const rawUser = params.get('user');
  if (!rawUser) return null;
  try {
    const user = JSON.parse(rawUser) as TelegramUser;
    if (!Number.isSafeInteger(user.id) || user.id <= 0 || user.is_bot || !user.first_name) return null;
    return user;
  } catch {
    return null;
  }
}

async function getOrCreateUser(telegramUser: TelegramUser) {
  const { data: linked, error: linkedError } = await supabase
    .from('telegram_accounts')
    .select('user_id,welcome_sent_at')
    .eq('telegram_user_id', telegramUser.id)
    .maybeSingle();
  if (linkedError) throw linkedError;

  let userId = linked?.user_id as string | undefined;
  let welcomeSentAt = linked?.welcome_sent_at as string | null | undefined;
  if (!userId) {
    const email = `telegram-${telegramUser.id}@users.asistentegerman.app`;
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        full_name: [telegramUser.first_name, telegramUser.last_name].filter(Boolean).join(' '),
        telegram_user_id: telegramUser.id,
        telegram_username: telegramUser.username || null,
      },
      app_metadata: { provider: 'telegram' },
    });
    if (createError || !created.user) throw createError || new Error('No se pudo crear el usuario.');
    userId = created.user.id;

    const { error: accountError } = await supabase.from('telegram_accounts').insert({
      telegram_user_id: telegramUser.id,
      user_id: userId,
      chat_id: telegramUser.id,
      username: telegramUser.username || null,
      first_name: telegramUser.first_name,
      last_name: telegramUser.last_name || null,
      language_code: telegramUser.language_code || null,
    });
    if (accountError) throw accountError;
    welcomeSentAt = null;
  } else {
    const { error: updateError } = await supabase.from('telegram_accounts').update({
      chat_id: telegramUser.id,
      username: telegramUser.username || null,
      first_name: telegramUser.first_name,
      last_name: telegramUser.last_name || null,
      language_code: telegramUser.language_code || null,
      updated_at: new Date().toISOString(),
    }).eq('telegram_user_id', telegramUser.id);
    if (updateError) throw updateError;
  }

  if (!welcomeSentAt) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramUser.id,
          text: 'Tu espacio en Asistente Germán ya está listo.\n\nDesde este chat vas a recibir tus avisos y podés volver a entrar cuando quieras.',
          reply_markup: {
            inline_keyboard: [[{
              text: 'Abrir Asistente Germán',
              web_app: { url: APP_URL },
            }]],
          },
        }),
      });

      const result = await response.json().catch(() => null) as { ok?: boolean; description?: string } | null;
      if (!response.ok || !result?.ok) throw new Error(result?.description || `Telegram respondió ${response.status}`);

      const { error: welcomeError } = await supabase
        .from('telegram_accounts')
        .update({ welcome_sent_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq('telegram_user_id', telegramUser.id);
      if (welcomeError) console.error('[telegram-session] no se pudo marcar welcome_sent_at:', welcomeError);
    } catch (error) {
      console.error('[telegram-session] no se pudo enviar el mensaje de bienvenida:', error);
    }
  }

  const { data: authUser, error: authUserError } = await supabase.auth.admin.getUserById(userId);
  if (authUserError || !authUser.user?.email) throw authUserError || new Error('Cuenta no encontrada.');

  const { data: link, error: linkError } = await supabase.auth.admin.generateLink({ type: 'magiclink', email: authUser.user.email });
  if (linkError || !link.properties?.hashed_token) throw linkError || new Error('No se pudo generar la sesión.');
  return link.properties.hashed_token;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return new Response('Método no permitido', { status: 405, headers: corsHeaders });

  try {
    const body = await request.json().catch(() => null) as { initData?: unknown } | null;
    const initData = typeof body?.initData === 'string' ? body.initData : '';
    const telegramUser = await validateInitData(initData);
    if (!telegramUser) return Response.json({ error: 'Telegram no pudo validar esta entrada.' }, { status: 401, headers: corsHeaders });
    const tokenHash = await getOrCreateUser(telegramUser);
    return Response.json({ tokenHash }, { headers: { ...corsHeaders, 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[telegram-session]', error);
    return Response.json({ error: 'No pudimos abrir tu cuenta.' }, { status: 500, headers: corsHeaders });
  }
});
