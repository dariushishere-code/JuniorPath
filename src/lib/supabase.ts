import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  // Development: fail loudly so a missing config can never go unnoticed.
  if (import.meta.env.DEV) {
    throw new Error(
      'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
        'Copy .env.example to .env and fill in your Supabase project values.'
    );
  }
  // Production: never crash the whole app into a blank/black screen because the
  // hosting provider (e.g. Netlify) didn't get the env vars. Boot with a
  // placeholder client instead — the landing page still renders, and login /
  // signup / persistence will surface visible errors instead of a dead page.
  console.error(
    '[JuniorPath] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
      'Auth and progress persistence are disabled on this deploy. ' +
      'Set both variables in your hosting environment and redeploy.'
  );
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder-not-configured.supabase.co',
  supabaseAnonKey ?? 'sb_publishable_placeholder-check-host-env',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);