-- ==========================================
-- TEC INDUSTRIES Supabase Schema
-- ==========================================

-- 1. Leads Table (for Catalog Downloads and General Inquiries)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    source TEXT DEFAULT 'catalog_download', -- e.g., 'catalog_download', 'contact_form'
    status TEXT DEFAULT 'new' -- 'new', 'contacted', 'qualified', 'disqualified'
);

-- Enable Row Level Security (RLS) for Leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so website visitors can submit the form)
CREATE POLICY "Allow public inserts into leads" 
ON public.leads FOR INSERT 
TO anon 
WITH CHECK (true);

-- 2. Dealer Applications Table (for /dealer page)
CREATE TABLE IF NOT EXISTS public.dealer_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    firm_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    gst_number TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    expected_volume TEXT, -- e.g., 'Below 5 Lakhs', '5-20 Lakhs', '20+ Lakhs'
    current_brands TEXT, -- Brands they currently deal with
    status TEXT DEFAULT 'pending_review' -- 'pending_review', 'approved', 'rejected'
);

-- Enable Row Level Security (RLS) for Dealer Applications
ALTER TABLE public.dealer_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow public inserts into dealer_applications" 
ON public.dealer_applications FOR INSERT 
TO anon 
WITH CHECK (true);

-- Note: No SELECT policies for anon. Only authenticated admins should read data.
