
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Mail, Phone, Book, Loader2, ExternalLink, X, Play, Users, FileText, Settings, CreditCard, HelpCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SupportTicket = Database['public']['Tables']['support_tickets']['Row'];

const SupportSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const [knowledgeBaseOpen, setKnowledgeBaseOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Live chat state
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; message: string; sender: 'user' | 'support'; timestamp: Date }>>([
    { id: '1', message: 'Hello! How can I help you today?', sender: 'support', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const [ticket, setTicket] = useState({
    subject: '',
    category: '',
    description: '',
    priority: '',
  });

  useEffect(() => {
    if (user) {
      loadTickets();
    }
  }, [user]);

  const loadTickets = async () => {
    if (!user) return;

    try {
      setTicketsLoading(true);
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTickets(data || []);
    } catch (error: any) {
      console.error('Error loading tickets:', error);
    } finally {
      setTicketsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a ticket",
        variant: "destructive",
      });
      return;
    }

    if (!ticket.subject || !ticket.category || !ticket.priority || !ticket.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          subject: ticket.subject,
          category: ticket.category,
          priority: ticket.priority,
          description: ticket.description,
          status: 'open'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Support ticket submitted successfully",
      });

      setTicket({
        subject: '',
        category: '',
        description: '',
        priority: '',
      });

      loadTickets();
    } catch (error: any) {
      console.error('Error submitting ticket:', error);
      toast({
        title: "Error",
        description: "Failed to submit support ticket",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openLiveChat = () => {
    setLiveChatOpen(true);
  };

  const sendChatMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      message: newMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate support response
    setTimeout(() => {
      const supportMessage = {
        id: (Date.now() + 1).toString(),
        message: "Thank you for your message. A support agent will respond shortly. In the meantime, you might find our knowledge base helpful.",
        sender: 'support' as const,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, supportMessage]);
    }, 1500);
  };

  const openEmailSupport = () => {
    const subject = encodeURIComponent('Support Request - FlowForge');
    const body = encodeURIComponent(`Hi Support Team,

I need assistance with:

Please describe your issue here...

Best regards,
${user?.email || 'User'}`);
    
    window.open(`mailto:support@flowforge.com?subject=${subject}&body=${body}`, '_blank');
    
    toast({
      title: "Email Client Opened",
      description: "Your default email client should open with a pre-filled support request.",
    });
  };

  const openPhoneSupport = () => {
    const phoneNumber = '+1-555-123-4567';
    
    // Try to open phone dialer on mobile devices
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
      window.open(`tel:${phoneNumber}`, '_self');
    }
    
    toast({
      title: "Phone Support",
      description: `Call us at ${phoneNumber}\nAvailable Monday-Friday, 9 AM - 5 PM EST`,
      duration: 5000,
    });
  };

  const openVideoTutorials = () => {
    // Simulate opening video tutorials platform
    toast({
      title: "Video Tutorials",
      description: "Opening our comprehensive video tutorial library...",
    });
    
    // In a real app, this would open a video platform or YouTube channel
    setTimeout(() => {
      window.open('https://youtube.com/playlist?list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO', '_blank');
    }, 1000);
  };

  const openCommunityForum = () => {
    toast({
      title: "Community Forum",
      description: "Redirecting to our community forum...",
    });
    
    setTimeout(() => {
      window.open('https://community.flowforge.com', '_blank');
    }, 1000);
  };

  const openAPIDocumentation = () => {
    toast({
      title: "API Documentation",
      description: "Opening our comprehensive API documentation...",
    });
    
    setTimeout(() => {
      window.open('https://docs.flowforge.com/api', '_blank');
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const knowledgeBaseArticles = [
    {
      id: 1,
      title: "Getting Started with FlowForge",
      category: "Getting Started",
      content: "Learn how to create your first SOP using our AI-powered platform. This comprehensive guide covers account setup, basic navigation, and creating your first Standard Operating Procedure.",
      detailedContent: `
        Welcome to FlowForge! Here's how to get started:
        
        1. Account Setup
        - Sign up for your free account
        - Complete your profile information
        - Choose your subscription plan
        
        2. Creating Your First SOP
        - Navigate to "Generate SOP & Workflow"
        - Describe your process in natural language
        - Select appropriate categories and tags
        - Review and customize the generated SOP
        
        3. Managing Your SOPs
        - Access all SOPs from "My SOPs" section
        - Edit, duplicate, or delete SOPs as needed
        - Export SOPs in various formats (PDF, Word, HTML)
        
        4. Team Collaboration
        - Invite team members to your workspace
        - Assign roles and permissions
        - Share SOPs with specific team members
      `
    },
    {
      id: 2,
      title: "How to Export SOPs to Different Formats",
      category: "Features",
      content: "Export your SOPs to PDF, Word, HTML, and other formats. Learn about formatting options, custom branding features, and batch export capabilities.",
      detailedContent: `
        FlowForge supports multiple export formats:
        
        1. PDF Export
        - Professional formatting with your company branding
        - Include flowcharts and visual elements
        - Password protection options
        
        2. Microsoft Word Export
        - Editable .docx format
        - Maintains formatting and structure
        - Perfect for further customization
        
        3. HTML Export
        - Web-ready format
        - Interactive elements included
        - Mobile-responsive design
        
        4. Batch Export
        - Export multiple SOPs at once
        - Choose consistent formatting
        - Organize by categories or tags
      `
    },
    {
      id: 3,
      title: "Managing Team Collaboration",
      category: "Team Features",
      content: "Set up team workspaces, assign roles and permissions, share SOPs with team members, and track collaborative editing sessions.",
      detailedContent: `
        Collaborate effectively with your team:
        
        1. Team Workspaces
        - Create separate workspaces for different departments
        - Organize SOPs by projects or teams
        - Centralized access control
        
        2. Roles and Permissions
        - Admin: Full access to all features
        - Editor: Can create and modify SOPs
        - Viewer: Read-only access to assigned SOPs
        - Guest: Limited access to specific SOPs
        
        3. Real-time Collaboration
        - See who's editing in real-time
        - Comment and suggestion system
        - Version history and change tracking
        
        4. Sharing and Access Control
        - Share SOPs via secure links
        - Set expiration dates for shared links
        - Track who has accessed shared content
      `
    },
    {
      id: 4,
      title: "Billing and Subscription Management",
      category: "Account",
      content: "Understand our pricing plans, manage your subscription, update payment methods, and access billing history.",
      detailedContent: `
        Manage your FlowForge subscription:
        
        1. Pricing Plans
        - Free: Basic features, limited SOPs
        - Pro: Advanced features, unlimited SOPs
        - Enterprise: Full features, team management
        
        2. Subscription Management
        - Upgrade or downgrade anytime
        - Prorate billing for plan changes
        - Cancel subscription with data retention
        
        3. Payment Methods
        - Credit/debit cards accepted
        - PayPal integration
        - Invoice billing for enterprises
        
        4. Billing History
        - Download invoices and receipts
        - Track usage and billing cycles
        - Set up billing alerts
      `
    },
    {
      id: 5,
      title: "API Documentation and Integration",
      category: "Developer",
      content: "Integrate FlowForge with your existing tools using our REST API. Includes authentication, endpoints reference, and code examples.",
      detailedContent: `
        FlowForge API Integration:
        
        1. Authentication
        - API key generation and management
        - OAuth 2.0 support for secure access
        - Rate limiting and usage monitoring
        
        2. Available Endpoints
        - SOPs: Create, read, update, delete
        - Workflows: Generate and manage visual workflows
        - Teams: Manage team members and permissions
        - Analytics: Access usage statistics
        
        3. Code Examples
        - JavaScript/Node.js examples
        - Python integration samples
        - PHP and other language examples
        
        4. Webhooks
        - Real-time notifications for SOP changes
        - Custom webhook endpoints
        - Event filtering and payload customization
      `
    },
    {
      id: 6,
      title: "Troubleshooting Common Issues",
      category: "Troubleshooting",
      content: "Solutions to frequently encountered problems including login issues, generation errors, export problems, and performance optimization tips.",
      detailedContent: `
        Common issues and solutions:
        
        1. Login Problems
        - Password reset procedures
        - Two-factor authentication issues
        - Account lockout resolution
        
        2. SOP Generation Issues
        - Input validation errors
        - AI generation timeouts
        - Content quality improvements
        
        3. Export Problems
        - Format compatibility issues
        - Large file handling
        - Browser-specific export issues
        
        4. Performance Optimization
        - Browser cache management
        - Internet connection requirements
        - System requirements and recommendations
      `
    }
  ];

  const filteredArticles = knowledgeBaseArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Options */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Get Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={liveChatOpen} onOpenChange={setLiveChatOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start" onClick={openLiveChat}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Live Chat Support</DialogTitle>
                    <DialogDescription>
                      Chat with our support team in real-time
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="h-64 border rounded-lg p-4 overflow-y-auto space-y-2">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                            msg.sender === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      />
                      <Button onClick={sendChatMessage} size="sm">
                        Send
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full justify-start" onClick={openEmailSupport}>
                <Mail className="h-4 w-4 mr-2" />
                Email Support
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>

              <Button variant="outline" className="w-full justify-start" onClick={openPhoneSupport}>
                <Phone className="h-4 w-4 mr-2" />
                Phone Support
              </Button>

              <Dialog open={knowledgeBaseOpen} onOpenChange={setKnowledgeBaseOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Book className="h-4 w-4 mr-2" />
                    Knowledge Base
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Knowledge Base</DialogTitle>
                    <DialogDescription>
                      Browse our comprehensive help articles
                    </DialogDescription>
                  </DialogHeader>
                  
                  {!selectedArticle ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          placeholder="Search articles..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-4"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-96">
                        {filteredArticles.map((article) => (
                          <Card 
                            key={article.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedArticle(article)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm">{article.title}</CardTitle>
                                <Badge variant="secondary" className="text-xs">
                                  {article.category}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-sm text-muted-foreground">
                                {article.content}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedArticle(null)}
                          >
                            ← Back
                          </Button>
                          <Badge variant="secondary">
                            {selectedArticle.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-4 overflow-y-auto max-h-96">
                        <h3 className="text-lg font-semibold">{selectedArticle.title}</h3>
                        <div className="prose prose-sm max-w-none">
                          <div style={{ whiteSpace: 'pre-line' }}>
                            {selectedArticle.detailedContent}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start" 
                onClick={() => {
                  setKnowledgeBaseOpen(true);
                  setSelectedArticle(knowledgeBaseArticles[0]);
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Getting Started Guide
              </Button>
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start"
                onClick={openVideoTutorials}
              >
                <Play className="h-4 w-4 mr-2" />
                Video Tutorials
              </Button>
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start"
                onClick={openAPIDocumentation}
              >
                <Settings className="h-4 w-4 mr-2" />
                API Documentation
              </Button>
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start"
                onClick={openCommunityForum}
              >
                <Users className="h-4 w-4 mr-2" />
                Community Forum
              </Button>
            </CardContent>
          </Card>

          {/* Company Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">FlowForge, Inc.</h4>
                <p className="text-sm text-muted-foreground">
                  123 Innovation Drive<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm">
                  <strong>Business Hours:</strong><br />
                  Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                  Saturday: 10:00 AM - 4:00 PM PST<br />
                  Sunday: Closed
                </p>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm">
                  <strong>Emergency Support:</strong><br />
                  Enterprise customers have access to 24/7 emergency support.<br />
                  Contact your account manager for details.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Ticket Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={ticket.subject}
                onChange={(e) => setTicket(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={ticket.category} onValueChange={(value) => setTicket(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="account">Account Issue</SelectItem>
                  <SelectItem value="integration">API/Integration</SelectItem>
                  <SelectItem value="training">Training Request</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority *</Label>
              <Select value={ticket.priority} onValueChange={(value) => setTicket(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - General questions</SelectItem>
                  <SelectItem value="medium">Medium - Minor issues</SelectItem>
                  <SelectItem value="high">High - Impacting productivity</SelectItem>
                  <SelectItem value="urgent">Urgent - System down</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={ticket.description}
                onChange={(e) => setTicket(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable"
                className="min-h-32"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Submit Ticket
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Expected response time: Low (24-48 hrs), Medium (12-24 hrs), High (4-12 hrs), Urgent (1-4 hrs)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Previous Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Your Support Tickets
            {ticketsLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No support tickets found</p>
              <p className="text-sm">Your submitted tickets will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((supportTicket) => (
                <div key={supportTicket.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{supportTicket.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        Ticket #{supportTicket.id} • {formatDate(supportTicket.created_at)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(supportTicket.priority)}>
                        {supportTicket.priority}
                      </Badge>
                      <Badge className={getStatusColor(supportTicket.status)}>
                        {supportTicket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Category: {supportTicket.category}
                  </p>
                  <p className="text-sm">{supportTicket.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-2 font-medium">
              How do I generate my first SOP?
              <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              To generate your first SOP, navigate to the "Generate SOP & Workflow" section, describe your process in natural language, 
              select a category, and click "Generate SOP". Our AI will create a comprehensive SOP for you in seconds.
            </p>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-2 font-medium">
              Can I export my SOPs to different formats?
              <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes! You can export your SOPs to PDF, Word, and HTML formats. Premium users also have access 
              to custom branding options and batch export capabilities.
            </p>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-2 font-medium">
              How do I upgrade my subscription?
              <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              You can upgrade your subscription by going to the Billing section and selecting a new plan. 
              Changes take effect immediately and are prorated based on your current billing cycle.
            </p>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-2 font-medium">
              Can I collaborate with my team?
              <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Absolutely! FlowForge supports team collaboration with role-based permissions, real-time editing, 
              commenting, and sharing capabilities. Invite team members from your Account Settings.
            </p>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between py-2 font-medium">
              Is there an API for integrations?
              <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes! FlowForge provides a comprehensive REST API for integrating with your existing tools and workflows. 
              Check our API documentation for detailed information and code examples.
            </p>
          </details>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSection;
