import React, { useState } from 'react';
import { X, Download, Copy, FileText, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { exportSOPToPDF } from '@/utils/pdfExport';
import WorkflowWhiteboard from '@/components/WorkflowWhiteboard';
import type { Database } from '@/integrations/supabase/types';

type SOP = Database['public']['Tables']['sops']['Row'];

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'start' | 'process' | 'decision' | 'end';
  x: number;
  y: number;
  connections: string[];
}

interface SOPViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  sop: SOP | null;
}

const SOPViewModal: React.FC<SOPViewModalProps> = ({ isOpen, onClose, sop }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('sop');

  if (!isOpen || !sop) return null;

  const handleCopy = () => {
    const content = `${sop.title}\n\n${sop.description || ''}\n\n${sop.generated_content || ''}`;
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "SOP content has been copied to your clipboard.",
    });
  };

  const handleExportMarkdown = () => {
    const content = `# ${sop.title}\n\n## Description\n${sop.description || 'No description'}\n\n## Category\n${sop.category}\n\n## Content\n${sop.generated_content || 'No content available'}\n\n## Tags\n${sop.tags?.join(', ') || 'No tags'}\n\nGenerated on: ${new Date(sop.created_at).toLocaleDateString()}`;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sop.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "SOP Exported",
      description: "Your SOP has been downloaded as a markdown file.",
    });
  };

  const handleExportPDF = () => {
    try {
      exportSOPToPDF({
        title: sop.title,
        description: sop.description || undefined,
        category: sop.category,
        tags: sop.tags || undefined,
        generated_content: sop.generated_content || undefined,
        created_at: sop.created_at
      });
      toast({
        title: "PDF Generated",
        description: "Your SOP has been exported as a PDF file.",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: "Unable to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Parse workflow data if available
  const workflowSteps = sop.workflow_data as unknown as WorkflowStep[] | null;
  const hasWorkflow = workflowSteps && workflowSteps.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
              <FileText size={24} />
              {sop.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Category: {sop.category} • Created: {new Date(sop.created_at).toLocaleDateString()}
              {hasWorkflow && (
                <span className="ml-2 text-blue-600 dark:text-blue-400">
                  • Includes Workflow
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy size={16} />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
              <Download size={16} />
              MD
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
        <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
          {hasWorkflow ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sop">
                  <FileText className="h-4 w-4 mr-2" />
                  SOP Document
                </TabsTrigger>
                <TabsTrigger value="workflow">
                  <Workflow className="h-4 w-4 mr-2" />
                  Visual Workflow
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="sop" className="mt-4">
                {sop.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 dark:text-white">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300">{sop.description}</p>
                  </div>
                )}
                
                {sop.generated_content && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 dark:text-white">SOP Content</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="whitespace-pre-wrap text-sm dark:text-gray-300 font-sans prose max-w-none">
                        {sop.generated_content.split('\n').map((line, index) => {
                          if (line.startsWith('## Step')) {
                            return (
                              <h3 key={index} className="font-semibold text-lg text-blue-600 dark:text-blue-400 mt-4 mb-2">
                                {line.replace('## ', '')}
                              </h3>
                            );
                          } else if (line.startsWith('• ')) {
                            return (
                              <li key={index} className="ml-4 text-gray-600 dark:text-gray-400">
                                {line.replace('• ', '')}
                              </li>
                            );
                          } else if (line.trim()) {
                            return (
                              <p key={index} className="mb-2 text-gray-700 dark:text-gray-300">
                                {line}
                              </p>
                            );
                          }
                          return <br key={index} />;
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {sop.tags && sop.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2 dark:text-white">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {sop.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="workflow" className="mt-4">
                {workflowSteps && (
                  <WorkflowWhiteboard 
                    steps={workflowSteps}
                    title={sop.title}
                    readonly={true}
                  />
                )}
              </TabsContent>
            </Tabs>
          ) : (
            // Show only SOP content when no workflow exists
            <div>
              {sop.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 dark:text-white">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300">{sop.description}</p>
                </div>
              )}
              
              {sop.generated_content && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 dark:text-white">Generated Content</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="whitespace-pre-wrap text-sm dark:text-gray-300 font-sans prose max-w-none">
                      {sop.generated_content.split('\n').map((line, index) => {
                        if (line.startsWith('## Step')) {
                          return (
                            <h3 key={index} className="font-semibold text-lg text-blue-600 dark:text-blue-400 mt-4 mb-2">
                              {line.replace('## ', '')}
                            </h3>
                          );
                        } else if (line.startsWith('• ')) {
                          return (
                            <li key={index} className="ml-4 text-gray-600 dark:text-gray-400">
                              {line.replace('• ', '')}
                            </li>
                          );
                        } else if (line.trim()) {
                          return (
                            <p key={index} className="mb-2 text-gray-700 dark:text-gray-300">
                              {line}
                            </p>
                          );
                        }
                        return <br key={index} />;
                      })}
                    </div>
                  </div>
                </div>
              )}

              {sop.tags && sop.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2 dark:text-white">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {sop.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date(sop.updated_at).toLocaleString()}
              {hasWorkflow && <span className="ml-2">• Includes workflow visualization</span>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                Export as PDF
              </Button>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOPViewModal;
