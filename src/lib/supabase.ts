import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Safe client — works at build time even if env vars are not set (e.g. Vercel build).
// The dealer and catalog pages are 'use client' components, so they only run in the
// browser at runtime where the real env vars are available via Vercel's project settings.
export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseKey ?? 'placeholder-anon-key'
);

