import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, Trash2, Download, Workflow, AlertCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import SOPViewModal from '@/components/modals/SOPViewModal';
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal';
import InteractiveWorkflowModal from '@/components/InteractiveWorkflowModal';
import { exportSOPToPDF } from '@/utils/pdfExport';
import type { Database } from '@/integrations/supabase/types';

type SOP = Database['public']['Tables']['sops']['Row'];

interface MySOPsProps {
  onEdit?: (sop: SOP) => void;
}

const MySOPs: React.FC<MySOPsProps> = ({ onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sops, setSOPs] = useState<SOP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSOP, setSelectedSOP] = useState<SOP | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteSOPId, setDeleteSOPId] = useState<string | null>(null);
  const [workflowModalSOP, setWorkflowModalSOP] = useState<SOP | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSOPs();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('sops_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'sops', filter: `user_id=eq.${user.id}` },
          (payload) => {
            console.log('Real-time update received:', payload);
            fetchSOPs();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchSOPs = async () => {
    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching SOPs for user:', user.id);
      
      const { data, error: fetchError } = await supabase
        .from('sops')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching SOPs:', fetchError);
        throw fetchError;
      }
      
      console.log('SOPs fetched successfully:', data?.length || 0, 'items');
      setSOPs(data || []);
    } catch (error: any) {
      console.error('Error in fetchSOPs:', error);
      setError(error.message || 'Failed to fetch SOPs');
      toast({
        title: "Error fetching SOPs",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSOPs = sops.filter(sop => {
    const matchesSearch = sop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sop.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || sop.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleView = (sop: SOP) => {
    setSelectedSOP(sop);
    setIsViewModalOpen(true);
  };

  const handleEdit = (sop: SOP) => {
    if (onEdit) {
      onEdit(sop);
    } else {
      toast({
        title: "Edit Feature",
        description: "Edit functionality will be available from the Generate SOP page.",
      });
    }
  };

  const handleDelete = async (sopId: string) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to delete SOPs.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Deleting SOP:', sopId);
      const { error } = await supabase
        .from('sops')
        .delete()
        .eq('id', sopId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting SOP:', error);
        throw error;
      }
      
      console.log('SOP deleted successfully');
      toast({
        title: "SOP Deleted",
        description: "The SOP has been successfully deleted.",
      });
    } catch (error: any) {
      console.error('Error in handleDelete:', error);
      toast({
        title: "Error deleting SOP",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
    setDeleteSOPId(null);
  };

  const handleExportMarkdown = (sop: SOP) => {
    try {
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
    } catch (error) {
      console.error('Error exporting SOP:', error);
      toast({
        title: "Export Failed",
        description: "Unable to export SOP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = (sop: SOP) => {
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

  const handleViewWorkflow = (sop: SOP) => {
    setWorkflowModalSOP(sop);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">My SOPs</h1>
        </div>
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive mb-4">Failed to load SOPs</p>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchSOPs} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">My SOPs</h1>
        <div className="text-sm text-muted-foreground">
          {filteredSOPs.length} SOP{filteredSOPs.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search SOPs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Operations">Operations</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Customer Service">Customer Service</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* SOPs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSOPs.map((sop) => (
          <Card key={sop.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{sop.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{sop.category}</Badge>
                  {sop.workflow_data && (
                    <Badge variant="secondary" className="text-xs">
                      <Workflow className="h-3 w-3 mr-1" />
                      Workflow
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Created: {new Date(sop.created_at).toLocaleDateString()}
              </p>
              {sop.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{sop.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sop.tags && sop.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {sop.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleView(sop)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(sop)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {sop.workflow_data && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleViewWorkflow(sop)}
                      className="col-span-2"
                    >
                      <Workflow className="h-4 w-4 mr-1" />
                      Interactive Workflow
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleExportMarkdown(sop)}>
                    <Download className="h-4 w-4 mr-1" />
                    MD
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleExportPDF(sop)}>
                    <FileText className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setDeleteSOPId(sop.id)}
                  className="w-full text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSOPs.length === 0 && !loading && !error && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              {sops.length === 0 
                ? "No SOPs created yet. Start by generating your first SOP!" 
                : "No SOPs found matching your criteria."
              }
            </p>
            {searchTerm || filterCategory !== 'all' ? (
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter settings.
              </p>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <SOPViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        sop={selectedSOP}
      />
      
      <DeleteConfirmModal
        isOpen={!!deleteSOPId}
        onClose={() => setDeleteSOPId(null)}
        onConfirm={() => deleteSOPId && handleDelete(deleteSOPId)}
        title="Delete SOP"
        description="Are you sure you want to delete this SOP? This action cannot be undone."
      />

      {/* Interactive Workflow Modal */}
      {workflowModalSOP && (
        <InteractiveWorkflowModal
          isOpen={!!workflowModalSOP}
          onClose={() => setWorkflowModalSOP(null)}
          steps={workflowModalSOP.workflow_data as any[] || []}
          title={`${workflowModalSOP.title} - Workflow`}
        />
      )}
    </div>
  );
};

export default MySOPs;
