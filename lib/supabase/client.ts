import { createBrowserClient } from '@supabase/ssr';

/**
 * Create a Supabase client for Client Components
 * This client automatically handles cookie-based sessions in the browser
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
