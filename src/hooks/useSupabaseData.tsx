
import { useSOPOperations } from './sops/useSOPOperations';
import { useWorkflowOperations } from './workflows/useWorkflowOperations';
import { useUserProfileOperations } from './user/useUserProfileOperations';
import { useBillingOperations } from './billing/useBillingOperations';

export const useSupabaseData = () => {
  const sopOperations = useSOPOperations();
  const workflowOperations = useWorkflowOperations();
  const userProfileOperations = useUserProfileOperations();
  const billingOperations = useBillingOperations();

  // Combine loading states from all operations
  const loading = sopOperations.loading || workflowOperations.loading || 
                  userProfileOperations.loading || billingOperations.loading;

  return {
    loading,
    // SOP operations
    createSOP: sopOperations.createSOP,
    updateSOP: sopOperations.updateSOP,
    deleteSOP: sopOperations.deleteSOP,
    // Workflow operations
    createWorkflow: workflowOperations.createWorkflow,
    // User profile operations
    updateUserProfile: userProfileOperations.updateUserProfile,
    // Billing operations
    updateBilling: billingOperations.updateBilling,
  };
};
