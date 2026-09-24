import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { INTERMEDIATE_MESSAGE_TITLE, userFacingDeliveryTitle } from '../app/lib/taller-delivery.ts';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('todo mensaje intermedio se muestra como "Recordatorio", sin número', () => {
  assert.equal(INTERMEDIATE_MESSAGE_TITLE, 'Recordatorio');
});

test('los títulos viejos de favoritos pierden el número interno', () => {
  for (const title of ['Mensaje 6337', 'Recordatorio 600340', 'Mensaje 14', 'Recordatorio 6', 'Mensaje —', 'recordatorio #12', 'Mensaje Nº 3']) {
    assert.equal(userFacingDeliveryTitle(title), 'Recordatorio', title);
  }
  for (const title of ['Meditación de la mañana', 'Mensaje de Germán', 'Recordatorio']) {
    assert.equal(userFacingDeliveryTitle(title), title, title);
  }
});

test('ninguna pantalla arma títulos con message_index o numeración maestra', () => {
  for (const path of ['app/components/delivery-screen.tsx', 'app/telegram-mini-app.tsx']) {
    const source = read(path);
    assert.doesNotMatch(source, /`(Mensaje|Recordatorio) \$\{/, path);
    assert.doesNotMatch(source, />\s*(Mensaje|Recordatorio) \{/, path);
    assert.doesNotMatch(source, /intermediateDisplayNumber|messageDisplayNumber/, path);
  }
});

test('Telegram avisa "Mensaje de Germán" / "Abrir mensaje" sin número interno', () => {
  const source = read('supabase/functions/send-notifications/index.ts');
  const body = source.slice(source.indexOf('function telegramDeliveryText'), source.indexOf('async function sendTelegram'));
  assert.match(body, /'Mensaje de Germán'/);
  assert.doesNotMatch(body, /message_index|messageIndex/);
  assert.match(source, /'Abrir mensaje'/);
});
