import process from "process";
import {createClient} from "@supabase/supabase-js";


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!(SUPABASE_URL && SUPABASE_KEY)) {
    throw new Error(
        "Missing SUPABASE_URL or SUPABASE_KEY environment variables. Please ensure they are set in your environment.",
    )
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)