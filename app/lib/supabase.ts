import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wpqtvixnmexlmhawwfdq.supabase.co';
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_hdJhhpr3zZHb2sw5eieZ1A_VAbkcSlU';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: process.env.NODE_ENV !== 'development',
    autoRefreshToken: process.env.NODE_ENV !== 'development',
    detectSessionInUrl: process.env.NODE_ENV !== 'development',
  },
});
