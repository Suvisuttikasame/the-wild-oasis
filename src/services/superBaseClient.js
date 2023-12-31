import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://pkqehgstrrykufjeipws.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcWVoZ3N0cnJ5a3VmamVpcHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxMzg0MjcsImV4cCI6MjAxMTcxNDQyN30._88O9iMuIRhntPniYvDX-osYmNK78gVlKoZMZ4Z0ywk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
