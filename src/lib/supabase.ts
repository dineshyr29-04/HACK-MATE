import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Supabase Client
 * To use this, add the following to your .env file:
 * VITE_SUPABASE_URL=your_supabase_url
 * VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to check if Supabase is configured
 */
export const isSupabaseConfigured = () => {
    return supabaseUrl && supabaseAnonKey &&
        supabaseUrl !== 'your_supabase_url' &&
        supabaseAnonKey !== 'your_supabase_anon_key';
};
