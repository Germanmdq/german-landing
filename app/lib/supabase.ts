import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// storageKey propio: al cambiarlo se ignoran las sesiones locales anteriores
// (por ejemplo, después de un reset de usuarios) y la Mini App crea una nueva.
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: { storageKey: 'asistente-german-auth-v2' },
});

