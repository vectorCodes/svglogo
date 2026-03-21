import { getCookies, setCookie } from '@tanstack/react-start/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { env } from 'cloudflare:workers'

export function getSupabaseServerClient() {
  return createServerClient(
    env.SUPABASE_URL!,
    env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(getCookies()).map(([name, value]) => ({
            name,
            value,
          }))
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value)
          })
        },
      },
    },
  )
}

export function getSupabaseServiceClient() {
  return createClient(
    env.SUPABASE_URL!,
    env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
