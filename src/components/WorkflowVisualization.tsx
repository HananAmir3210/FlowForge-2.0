
import React from 'react';
import { ArrowDown, ArrowRight, Play, Square, Diamond, Circle } from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  type: 'start' | 'process' | 'decision' | 'end';
  next?: string[];
}

interface WorkflowVisualizationProps {
  steps: WorkflowStep[];
  isPreview?: boolean;
  onStartClick?: () => void;
}

const WorkflowVisualization: React.FC<WorkflowVisualizationProps> = ({ 
  steps, 
  isPreview = false,
  onStartClick 
}) => {
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'start':
        return <Play size={16} className="text-green-600" />;
      case 'process':
        return <Square size={16} className="text-blue-600" />;
      case 'decision':
        return <Diamond size={16} className="text-yellow-600" />;
      case 'end':
        return <Circle size={16} className="text-red-600" />;
      default:
        return <Square size={16} className="text-gray-600" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'start':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'process':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'decision':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'end':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  if (isPreview) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 h-48 flex flex-col relative overflow-hidden">
        {/* Workflow steps container */}
        <div className="flex-1 flex flex-col items-center justify-start gap-2 py-2">
          {steps.slice(0, 3).map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border-2 text-xs ${getStepColor(step.type)} max-w-full`}>
                {getStepIcon(step.type)}
                <span className="truncate">{step.title}</span>
              </div>
              {index < 2 && <ArrowDown className="text-gray-400" size={12} />}
            </React.Fragment>
          ))}
          {steps.length > 3 && (
            <div className="text-gray-500 text-xs mt-1">+ Interactive diagram</div>
          )}
        </div>
        
        {/* Action buttons at bottom - reduced spacing */}
        <div className="flex flex-col gap-1">
          {onStartClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartClick();
              }}
              className="flex items-center justify-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors w-full"
            >
              🔍 Edit & Customize
            </button>
          )}
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1 px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors w-full"
          >
            📄 Export Diagram
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={`flex items-center gap-3 px-6 py-4 rounded-lg border-2 ${getStepColor(step.type)} min-w-[250px] justify-center shadow-sm`}>
            {getStepIcon(step.type)}
            <span className="font-medium text-base">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <ArrowDown className="text-gray-400" size={28} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WorkflowVisualization;
