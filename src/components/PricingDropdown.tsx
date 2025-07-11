
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import FeatureComparisonModal from "./FeatureComparisonModal";
import PaymentModal from "./PaymentModal";

interface PricingDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingDropdown: React.FC<PricingDropdownProps> = ({ isOpen, onClose }) => {
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      description: "Basic SOP generation",
      features: ["3 SOPs/month", "Limited workflows", "Basic templates"],
      buttonText: "Get Started",
      highlighted: false
    },
    {
      name: "Pro Plan",
      price: "$19/month",
      description: "Unlimited SOPs, all features unlocked",
      features: ["Unlimited SOPs", "All workflows", "Advanced templates", "Priority support"],
      buttonText: "Select Plan",
      highlighted: true
    },
    {
      name: "Team Plan",
      price: "$49/month",
      description: "Everything in Pro + collaboration & team sharing",
      features: ["Everything in Pro", "Team collaboration", "Shared workspaces", "Admin controls"],
      buttonText: "Select Plan",
      highlighted: false
    }
  ];

  const handleCompareFeatures = () => {
    setIsComparisonModalOpen(true);
  };

  const handlePlanSelection = (plan: any) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Centered Dropdown Card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl animate-in slide-in-from-top-2 duration-200">
          <Card className="shadow-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Plan</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Select the perfect plan for your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                  <div 
                    key={index}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                      plan.highlighted 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg' 
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {/* Most Popular Badge - Only on highlighted plan */}
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{plan.price}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{plan.description}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full py-3 font-semibold transition-all duration-200 ${
                        plan.highlighted 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handlePlanSelection(plan)}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feature Comparison Modal */}
      <FeatureComparisonModal 
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPlan={selectedPlan ? {
          name: selectedPlan.name.replace(' Plan', ''),
          price: selectedPlan.price.replace('/month', ''),
          interval: selectedPlan.price.includes('/month') ? 'month' : '',
          features: selectedPlan.features
        } : undefined}
      />
    </>
  );
};

export default PricingDropdown;
