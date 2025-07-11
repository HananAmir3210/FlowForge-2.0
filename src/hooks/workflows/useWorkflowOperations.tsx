
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useWorkflowOperations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const createWorkflow = async (data: {
    title: string;
    description: string;
    thumbnailUrl?: string;
  }) => {
    if (!user) {
      console.error('User not authenticated');
      return { error: 'Not authenticated' };
    }
    
    try {
      setLoading(true);
      console.log('Creating workflow with data:', data);
      
      const { data: workflow, error } = await supabase
        .from('workflows')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          thumbnail_url: data.thumbnailUrl
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error creating workflow:', error);
        throw error;
      }
      
      console.log('Workflow created successfully:', workflow);
      toast({
        title: "Workflow Created",
        description: "Your workflow has been saved successfully.",
      });
      
      return { data: workflow };
    } catch (error: any) {
      console.error('Error in createWorkflow:', error);
      toast({
        title: "Error creating workflow",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createWorkflow,
  };
};
