
-- Add workflow_data column to store the visual workflow steps with each SOP
ALTER TABLE public.sops ADD COLUMN workflow_data JSONB;

-- Add index for better performance when querying workflow data
CREATE INDEX idx_sops_workflow_data ON public.sops USING GIN (workflow_data);

-- Update the updated_at trigger to work with the new column
-- (The existing trigger should automatically handle this, but let's make sure)
