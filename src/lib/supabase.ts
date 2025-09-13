import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create mock clients if environment variables are not set
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')

// Admin client with service role key for elevated permissions
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = supabaseServiceKey && supabaseUrl
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

