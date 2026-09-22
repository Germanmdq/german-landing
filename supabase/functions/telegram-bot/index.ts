const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')!;
const TELEGRAM_WEBHOOK_SECRET = Deno.env.get('TELEGRAM_WEBHOOK_SECRET')!;
const APP_URL = 'https://german.elclubdelaimaginacion.com/telegram';

type TelegramUpdate = {
  message?: {
    text?: string;
    chat?: { id?: number; type?: string };
    from?: { id?: number; first_name?: string };
  };
};

async function telegram(method: string, body: Record<string, unknown>) {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Telegram ${method} respondió ${response.status}`);
  return response.json();
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') return new Response('ok');
  if (request.headers.get('x-telegram-bot-api-secret-token') !== TELEGRAM_WEBHOOK_SECRET) {
    return new Response('unauthorized', { status: 401 });
  }

  try {
    const update = await request.json() as TelegramUpdate;
    const message = update.message;
    const chatId = message?.chat?.id;
    if (!chatId || message?.chat?.type !== 'private') return new Response('ok');

    if (message.text?.startsWith('/start')) {
      const firstName = message.from?.first_name?.trim();
      await telegram('sendMessage', {
        chat_id: chatId,
        text: `${firstName ? `${firstName}, b` : 'B'}ienvenido a Asistente Germán.\n\nTocá el botón para entrar a tu espacio.`,
        reply_markup: {
          inline_keyboard: [[{
            text: 'Abrir Asistente Germán',
            web_app: { url: APP_URL },
          }]],
        },
      });
    }
  } catch (error) {
    console.error('[telegram-bot]', error);
  }

  return new Response('ok');
});
