import React, { useState, useCallback } from 'react';
import { 
  ReactFlow, 
  Node, 
  Edge, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  ConnectionMode,
  MiniMap,
  Panel,
  MarkerType,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2, Download, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { exportWorkflowToPNG } from '@/utils/workflowExport';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'start' | 'process' | 'decision' | 'end';
  x: number;
  y: number;
  connections: string[];
}

interface WorkflowWhiteboardProps {
  steps: WorkflowStep[];
  title: string;
  readonly?: boolean;
}

const nodeTypes = {
  start: ({ data }: { data: any }) => (
    <div className="px-4 py-3 bg-green-100 border-2 border-green-500 rounded-full text-center min-w-[120px] shadow-lg">
      <div className="font-bold text-green-800">{data.title}</div>
      <div className="text-xs text-green-600 mt-1">{data.description}</div>
    </div>
  ),
  process: ({ data }: { data: any }) => (
    <div className="px-4 py-3 bg-blue-100 border-2 border-blue-500 rounded-lg text-center min-w-[140px] shadow-lg">
      <div className="font-bold text-blue-800">{data.title}</div>
      <div className="text-xs text-blue-600 mt-1">{data.description}</div>
    </div>
  ),
  decision: ({ data }: { data: any }) => (
    <div className="px-4 py-3 bg-yellow-100 border-2 border-yellow-500 transform rotate-45 text-center min-w-[120px] shadow-lg">
      <div className="transform -rotate-45">
        <div className="font-bold text-yellow-800 text-sm">{data.title}</div>
        <div className="text-xs text-yellow-600 mt-1">{data.description}</div>
      </div>
    </div>
  ),
  end: ({ data }: { data: any }) => (
    <div className="px-4 py-3 bg-red-100 border-2 border-red-500 rounded-full text-center min-w-[120px] shadow-lg">
      <div className="font-bold text-red-800">{data.title}</div>
      <div className="text-xs text-red-600 mt-1">{data.description}</div>
    </div>
  ),
};

const WorkflowWhiteboard: React.FC<WorkflowWhiteboardProps> = ({ 
  steps, 
  title, 
  readonly = true 
}) => {
  const { toast } = useToast();
  // Convert workflow steps to React Flow nodes
  const initialNodes: Node[] = steps.map((step) => ({
    id: step.id,
    type: step.type,
    position: { x: step.x, y: step.y },
    data: { 
      title: step.title, 
      description: step.description,
      type: step.type
    },
    draggable: !readonly,
  }));

  // Convert connections to React Flow edges
  const initialEdges: Edge[] = steps.reduce((edges: Edge[], step) => {
    const stepEdges = step.connections.map((targetId, index) => ({
      id: `${step.id}-${targetId}-${index}`,
      source: step.id,
      target: targetId,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#3b82f6',
      },
    }));
    return [...edges, ...stepEdges];
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onInit = useCallback((instance: any) => {
    setReactFlowInstance(instance);
  }, []);

  const fitView = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  }, [reactFlowInstance]);

  const zoomIn = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomIn();
    }
  }, [reactFlowInstance]);

  const zoomOut = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomOut();
    }
  }, [reactFlowInstance]);

  const downloadPNG = useCallback(async () => {
    try {
      await exportWorkflowToPNG(title);
      toast({
        title: "Workflow Downloaded",
        description: "Your workflow has been saved as a PNG image.",
      });
    } catch (error) {
      console.error('Error downloading workflow:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download workflow. Please try again.",
        variant: "destructive",
      });
    }
  }, [title, toast]);

  return (
    <div className="h-[600px] w-full border rounded-lg bg-white relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-white"
      >
        <Background 
          color="#e5e7eb" 
          gap={20} 
          size={1}
          variant={BackgroundVariant.Dots}
        />
        <Controls 
          showZoom={true}
          showFitView={true}
          showInteractive={!readonly}
          position="bottom-left"
        />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'start': return '#10b981';
              case 'process': return '#3b82f6';
              case 'decision': return '#f59e0b';
              case 'end': return '#ef4444';
              default: return '#6b7280';
            }
          }}
          position="bottom-right"
          className="bg-white border rounded"
        />
        <Panel position="top-center" className="bg-white px-4 py-2 rounded-lg shadow-md border">
          <h3 className="font-semibold text-gray-800">{title} - Workflow</h3>
        </Panel>
        <Panel position="top-right" className="flex gap-2">
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={fitView}>
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={downloadPNG}>
            <Image className="h-4 w-4" />
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowWhiteboard;
