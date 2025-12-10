-- Auravyx Pre-Launch Website - Supabase Database Setup
-- Run these commands in your Supabase SQL Editor

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create waitlist_submissions table
CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  interest_area TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create partner_enquiries table
CREATE TABLE IF NOT EXISTS partner_enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist_submissions(email);
CREATE INDEX IF NOT EXISTS waitlist_created_idx ON waitlist_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS partner_email_idx ON partner_enquiries(email);
CREATE INDEX IF NOT EXISTS partner_created_idx ON partner_enquiries(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow inserts from your app
-- These policies allow anyone to insert data (for form submissions)
-- but only authenticated users (you) can read the data

CREATE POLICY "Allow public inserts to waitlist"
  ON waitlist_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read waitlist"
  ON waitlist_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public inserts to partner enquiries"
  ON partner_enquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read partner enquiries"
  ON partner_enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create a view for easy data export
CREATE OR REPLACE VIEW waitlist_summary AS
SELECT 
  interest_area,
  COUNT(*) as count,
  MIN(created_at) as first_signup,
  MAX(created_at) as latest_signup
FROM waitlist_submissions
GROUP BY interest_area;

-- Grant access to the view
GRANT SELECT ON waitlist_summary TO authenticated;

-- Success message
SELECT 'Auravyx database setup complete!' as status;

