/*
  # Add workflow_data column and index to SOPs table

  1. Changes
    - Add workflow_data column to sops table (if it doesn't exist)
    - Add GIN index for better performance on workflow_data queries

  2. Security
    - No changes to existing RLS policies
*/

-- Add workflow_data column only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sops' AND column_name = 'workflow_data'
  ) THEN
    ALTER TABLE public.sops ADD COLUMN workflow_data JSONB;
  END IF;
END $$;

-- Add index for better performance when querying workflow data (if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'sops' AND indexname = 'idx_sops_workflow_data'
  ) THEN
    CREATE INDEX idx_sops_workflow_data ON public.sops USING GIN (workflow_data);
  END IF;
END $$;