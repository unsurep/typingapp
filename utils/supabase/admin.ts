import { createClient } from '@supabase/supabase-js';

/**
 * Admin (service-role) Supabase client — bypasses Row Level Security.
 * Use ONLY server-side in trusted contexts (API routes, Server Components).
 * Never import this in client components or expose it to the browser.
 */
export function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}
