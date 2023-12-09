import { config as dotEnvConfig } from "https://deno.land/x/dotenv/mod.ts";

await dotEnvConfig(); // Carrega as variáveis do arquivo .env

export const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
export const supabaseKey = Deno.env.get("SUPABASE_KEY") || "";