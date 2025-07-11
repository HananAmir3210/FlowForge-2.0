
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader2, FileText, Workflow, Info, Sparkles, Save, RotateCcw } from 'lucide-react';
import TagManager from './TagManager';
import type { Database } from '@/integrations/supabase/types';

type SOPCategory = Database['public']['Enums']['sop_category'];

interface SteppedSOPFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  category: SOPCategory;
  setCategory: (category: SOPCategory) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  isGenerating: boolean;
  onGenerate: (preferences: SOPPreferences) => void;
  isEditing: boolean;
  onClearEdit?: () => void;
}

interface SOPPreferences {
  tone: 'formal' | 'casual' | 'instructional';
  outputLength: 'concise' | 'detailed';
  includeCompliance: boolean;
  language: string;
}

const SteppedSOPForm: React.FC<SteppedSOPFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  tags,
  setTags,
  isGenerating,
  onGenerate,
  isEditing,
  onClearEdit
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<SOPPreferences>({
    tone: 'formal',
    outputLength: 'detailed',
    includeCompliance: false,
    language: 'English'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    const formData = { title, description, category, tags, preferences };
    localStorage.setItem('sop-form-draft', JSON.stringify(formData));
  }, [title, description, category, tags, preferences]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sop-form-draft');
    if (saved && !isEditing) {
      try {
        const data = JSON.parse(saved);
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
        if (data.category) setCategory(data.category);
        if (data.tags) setTags(data.tags);
        if (data.preferences) setPreferences(data.preferences);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  const useSampleData = () => {
    setTitle('Customer Onboarding Process');
    setDescription('Create a comprehensive onboarding process for new customers that includes account setup, product training, and initial support touchpoints to ensure successful adoption and satisfaction.');
    setCategory('Customer Service');
    setTags(['onboarding', 'customer-success', 'training', 'support']);
    setCurrentStep(1);
  };

  const clearDraft = () => {
    localStorage.removeItem('sop-form-draft');
    if (onClearEdit) onClearEdit();
  };

  const handleGenerate = () => {
    onGenerate(preferences);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return title.trim() && description.trim();
      case 2: return true; // Tags are optional
      case 3: return true; // Preferences have defaults
      default: return false;
    }
  };

  const steps = [
    { number: 1, title: 'SOP Information', description: 'Basic details about your SOP' },
    { number: 2, title: 'Tags & Keywords', description: 'Organize and categorize' },
    { number: 3, title: 'Generation Preferences', description: 'Customize output style' }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              {isEditing ? 'Edit SOP & Workflow' : 'Generate SOP & Workflow'}
            </h1>
            <p className="text-muted-foreground mt-1">
              Create comprehensive SOPs with matching visual workflows using AI
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing && (
              <Button variant="outline" onClick={useSampleData} size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Use Sample Data
              </Button>
            )}
            {isEditing && onClearEdit && (
              <Button variant="outline" onClick={clearDraft} size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Create New SOP
              </Button>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep === step.number 
                    ? 'bg-primary text-primary-foreground' 
                    : currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <div className="text-center mt-2">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-muted-foreground hidden sm:block">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-px mx-4 transition-colors ${
                  currentStep > step.number ? 'bg-green-500' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && <FileText className="h-5 w-5" />}
              {currentStep === 2 && <Badge className="h-5 w-5" />}
              {currentStep === 3 && <Sparkles className="h-5 w-5" />}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: SOP Information */}
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Title *
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Clear, descriptive title for your SOP</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      placeholder="e.g., Customer Onboarding Process"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={(value: SOPCategory) => setCategory(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Marketing">📢 Marketing</SelectItem>
                        <SelectItem value="HR">👥 HR</SelectItem>
                        <SelectItem value="Operations">⚙️ Operations</SelectItem>
                        <SelectItem value="Finance">💰 Finance</SelectItem>
                        <SelectItem value="Customer Service">🤝 Customer Service</SelectItem>
                        <SelectItem value="IT">💻 IT</SelectItem>
                        <SelectItem value="Sales">📈 Sales</SelectItem>
                        <SelectItem value="Quality Assurance">✅ Quality Assurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Description *
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Be specific about goals, stakeholders, and requirements</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Textarea
                    placeholder="Describe the process you want to create an SOP for. Include the main objectives, key stakeholders involved, and any specific requirements or constraints..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </>
            )}

            {/* Step 2: Tags & Keywords */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Add relevant tags and keywords to help organize and categorize your SOP. This will improve searchability and organization.
                </div>
                <TagManager 
                  tags={tags} 
                  setTags={setTags}
                  placeholder="e.g., onboarding, training, compliance"
                />
                <div className="text-xs text-muted-foreground">
                  Suggested tags: onboarding, training, compliance, workflow, process, documentation
                </div>
              </div>
            )}

            {/* Step 3: Generation Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <Select value={preferences.tone} onValueChange={(value: any) => setPreferences(prev => ({ ...prev, tone: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">📋 Formal</SelectItem>
                        <SelectItem value="casual">💬 Casual</SelectItem>
                        <SelectItem value="instructional">🎓 Instructional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Output Length</Label>
                    <Select value={preferences.outputLength} onValueChange={(value: any) => setPreferences(prev => ({ ...prev, outputLength: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concise">⚡ Concise</SelectItem>
                        <SelectItem value="detailed">📖 Detailed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="compliance"
                    checked={preferences.includeCompliance}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, includeCompliance: checked }))}
                  />
                  <Label htmlFor="compliance" className="flex items-center gap-2">
                    Include compliance and safety steps
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Adds regulatory compliance and safety considerations</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                </div>

                <Button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
                </Button>

                {showAdvanced && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label>Output Language</Label>
                      <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">🇺🇸 English</SelectItem>
                          <SelectItem value="Spanish">🇪🇸 Spanish</SelectItem>
                          <SelectItem value="French">🇫🇷 French</SelectItem>
                          <SelectItem value="German">🇩🇪 German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Separator />

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              <div className="flex gap-2">
                {currentStep < 3 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                    disabled={!isStepValid(currentStep)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !title.trim() || !description.trim()}
                    className="px-8"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Workflow className="h-4 w-4 mr-2" />
                        Generate SOP & Workflow
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default SteppedSOPForm;
