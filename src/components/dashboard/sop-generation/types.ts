
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'start' | 'process' | 'decision' | 'end';
  x: number;
  y: number;
  connections: string[];
}

export interface GeneratedContent {
  sop: {
    title: string;
    content: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
      details: string[];
    }>;
  };
  workflow: WorkflowStep[];
}
