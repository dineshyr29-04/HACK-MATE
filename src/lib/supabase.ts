import { createClient } from '@supabase/supabase-js';

// Get keys from env, with placeholders to prevent throw at module load time
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

/**
 * Supabase Client
 * We provide fallback placeholders so createClient doesn't throw immediately if keys are missing.
 * The application will check isSupabaseConfigured() before actually attempting any operations.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to check if Supabase is actually configured with real credentials
 */
export const isSupabaseConfigured = () => {
    return import.meta.env.VITE_SUPABASE_URL &&
        import.meta.env.VITE_SUPABASE_ANON_KEY &&
        import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_url' &&
        import.meta.env.VITE_SUPABASE_ANON_KEY !== 'your_supabase_anon_key';
};
