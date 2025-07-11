
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { GeneratedContent } from './types';

interface SOPPreferences {
  tone: 'formal' | 'casual' | 'instructional';
  outputLength: 'concise' | 'detailed';
  includeCompliance: boolean;
  language: string;
}

export const useEnhancedSOPGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [generationHistory, setGenerationHistory] = useState<Array<{
    timestamp: Date;
    content: GeneratedContent;
    preferences: SOPPreferences;
  }>>([]);
  const { toast } = useToast();

  const generateSOPAndWorkflow = async (
    title: string,
    description: string,
    category: string,
    tags: string[],
    preferences: SOPPreferences
  ) => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Starting enhanced SOP generation with OpenAI...', { 
        title, 
        description, 
        category, 
        tags, 
        preferences 
      });
      
      const { data, error } = await supabase.functions.invoke('generate-enhanced-sop', {
        body: {
          title: title.trim(),
          description: description.trim(),
          category,
          tags,
          preferences
        }
      });

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Failed to generate SOP and workflow: ${error.message}`);
      }

      if (!data || !data.sop || !data.workflow) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response from AI generation service');
      }

      // Validate and enhance workflow steps
      const validatedWorkflow = data.workflow.map((step: any) => ({
        ...step,
        connections: step.connections || [],
        x: step.x || 0,
        y: step.y || 0
      }));
      
      const content = {
        sop: data.sop,
        workflow: validatedWorkflow
      };
      
      setGeneratedContent(content);
      addToHistory(content, preferences);
      
      // Show success with enhanced feedback
      toast({
        title: "🎉 AI Generation Successful!",
        description: "Your professional SOP and workflow have been generated using advanced AI.",
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Unable to generate SOP and workflow. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const addToHistory = (content: GeneratedContent, preferences: SOPPreferences) => {
    setGenerationHistory(prev => [...prev, {
      timestamp: new Date(),
      content,
      preferences
    }]);
  };

  const regenerateWithSameSettings = () => {
    const lastGeneration = generationHistory[generationHistory.length - 1];
    if (lastGeneration && generatedContent) {
      return lastGeneration.preferences;
    }
    return null;
  };

  return {
    isGenerating,
    generatedContent,
    setGeneratedContent,
    generateSOPAndWorkflow,
    generationHistory,
    regenerateWithSameSettings
  };
};
