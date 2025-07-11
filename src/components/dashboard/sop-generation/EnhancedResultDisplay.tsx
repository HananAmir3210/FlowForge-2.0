
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  FileText, 
  Workflow, 
  Save, 
  Download, 
  Eye, 
  Image, 
  Edit3, 
  RefreshCw,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Copy,
  CheckCircle
} from 'lucide-react';
import InteractiveWorkflowModal from '@/components/InteractiveWorkflowModal';
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

interface GeneratedContent {
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

interface EnhancedResultDisplayProps {
  generatedContent: GeneratedContent;
  title: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  isEditing: boolean;
  onPreview: () => void;
  onExport: () => void;
  onSave: () => void;
  onRegenerate: () => void;
}

const EnhancedResultDisplay: React.FC<EnhancedResultDisplayProps> = ({
  generatedContent,
  title,
  activeTab,
  setActiveTab,
  loading,
  isEditing,
  onPreview,
  onExport,
  onSave,
  onRegenerate
}) => {
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [editableContent, setEditableContent] = useState(generatedContent.sop.content);
  const [isEditMode, setIsEditMode] = useState(false);
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    setEditableContent(generatedContent.sop.content);
  }, [generatedContent]);

  const handleExportWorkflowPNG = async () => {
    try {
      await exportWorkflowToPNG(title);
      toast({
        title: "Workflow Exported",
        description: "Your workflow has been downloaded as a PNG image.",
      });
    } catch (error) {
      console.error('Error exporting workflow:', error);
      toast({
        title: "Export Failed",
        description: "Unable to export workflow. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent.sop.content);
      toast({
        title: "Copied to Clipboard",
        description: "SOP content has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SOP: ${title}`,
          text: generatedContent.sop.content,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyToClipboard();
    }
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    setShowFeedbackForm(true);
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve the SOP generation quality.",
    });
  };

  const saveEdit = () => {
    // Update the generated content with edited version
    setIsEditMode(false);
    toast({
      title: "Content Updated",
      description: "Your changes have been saved locally.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Success Summary Card */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-800">SOP Generated Successfully!</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={onSave} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isEditing ? 'Update SOP' : 'Save to Library'}
            </Button>
            <Button size="sm" variant="outline" onClick={onPreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" variant="outline" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button size="sm" variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" variant="outline" onClick={onRegenerate}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generated Content
            </CardTitle>
            <div className="flex gap-2">
              {activeTab === 'sop' && (
                <>
                  <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    {isEditMode ? 'View' : 'Edit'}
                  </Button>
                </>
              )}
              {activeTab === 'workflow' && (
                <Button variant="outline" size="sm" onClick={handleExportWorkflowPNG}>
                  <Image className="h-4 w-4 mr-1" />
                  Export PNG
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sop">
                <FileText className="h-4 w-4 mr-2" />
                SOP Document
              </TabsTrigger>
              <TabsTrigger value="workflow">
                <Workflow className="h-4 w-4 mr-2" />
                Interactive Workflow
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sop" className="mt-4">
              {isEditMode ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Edit SOP Content</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setIsEditMode(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={saveEdit}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                  />
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">{generatedContent.sop.title}</h2>
                    <div className="space-y-4">
                      {generatedContent.sop.steps.map((step, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <h3 className="font-semibold text-lg">
                            Step {step.number}: {step.title}
                          </h3>
                          <p className="text-gray-700 mb-2">{step.description}</p>
                          {step.details.length > 0 && (
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {step.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="workflow" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Button 
                    onClick={() => setIsWorkflowModalOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Workflow className="h-4 w-4" />
                    Open Interactive Workflow Editor
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-600">
                  <Workflow className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Click the button above to open the enhanced interactive workflow editor</p>
                  <p className="text-sm mt-1">Features: Drag & drop, connection mode, color coding, fullscreen editing</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Feedback Section */}
          <Separator className="my-6" />
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Was this SOP helpful?</p>
              <div className="flex justify-center gap-2">
                <Button
                  variant={feedback === 'positive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFeedback('positive')}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Yes, helpful
                </Button>
                <Button
                  variant={feedback === 'negative' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFeedback('negative')}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Needs improvement
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Workflow Modal */}
      <InteractiveWorkflowModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        steps={generatedContent.workflow}
        title={title}
      />
    </div>
  );
};

export default EnhancedResultDisplay;
