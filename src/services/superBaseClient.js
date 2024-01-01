import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://pkqehgstrrykufjeipws.supabase.co";
const supabaseKey = "test";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
