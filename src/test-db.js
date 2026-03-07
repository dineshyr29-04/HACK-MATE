import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in .env')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
    console.log('Testing connection to:', supabaseUrl)

    // Test 1: Check if we can reach the API
    const { data, error } = await supabase.from('projects').select('count', { count: 'exact', head: true })

    if (error) {
        if (error.code === 'PGRST116' || error.message.includes('relation "projects" does not exist')) {
            console.log('❌ Connection reachable, but "projects" table is missing.')
            console.log('Please run the SQL schema in your Supabase dashboard.')
        } else {
            console.error('❌ Database error:', error.message)
        }
    } else {
        console.log('✅ Connection successful! "projects" table found.')
    }
}

testConnection()
