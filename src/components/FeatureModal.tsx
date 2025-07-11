
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    description: string;
    details: string;
    example: string;
  } | null;
}

const FeatureModal = ({ isOpen, onClose, feature }: FeatureModalProps) => {
  if (!isOpen || !feature) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl dark:text-white">{feature.title}</CardTitle>
              <CardDescription className="dark:text-gray-300">{feature.description}</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="dark:text-gray-400 dark:hover:text-white"
            >
              <X size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">How it works</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.details}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Example</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 italic">{feature.example}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureModal;
