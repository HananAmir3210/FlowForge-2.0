
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import SOPPreviewModal from '@/components/modals/SOPPreviewModal';
import SteppedSOPForm from './sop-generation/SteppedSOPForm';
import EnhancedResultDisplay from './sop-generation/EnhancedResultDisplay';
import { useEnhancedSOPGeneration } from './sop-generation/useEnhancedSOPGeneration';
import type { Database } from '@/integrations/supabase/types';

type SOP = Database['public']['Tables']['sops']['Row'];
type SOPCategory = Database['public']['Enums']['sop_category'];

interface SOPPreferences {
  tone: 'formal' | 'casual' | 'instructional';
  outputLength: 'concise' | 'detailed';
  includeCompliance: boolean;
  language: string;
}

interface GenerateNewSOPProps {
  editingSOP?: SOP | null;
  onSOPCreated?: () => void;
  onClearEdit?: () => void;
}

const GenerateNewSOP: React.FC<GenerateNewSOPProps> = ({ 
  editingSOP, 
  onSOPCreated, 
  onClearEdit 
}) => {
  const [title, setTitle] = useState(editingSOP?.title || '');
  const [description, setDescription] = useState(editingSOP?.description || '');
  const [category, setCategory] = useState<SOPCategory>(editingSOP?.category || 'Operations');
  const [tags, setTags] = useState<string[]>(editingSOP?.tags || []);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sop');
  const [lastPreferences, setLastPreferences] = useState<SOPPreferences>({
    tone: 'formal',
    outputLength: 'detailed',
    includeCompliance: false,
    language: 'English'
  });

  const { toast } = useToast();
  const { createSOP, updateSOP, loading } = useSupabaseData();
  const { isGenerating, generatedContent, setGeneratedContent, generateSOPAndWorkflow } = useEnhancedSOPGeneration();

  // Initialize with existing SOP data if editing
  React.useEffect(() => {
    if (editingSOP) {
      setTitle(editingSOP.title);
      setDescription(editingSOP.description || '');
      setCategory(editingSOP.category);
      setTags(editingSOP.tags || []);
      
      if (editingSOP.generated_content && editingSOP.workflow_data) {
        try {
          const content = JSON.parse(editingSOP.generated_content);
          const workflow = editingSOP.workflow_data as unknown as any[];
          setGeneratedContent({ sop: content, workflow });
        } catch (error) {
          console.error('Error parsing existing SOP data:', error);
        }
      }
    }
  }, [editingSOP, setGeneratedContent]);

  const handleGenerate = (preferences: SOPPreferences) => {
    setLastPreferences(preferences);
    generateSOPAndWorkflow(title, description, category, tags, preferences);
    setActiveTab('sop');
  };

  const handleRegenerate = () => {
    if (lastPreferences) {
      generateSOPAndWorkflow(title, description, category, tags, lastPreferences);
      toast({
        title: "Regenerating SOP",
        description: "Creating a new version with the same preferences...",
      });
    }
  };

  const saveSOP = async () => {
    if (!generatedContent) {
      toast({
        title: "Nothing to Save",
        description: "Please generate content first.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Format the SOP content properly for storage
      const formattedContent = generatedContent.sop.steps.map(step => 
        `## Step ${step.number}: ${step.title}\n\n${step.description}\n\n${step.details.map(detail => `• ${detail}`).join('\n')}`
      ).join('\n\n');

      const sopData = {
        title,
        description,
        category,
        generatedContent: formattedContent,
        tags,
      };

      let result;
      if (editingSOP) {
        result = await updateSOP(editingSOP.id, {
          ...sopData,
          workflow_data: generatedContent.workflow,
        });
      } else {
        result = await createSOP({
          ...sopData,
          workflow_data: generatedContent.workflow,
        } as any);
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Clear localStorage draft on successful save
      localStorage.removeItem('sop-form-draft');

      toast({
        title: editingSOP ? "SOP Updated" : "SOP Saved",
        description: `Your SOP and workflow have been ${editingSOP ? 'updated' : 'saved'} successfully.`,
      });

      if (onSOPCreated) onSOPCreated();
      if (onClearEdit) onClearEdit();
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('Operations');
      setTags([]);
      setGeneratedContent(null);
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Unable to save SOP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportSOP = () => {
    if (!generatedContent) return;

    const content = `# ${title}\n\n## Description\n${description}\n\n## Category\n${category}\n\n${generatedContent.sop.content}\n\n## Tags\n${tags.join(', ')}\n\nGenerated on: ${new Date().toLocaleDateString()}`;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "SOP Exported",
      description: "Your SOP has been downloaded as a markdown file.",
    });
  };

  return (
    <div className="space-y-6">
      <SteppedSOPForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        tags={tags}
        setTags={setTags}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        isEditing={!!editingSOP}
        onClearEdit={onClearEdit}
      />

      {generatedContent && (
        <EnhancedResultDisplay
          generatedContent={generatedContent}
          title={title}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          loading={loading}
          isEditing={!!editingSOP}
          onPreview={() => setIsPreviewOpen(true)}
          onExport={exportSOP}
          onSave={saveSOP}
          onRegenerate={handleRegenerate}
        />
      )}

      {generatedContent && (
        <SOPPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          sop={generatedContent.sop}
          workflow={generatedContent.workflow}
        />
      )}
    </div>
  );
};

export default GenerateNewSOP;
