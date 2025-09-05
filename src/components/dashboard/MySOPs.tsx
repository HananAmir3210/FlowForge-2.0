import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, Trash2, Download, Workflow, AlertCircle, FileText, LayoutGrid, List, FileText as FileTextIcon, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import SOPViewModal from '@/components/modals/SOPViewModal';
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal';
import InteractiveWorkflowModal from '@/components/InteractiveWorkflowModal';
import { exportSOPToPDF } from '@/utils/pdfExport';
import type { Database } from '@/integrations/supabase/types';

type SOP = Database['public']['Tables']['sops']['Row'] & {
  status?: 'draft' | 'published' | 'archived';
};

interface MySOPsProps {
  onEdit?: (sop: SOP) => void;
}

const MySOPs: React.FC<MySOPsProps> = ({ onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sops, setSOPs] = useState<SOP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSOP, setSelectedSOP] = useState<SOP | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteSOPId, setDeleteSOPId] = useState<string | null>(null);
  const [workflowModalSOP, setWorkflowModalSOP] = useState<SOP | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Get status badge color based on SOP status
  const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'published':
        return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">My SOPs</h1>
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        
        {/* Search and filter skeleton */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full md:w-96 animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24 animate-pulse ml-auto"></div>
        </div>
        
        {/* Table skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`p-4 ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}`}>
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
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
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          My SOPs
        </h1>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'outline' : 'ghost'} 
            size="sm" 
            onClick={() => setViewMode('grid')}
            className="h-9 w-9 p-0 flex items-center justify-center"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'outline' : 'ghost'} 
            size="sm" 
            onClick={() => setViewMode('list')}
            className="h-9 w-9 p-0 flex items-center justify-center"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search SOPs by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 rounded-lg border-gray-300 dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-48 h-11 rounded-lg border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-gray-200 dark:border-gray-700 shadow-lg">
              <SelectItem value="all" className="rounded-md">All Categories</SelectItem>
              <SelectItem value="Marketing" className="rounded-md">Marketing</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Customer Service">Customer Service</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
            </SelectContent>
          </Select>
          <Button className="h-11 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New SOP
          </Button>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSOPs.map((sop) => (
            <motion.div 
              key={sop.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                        {sop.title}
                      </CardTitle>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeVariant(sop.status || 'draft')}`}>
                        {sop.status || 'Draft'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Last updated: {new Date(sop.updated_at || sop.created_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <Badge variant="outline" className="text-xs border-gray-200 dark:border-gray-600">
                      {sop.category || 'Uncategorized'}
                    </Badge>
                  </div>
                  
                  {sop.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{sop.description}</p>
                  )}
                </CardHeader>
                
                <div className="px-4 pb-4 mt-auto">
                  {sop.tags && sop.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {sop.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {sop.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{sop.tags.length - 3} more</Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleView(sop)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(sop)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {sop.workflow_data && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewWorkflow(sop)}
                          className="h-8 w-8 p-0 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                          title="Workflow"
                        >
                          <Workflow className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleExportPDF(sop)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                        title="Export PDF"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setDeleteSOPId(sop.id)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSOPs.map((sop) => (
                  <motion.tr 
                    key={sop.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                          <FileTextIcon className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {sop.title}
                          </div>
                          {sop.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {sop.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="text-xs">
                        {sop.category || 'Uncategorized'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeVariant(sop.status || 'draft')}`}>
                        {sop.status || 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(sop.updated_at || sop.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleView(sop)}
                          className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(sop)}
                          className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleExportPDF(sop)}
                          className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                          title="Export PDF"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setDeleteSOPId(sop.id)}
                          className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredSOPs.length === 0 && !loading && !error && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center"
        >
          <div className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-4">
            <FileTextIcon className="h-full w-full opacity-40" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            {sops.length === 0 ? 'No SOPs created yet' : 'No SOPs found'}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {sops.length === 0 
              ? 'Get started by creating your first standard operating procedure.' 
              : 'Try adjusting your search or filter to find what you\'re looking for.'}
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => {}}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              New SOP
            </Button>
          </div>
          {sops.length > 0 && (searchTerm || filterCategory !== 'all') && (
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                }}
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Clear filters
              </Button>
            </div>
          )}
        </motion.div>
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
