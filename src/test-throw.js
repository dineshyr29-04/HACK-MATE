import { createClient } from '@supabase/supabase-js'
try {
    createClient('', '')
    console.log('Did not throw')
} catch (e) {
    console.error('THROWN:', e.message)
}
