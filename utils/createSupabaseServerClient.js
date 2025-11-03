// utils/createSupabaseServerClient.js
import { createServerClient } from "@supabase/ssr";

/**
 * Create a Supabase client that reads and writes cookies
 * directly from Express's req/res objects.
 */
export function createSupabaseServerClient(req, res) {
  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          // read cookies from express request
          return req.cookies?.[name];
        },
        set(name, value, options) {
          // write cookies to response
          res.cookie(name, value, options);
        },
        remove(name, options) {
          // clear cookie from response
          res.clearCookie(name, options);
        },
      },
    }
  );
}
