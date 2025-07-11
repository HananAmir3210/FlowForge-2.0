
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useBillingOperations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const updateBilling = async (updates: any) => {
    if (!user) {
      console.error('User not authenticated');
      return { error: 'Not authenticated' };
    }
    
    try {
      setLoading(true);
      console.log('Updating billing with updates:', updates);
      
      const { data, error } = await supabase
        .from('billing')
        .upsert({
          user_id: user.id,
          ...updates
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error updating billing:', error);
        throw error;
      }
      
      console.log('Billing updated successfully:', data);
      toast({
        title: "Billing Updated",
        description: "Your billing information has been updated.",
      });
      
      return { data };
    } catch (error: any) {
      console.error('Error in updateBilling:', error);
      toast({
        title: "Error updating billing",
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
    updateBilling,
  };
};
