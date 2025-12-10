import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase environment variables are not set');
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }
  
  return supabaseInstance;
};

// Type definitions for our database tables
export interface WaitlistSubmission {
  id?: string;
  email: string;
  interest_area?: string;
  created_at?: string;
}

export interface PartnerEnquiry {
  id?: string;
  name: string;
  company: string;
  email: string;
  role: string;
  message: string;
  created_at?: string;
}

