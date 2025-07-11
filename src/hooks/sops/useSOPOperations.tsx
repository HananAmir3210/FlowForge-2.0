
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type SOPCategory = Database['public']['Enums']['sop_category'];

export const useSOPOperations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const createSOP = async (data: {
    title: string;
    description: string;
    category: SOPCategory;
    generatedContent: string;
    tags?: string[];
    workflow_data?: any;
  }) => {
    if (!user) {
      console.error('User not authenticated');
      return { error: 'Not authenticated' };
    }
    
    try {
      setLoading(true);
      console.log('Creating SOP with data:', data);
      
      const { data: sop, error } = await supabase
        .from('sops')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          category: data.category,
          generated_content: data.generatedContent,
          tags: data.tags || [],
          workflow_data: data.workflow_data || null
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error creating SOP:', error);
        throw error;
      }
      
      console.log('SOP created successfully:', sop);
      toast({
        title: "SOP Created",
        description: "Your SOP and workflow have been saved successfully.",
      });
      
      return { data: sop };
    } catch (error: any) {
      console.error('Error in createSOP:', error);
      toast({
        title: "Error creating SOP",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const updateSOP = async (id: string, updates: any) => {
    if (!user) {
      console.error('User not authenticated');
      return { error: 'Not authenticated' };
    }
    
    try {
      setLoading(true);
      console.log('Updating SOP with id:', id, 'updates:', updates);
      
      const { data, error } = await supabase
        .from('sops')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error updating SOP:', error);
        throw error;
      }
      
      console.log('SOP updated successfully:', data);
      toast({
        title: "SOP Updated",
        description: "Your SOP and workflow have been updated successfully.",
      });
      
      return { data };
    } catch (error: any) {
      console.error('Error in updateSOP:', error);
      toast({
        title: "Error updating SOP",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const deleteSOP = async (id: string) => {
    if (!user) {
      console.error('User not authenticated');
      return { error: 'Not authenticated' };
    }
    
    try {
      setLoading(true);
      console.log('Deleting SOP with id:', id);
      
      const { error } = await supabase
        .from('sops')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Supabase error deleting SOP:', error);
        throw error;
      }
      
      console.log('SOP deleted successfully');
      toast({
        title: "SOP Deleted",
        description: "Your SOP has been deleted successfully.",
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Error in deleteSOP:', error);
      toast({
        title: "Error deleting SOP",
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
    createSOP,
    updateSOP,
    deleteSOP,
  };
};
