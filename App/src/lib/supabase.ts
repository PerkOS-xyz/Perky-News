import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Types for our database
export interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
  confirmed: boolean;
  confirmation_token: string;
  is_premium: boolean;
  premium_expires_at: string | null;
  preferences: string[];
  created_at: string;
  updated_at: string;
}

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Client for browser/client-side (limited access)
export function createBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Client for server-side API routes (full access)
export function createServerClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase server environment variables');
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Singleton for server client (reuse connection)
let serverClient: SupabaseClient | null = null;

export function getServerClient() {
  if (!serverClient) {
    serverClient = createServerClient();
  }
  return serverClient;
}
