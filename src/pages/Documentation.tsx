import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Code, Zap, Settings, Users, Shield, ChevronRight, ExternalLink, Download } from 'lucide-react';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('Getting Started');

  const sections = [
    'Getting Started',
    'Platform Setup',
    'Usage Guides',
    'Advanced Features',
    'API Reference',
    'Troubleshooting',
    'Best Practices'
  ];

  const documentationItems = [
    {
      id: 1,
      title: "Quick Start Guide",
      description: "Get up and running with Flowforge in under 10 minutes",
      section: "Getting Started",
      icon: Zap,
      readTime: "5 min",
      difficulty: "Beginner",
      tags: ["Setup", "Basics", "Quick Start"],
      content: "Step-by-step guide to create your first SOP"
    },
    {
      id: 2,
      title: "Account Setup and Configuration",
      description: "Complete guide to setting up your Flowforge account and workspace",
      section: "Platform Setup",
      icon: Settings,
      readTime: "10 min",
      difficulty: "Beginner",
      tags: ["Account", "Configuration", "Workspace"],
      content: "Detailed account configuration instructions"
    },
    {
      id: 3,
      title: "Creating Your First SOP",
      description: "Learn how to use AI to generate professional SOPs from simple descriptions",
      section: "Usage Guides",
      icon: BookOpen,
      readTime: "8 min",
      difficulty: "Beginner",
      tags: ["SOP", "AI", "Generation"],
      content: "Complete walkthrough of SOP creation process"
    },
    {
      id: 4,
      title: "Team Collaboration Features",
      description: "Master team workspaces, sharing, and collaborative editing",
      section: "Usage Guides",
      icon: Users,
      readTime: "12 min",
      difficulty: "Intermediate",
      tags: ["Teams", "Collaboration", "Sharing"],
      content: "Guide to team features and collaboration tools"
    },
    {
      id: 5,
      title: "Advanced AI Customization",
      description: "Fine-tune AI generation with custom prompts and preferences",
      section: "Advanced Features",
      icon: Code,
      readTime: "15 min",
      difficulty: "Advanced",
      tags: ["AI", "Customization", "Advanced"],
      content: "Advanced AI configuration and customization"
    },
    {
      id: 6,
      title: "API Authentication",
      description: "Learn how to authenticate and make your first API calls",
      section: "API Reference",
      icon: Shield,
      readTime: "7 min",
      difficulty: "Intermediate",
      tags: ["API", "Authentication", "Security"],
      content: "API authentication methods and examples"
    },
    {
      id: 7,
      title: "Common Issues and Solutions",
      description: "Troubleshoot the most common problems and their solutions",
      section: "Troubleshooting",
      icon: Settings,
      readTime: "10 min",
      difficulty: "Beginner",
      tags: ["Troubleshooting", "Issues", "Solutions"],
      content: "Common problems and their solutions"
    },
    {
      id: 8,
      title: "SOP Writing Best Practices",
      description: "Industry best practices for creating effective SOPs",
      section: "Best Practices",
      icon: BookOpen,
      readTime: "20 min",
      difficulty: "Intermediate",
      tags: ["Best Practices", "Writing", "Quality"],
      content: "Professional SOP writing guidelines"
    }
  ];

  const filteredItems = documentationItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSection = selectedSection === 'All' || item.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-flowforge-green text-white';
      case 'Intermediate': return 'bg-yellow-500 text-white';
      case 'Advanced': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const quickLinks = [
    { title: "API Reference", description: "Complete API documentation", icon: Code, external: true },
    { title: "Video Tutorials", description: "Step-by-step video guides", icon: Zap, external: true },
    { title: "Community Forum", description: "Get help from the community", icon: Users, external: true },
    { title: "Download SDK", description: "Official SDKs and libraries", icon: Download, external: false }
  ];

  return (
    <Layout title="Documentation">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-montserrat">
            Documentation
          </h2>
          <p className="text-xl text-[#EEEEEE] font-inter max-w-4xl mx-auto">
            Everything you need to know about using Flowforge effectively. From basic setup to advanced 
            features, find comprehensive guides and technical documentation.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 rounded-xl border-gray-200 font-open-sans"
          />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((link, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:-translate-y-1 cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="p-3 bg-flowforge-blue/5 rounded-2xl group-hover:bg-flowforge-blue/10 transition-colors w-fit mx-auto mb-3">
                  <link.icon className="h-6 w-6 text-flowforge-blue" />
                </div>
                <h3 className="font-semibold text-flowforge-blue mb-1 font-montserrat">
                  {link.title}
                </h3>
                <p className="text-sm text-flowforge-dark/70 font-open-sans">
                  {link.description}
                </p>
                {link.external && (
                  <ExternalLink className="h-4 w-4 text-flowforge-blue/50 mx-auto mt-2" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg rounded-2xl sticky top-4">
              <CardHeader>
                <CardTitle className="text-white font-montserrat text-flowforge-blue">
                  Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section}
                    variant={selectedSection === section ? "default" : "ghost"}
                    onClick={() => setSelectedSection(section)}
                    className={`w-full justify-start rounded-xl font-open-sans ${
                      selectedSection === section 
                        ? 'bg-flowforge-blue text-white' 
                        : 'text-flowforge-dark hover:bg-flowforge-blue/5'
                    }`}
                  >
                    {section}
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Documentation Items */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-flowforge-blue/5 rounded-2xl group-hover:bg-flowforge-blue/10 transition-colors">
                          <item.icon className="h-6 w-6 text-flowforge-blue" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-white font-montserrat text-flowforge-blue mb-2">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="text-[#EEEEEE] font-inter leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getDifficultyColor(item.difficulty)}>
                        {item.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-flowforge-dark/70 font-open-sans">
                        <span>{item.readTime} read</span>
                        <span>•</span>
                        <span>{item.section}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-flowforge-gray text-flowforge-dark">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="bg-flowforge-blue hover:bg-flowforge-blue/90 text-white rounded-xl font-open-sans"
                      >
                        Read Guide
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border border-white text-white bg-white/10 hover:bg-brand-blue hover:text-white rounded-xl font-montserrat transition shadow-md"
                      >
                        <Download className="h-4 w-4 mr-1 text-white" />
                        PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-flowforge-blue/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-flowforge-blue mb-2 font-montserrat">
                  No documentation found
                </h3>
                <p className="text-flowforge-dark/70 font-open-sans">
                  Try adjusting your search or browse different sections
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <Card className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg rounded-2xl">
          <CardContent className="pt-8 text-center">
            <h3 className="text-2xl font-bold mb-4 font-montserrat text-white">
              Still Need Help?
            </h3>
            <p className="text-[#EEEEEE] mb-6 max-w-2xl mx-auto font-open-sans">
              Can't find what you're looking for? Our support team is here to help you get the most out of Flowforge.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="btn-premium font-montserrat text-white text-lg shadow-xl px-8 py-3 rounded-xl">Contact Support</Button>
              <Button variant="outline" className="border border-brand-blue/70 bg-white/10 text-white font-montserrat hover:bg-brand-blue hover:text-white transition px-8 py-3 rounded-xl">Join Community</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Documentation;