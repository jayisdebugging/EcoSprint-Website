import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

export const SUPABASE_CONFIGURED = Boolean(supabaseUrl && supabaseAnonKey)

export const SUPABASE_CONFIG_MESSAGE =
  'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in the .env file (see .env.example), then restart the dev server.'

if (!SUPABASE_CONFIGURED) {
  console.warn(`[EcoSprint] ${SUPABASE_CONFIG_MESSAGE}`)
}

/**
 * Single shared Supabase client.
 *
 * IMPORTANT: This only ever uses the PUBLIC anon key. All data access is
 * protected by Row Level Security policies in supabase/schema.sql — never use
 * the service_role key in this app.
 */
export const supabase = SUPABASE_CONFIGURED
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    })
  : null