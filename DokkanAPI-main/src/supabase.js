import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cuhgzkkhauuccrbkplsg.supabase.co'
const supabaseAnonKey = 'sb_publishable_8OjUdhXpnu0sUZUbOzRqmg_Q0EfZoZr' // Vervang dit door je sleutel uit Supabase Settings -> API

export const supabase = createClient(supabaseUrl, supabaseAnonKey)