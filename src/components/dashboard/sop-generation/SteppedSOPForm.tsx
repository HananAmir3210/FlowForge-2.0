
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader2, FileText, Workflow, Info, Sparkles, Save, RotateCcw, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
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

const steps = [
  { id: 1, name: 'Basic Info', description: 'Title & Description' },
  { id: 2, name: 'Details', description: 'Category & Tags' },
  { id: 3, name: 'Preferences', description: 'Customize Output' },
  { id: 4, name: 'Review', description: 'Confirm & Generate' },
];

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
  const [direction, setDirection] = useState(1);
  const [preferences, setPreferences] = useState<SOPPreferences>({
    tone: 'formal',
    outputLength: 'detailed',
    includeCompliance: false,
    language: 'English'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const nextStep = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

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


  return (
    <TooltipProvider>
      <Card className="w-full max-w-4xl mx-auto overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-2">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-2xl font-bold text-foreground">
              {isEditing ? 'Edit SOP & Workflow' : 'Generate SOP & Workflow'}
            </CardTitle>
            <CardDescription className="text-foreground/80">
              {steps[currentStep - 1].description}
            </CardDescription>
          </div>
        </CardHeader>

      {/* Progress Steps */}
      <div className="px-6 pt-4">
        <nav aria-label="Progress" className="w-full">
          <ol className="flex items-center justify-between">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-9 w-full items-center',
                      stepIdx !== steps.length - 1 ? 'justify-end' : 'justify-center',
                      stepIdx !== 0 && 'justify-center',
                      stepIdx === 0 && 'justify-start'
                    )}
                  >
                    <span
                      className={cn(
                        'relative flex h-8 w-8 items-center justify-center rounded-full',
                        currentStep > step.id 
                          ? 'bg-primary text-primary-foreground'
                          : currentStep === step.id
                          ? 'border-2 border-primary bg-background text-primary'
                          : 'border-2 border-muted-foreground/20 bg-background text-muted-foreground',
                        'transition-colors duration-200 ease-in-out'
                      )}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <span className={cn(
                          'font-medium text-sm',
                          currentStep === step.id ? 'text-primary' : 'text-muted-foreground/70'
                        )}>
                          {step.id}
                        </span>
                      )}
                    </span>
                    {stepIdx !== steps.length - 1 && (
                      <div 
                        className={cn(
                          'h-0.5 flex-1 mx-2',
                          currentStep > step.id ? 'bg-primary' : 'bg-muted',
                          'transition-colors duration-300 ease-in-out'
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <span className={cn(
                      'text-xs font-medium',
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {step.name}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Step Content */}
      <CardContent className="pt-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-6"
          >
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

            <Separator className="my-6" />

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || isGenerating}
                className="group flex items-center gap-1.5 transition-all duration-200 hover:bg-primary/10 hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back
              </Button>
              
              <div className="flex items-center gap-3">
                {currentStep < steps.length ? (
                  <Button 
                    onClick={nextStep}
                    disabled={isGenerating}
                    className="group flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="group flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        Generate SOP
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  </TooltipProvider>
  );
};

export default SteppedSOPForm;
