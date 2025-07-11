
import React from 'react';
import { X, Download, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkflowVisualization from './WorkflowVisualization';

interface WorkflowStep {
  id: string;
  title: string;
  type: 'start' | 'process' | 'decision' | 'end';
  next?: string[];
}

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: WorkflowStep[];
  title: string;
}

const WorkflowModal: React.FC<WorkflowModalProps> = ({ isOpen, onClose, steps, title }) => {
  const [zoom, setZoom] = React.useState(1);

  if (!isOpen) return null;

  const handleExportPNG = () => {
    console.log('Exporting as PNG...');
    // Implement PNG export functionality
  };

  const handleExportPDF = () => {
    console.log('Exporting as PDF...');
    // Implement PDF export functionality
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{title} - Interactive Workflow</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
              <ZoomOut size={16} />
            </Button>
            <span className="text-sm px-2">{Math.round(zoom * 100)}%</span>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
              <ZoomIn size={16} />
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPNG}>
              <Download size={16} />
              PNG
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download size={16} />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto" style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
          <WorkflowVisualization steps={steps} />
        </div>

        {/* Footer */}
        <div className="border-t p-4 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <Move size={14} />
              Drag to pan
            </span>
            <span>Use zoom controls to resize</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowModal;
