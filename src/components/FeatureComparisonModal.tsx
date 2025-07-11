
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface FeatureComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeatureComparisonModal: React.FC<FeatureComparisonModalProps> = ({ isOpen, onClose }) => {
  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      popular: false
    },
    {
      name: "Pro Plan", 
      price: "$19/month",
      popular: true
    },
    {
      name: "Team Plan",
      price: "$49/month", 
      popular: false
    }
  ];

  const features = [
    {
      category: "SOP Generation",
      items: [
        { name: "SOPs per month", free: "3", pro: "Unlimited", team: "Unlimited" },
        { name: "AI-powered generation", free: true, pro: true, team: true },
        { name: "Custom templates", free: false, pro: true, team: true },
        { name: "Advanced templates", free: false, pro: true, team: true }
      ]
    },
    {
      category: "Workflows", 
      items: [
        { name: "Basic workflows", free: true, pro: true, team: true },
        { name: "Visual flowcharts", free: false, pro: true, team: true },
        { name: "Interactive editing", free: false, pro: true, team: true },
        { name: "Workflow automation", free: false, pro: false, team: true }
      ]
    },
    {
      category: "Collaboration",
      items: [
        { name: "Personal workspace", free: true, pro: true, team: true },
        { name: "Team collaboration", free: false, pro: false, team: true },
        { name: "Shared workspaces", free: false, pro: false, team: true },
        { name: "Admin controls", free: false, pro: false, team: true },
        { name: "User permissions", free: false, pro: false, team: true }
      ]
    },
    {
      category: "Support & Export",
      items: [
        { name: "Email support", free: true, pro: true, team: true },
        { name: "Priority support", free: false, pro: true, team: true },
        { name: "Export to PDF", free: true, pro: true, team: true },
        { name: "Export to Word", free: false, pro: true, team: true },
        { name: "API access", free: false, pro: false, team: true }
      ]
    }
  ];

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      );
    }
    return <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl max-h-[90vh] overflow-auto animate-in slide-in-from-top-2 duration-200">
          <Card className="shadow-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Feature Comparison</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Compare all features across our plans
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {/* Plans Header */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Features</h3>
                </div>
                {plans.map((plan, index) => (
                  <div key={index} className="text-center">
                    <div className="relative">
                      {plan.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            Popular
                          </span>
                        </div>
                      )}
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mt-2">{plan.name}</h3>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{plan.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Categories */}
              {features.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    {category.category}
                  </h4>
                  
                  {category.items.map((feature, featureIndex) => (
                    <div key={featureIndex} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature.name}</span>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        {renderFeatureValue(feature.free)}
                      </div>
                      <div className="text-center flex items-center justify-center">
                        {renderFeatureValue(feature.pro)}
                      </div>
                      <div className="text-center flex items-center justify-center">
                        {renderFeatureValue(feature.team)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="outline"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  onClick={() => {
                    console.log('Start free trial clicked from comparison');
                    onClose();
                  }}
                >
                  Start Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FeatureComparisonModal;
