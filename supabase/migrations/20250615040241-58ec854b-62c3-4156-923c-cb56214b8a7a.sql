
-- Add new columns to the billing table for real billing functionality
ALTER TABLE public.billing ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE public.billing ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE public.billing ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';
ALTER TABLE public.billing ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMP WITH TIME ZONE;

-- Create a subscribers table for tracking subscription details
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security on subscribers table
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and create new ones
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;
CREATE POLICY "select_own_subscription" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;
CREATE POLICY "update_own_subscription" ON public.subscribers
FOR UPDATE
USING (true);

DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;
CREATE POLICY "insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Add RLS policies for billing table
DROP POLICY IF EXISTS "Users can view their own billing" ON public.billing;
CREATE POLICY "Users can view their own billing" ON public.billing
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own billing" ON public.billing;
CREATE POLICY "Users can update their own billing" ON public.billing
FOR UPDATE USING (auth.uid() = user_id);

-- Update the invoices table to match real invoice data
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS stripe_invoice_id TEXT;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS subscription_id TEXT;

-- Create RLS policies for invoices
DROP POLICY IF EXISTS "Users can view their own invoices" ON public.invoices;
CREATE POLICY "Users can view their own invoices" ON public.invoices
FOR SELECT USING (auth.uid() = user_id);
