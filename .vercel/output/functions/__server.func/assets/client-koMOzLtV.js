import { createClient } from "@supabase/supabase-js";
const cleanEnvVar = (val) => {
  if (!val) return val;
  return val.replace(/^["']|["']$/g, "");
};
function createSupabaseClient() {
  const SUPABASE_URL = cleanEnvVar("https://nqbpykmvvjrytnwljkir.supabase.co");
  const SUPABASE_PUBLISHABLE_KEY = cleanEnvVar("sb_publishable_ZftPqa-FN2fEFn6RofNDYg_cK46QKO7");
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Please configure them in your environment variables.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase as s
};
