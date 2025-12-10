import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

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

