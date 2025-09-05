import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Users, Briefcase, Settings, Heart, Shield, Zap, Download, Eye } from 'lucide-react';

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'HR & Onboarding',
    'Operations',
    'Customer Service',
    'Marketing',
    'Finance',
    'IT & Security',
    'Quality Assurance'
  ];

  const templates = [
    {
      id: 1,
      title: "Employee Onboarding Process",
      description: "Complete guide for welcoming new team members with all necessary steps and documentation.",
      category: "HR & Onboarding",
      icon: Users,
      steps: 12,
      estimatedTime: "2-3 days",
      difficulty: "Beginner",
      tags: ["HR", "Onboarding", "New Hire", "Documentation"],
      popular: true
    },
    {
      id: 2,
      title: "Customer Support Ticket Resolution",
      description: "Systematic approach to handling customer inquiries and resolving issues efficiently.",
      category: "Customer Service",
      icon: Heart,
      steps: 8,
      estimatedTime: "30-60 minutes",
      difficulty: "Intermediate",
      tags: ["Support", "Customer Service", "Tickets", "Resolution"],
      popular: true
    },
    {
      id: 3,
      title: "Monthly Financial Reporting",
      description: "Step-by-step process for generating accurate monthly financial reports and analysis.",
      category: "Finance",
      icon: Briefcase,
      steps: 15,
      estimatedTime: "4-6 hours",
      difficulty: "Advanced",
      tags: ["Finance", "Reporting", "Analysis", "Monthly"],
      popular: false
    },
    {
      id: 4,
      title: "IT Security Incident Response",
      description: "Comprehensive protocol for identifying, containing, and resolving security incidents.",
      category: "IT & Security",
      icon: Shield,
      steps: 10,
      estimatedTime: "1-4 hours",
      difficulty: "Advanced",
      tags: ["Security", "Incident", "Response", "IT"],
      popular: false
    },
    {
      id: 5,
      title: "Product Launch Campaign",
      description: "Complete marketing workflow for launching new products with maximum impact.",
      category: "Marketing",
      icon: Zap,
      steps: 20,
      estimatedTime: "2-4 weeks",
      difficulty: "Intermediate",
      tags: ["Marketing", "Launch", "Campaign", "Product"],
      popular: true
    },
    {
      id: 6,
      title: "Quality Control Inspection",
      description: "Standardized process for conducting thorough quality inspections and documentation.",
      category: "Quality Assurance",
      icon: Settings,
      steps: 14,
      estimatedTime: "1-2 hours",
      difficulty: "Intermediate",
      tags: ["Quality", "Inspection", "Control", "Standards"],
      popular: false
    },
    {
      id: 7,
      title: "Daily Operations Checklist",
      description: "Essential daily tasks and procedures to ensure smooth business operations.",
      category: "Operations",
      icon: FileText,
      steps: 6,
      estimatedTime: "30 minutes",
      difficulty: "Beginner",
      tags: ["Operations", "Daily", "Checklist", "Routine"],
      popular: true
    },
    {
      id: 8,
      title: "Remote Work Setup Guide",
      description: "Complete guide for setting up productive remote work environments and processes.",
      category: "HR & Onboarding",
      icon: Users,
      steps: 9,
      estimatedTime: "1-2 hours",
      difficulty: "Beginner",
      tags: ["Remote", "Setup", "Work", "Guide"],
      popular: false
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-flowforge-green text-white';
      case 'Intermediate': return 'bg-yellow-500 text-white';
      case 'Advanced': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Layout title="Templates">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-montserrat">
            SOP Templates Library
          </h2>
          <p className="text-xl text-[#EEEEEE] font-inter max-w-4xl mx-auto">
            Jump-start your process documentation with our professionally crafted SOP templates. 
            Choose from industry-specific templates and customize them to fit your needs.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative w-full">
            <Input
              placeholder="Search templates by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 rounded-xl border border-brand-blue/60 bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 font-open-sans shadow-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/80"
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-white/80" />
            </span>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl font-open-sans px-4 py-2 transition shadow-md ${
                  selectedCategory === category
                    ? 'bg-brand-blue text-white btn-premium border-none'
                    : 'bg-white/10 border border-brand-blue/60 text-white hover:bg-brand-blue hover:text-white'
                }`}
                variant={selectedCategory === category ? undefined : "outline"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-flowforge-blue mb-1 font-montserrat">
                {templates.length}
              </div>
              <div className="text-sm text-flowforge-dark/70 font-open-sans">
                Total Templates
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-flowforge-blue mb-1 font-montserrat">
                {categories.length - 1}
              </div>
              <div className="text-sm text-flowforge-dark/70 font-open-sans">
                Categories
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-flowforge-blue mb-1 font-montserrat">
                {templates.filter(t => t.popular).length}
              </div>
              <div className="text-sm text-flowforge-dark/70 font-open-sans">
                Popular
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-flowforge-blue mb-1 font-montserrat">
                Free
              </div>
              <div className="text-sm text-flowforge-dark/70 font-open-sans">
                All Templates
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-flowforge-gray bg-white/10 backdrop-blur-md text-white">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <template.icon className="h-8 w-8 text-white drop-shadow-lg" />
                  <CardTitle className="text-xl text-white font-montserrat">{template.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#EEEEEE] font-open-sans">
                  {template.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-flowforge-blue/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-flowforge-blue mb-2 font-montserrat">
              No templates found
            </h3>
            <p className="text-flowforge-dark/70 font-open-sans">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* CTA Section */}
        <Card className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg rounded-2xl">
          <CardContent className="pt-8 text-center">
            <h3 className="text-2xl font-bold mb-4 font-montserrat text-white">
              Need a Custom Template?
            </h3>
            <p className="text-[#EEEEEE] mb-6 max-w-2xl mx-auto font-open-sans">
              Can't find the perfect template for your needs? Our AI can generate custom SOPs 
              tailored specifically to your business processes and requirements.
            </p>
            <Button 
              className="btn-premium font-montserrat text-white text-lg shadow-xl px-8 py-3 rounded-xl"
            >
              Generate Custom SOP
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Templates;