
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useUserProfileOperations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const updateUserProfile = async (updates: any) => {
    if (!user) {
      console.error('User not authenticated');
      return { error: 'Not authenticated' };
    }
    
    try {
      setLoading(true);
      console.log('Updating user profile with updates:', updates);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          ...updates
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error updating profile:', error);
        throw error;
      }
      
      console.log('Profile updated successfully:', data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      
      return { data };
    } catch (error: any) {
      console.error('Error in updateUserProfile:', error);
      toast({
        title: "Error updating profile",
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
    updateUserProfile,
  };
};
