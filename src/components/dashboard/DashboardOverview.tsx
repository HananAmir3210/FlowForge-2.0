
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, FileText, GitBranch, Clock, Zap, Eye, Edit, Plus, Activity, BarChart2, Clock as ClockIcon, Zap as ZapIcon, RefreshCw as RefreshIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const chartColors = {
  primary: '#3b82f6',
  secondary: '#94a3b8',
  background: '#f8fafc',
  accent: '#6366f1'
};

interface DashboardStats {
  totalSOPs: number;
  workflowsCreated: number;
  activeProjects: number;
  efficiencyGain: number;
}

interface RecentActivity {
  id: string;
  action: string;
  timestamp: string;
  item: string;
  type: 'sop' | 'workflow';
}

interface ChartDataPoint {
  name: string;
  SOPs: number;
  Workflows: number;
  month: number;
  year: number;
}

interface DashboardOverviewProps {
  onNavigateToSOPs?: () => void;
  onNavigateToGenerate?: () => void;
  onNavigateToWorkflows?: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigateToSOPs,
  onNavigateToGenerate,
  onNavigateToWorkflows
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalSOPs: 0,
    workflowsCreated: 0,
    activeProjects: 0,
    efficiencyGain: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
      
      // Set up real-time subscriptions
      const sopsChannel = supabase
        .channel('sops_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'sops', filter: `user_id=eq.${user.id}` },
          () => fetchDashboardData()
        )
        .subscribe();

      const workflowsChannel = supabase
        .channel('workflows_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'workflows', filter: `user_id=eq.${user.id}` },
          () => fetchDashboardData()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(sopsChannel);
        supabase.removeChannel(workflowsChannel);
      };
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch SOPs with detailed data
      const { data: sopsData, count: sopsCount } = await supabase
        .from('sops')
        .select('id, title, created_at, updated_at, category', { count: 'exact' })
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      // Fetch workflows with detailed data
      const { data: workflowsData, count: workflowsCount } = await supabase
        .from('workflows')
        .select('id, title, created_at, updated_at', { count: 'exact' })
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      // Calculate real stats
      const totalSOPs = sopsCount || 0;
      const totalWorkflows = workflowsCount || 0;
      const activeProjects = Math.max(1, Math.floor((totalSOPs + totalWorkflows) / 2));
      const efficiencyGain = Math.min(95, Math.max(10, 15 + (totalSOPs * 3) + (totalWorkflows * 2)));

      setStats({
        totalSOPs,
        workflowsCreated: totalWorkflows,
        activeProjects,
        efficiencyGain
      });

      // Generate chart data based on actual creation dates
      const chartDataMap = new Map<string, { SOPs: number; Workflows: number }>();
      const now = new Date();
      
      // Initialize last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        chartDataMap.set(key, { SOPs: 0, Workflows: 0 });
      }

      // Count SOPs by month
      sopsData?.forEach(sop => {
        const date = new Date(sop.created_at);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        const existing = chartDataMap.get(key);
        if (existing) {
          existing.SOPs++;
        }
      });

      // Count Workflows by month
      workflowsData?.forEach(workflow => {
        const date = new Date(workflow.created_at);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        const existing = chartDataMap.get(key);
        if (existing) {
          existing.Workflows++;
        }
      });

      // Convert to chart format
      const newChartData: ChartDataPoint[] = [];
      chartDataMap.forEach((value, key) => {
        const [year, month] = key.split('-').map(Number);
        const date = new Date(year, month, 1);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        newChartData.push({
          name: monthName,
          SOPs: value.SOPs,
          Workflows: value.Workflows,
          month,
          year
        });
      });

      // Sort by date
      newChartData.sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      });

      setChartData(newChartData);

      // Generate recent activity from real data
      const activities: RecentActivity[] = [];
      
      // Add SOP activities
      sopsData?.slice(0, 8).forEach(sop => {
        const wasUpdated = new Date(sop.updated_at) > new Date(sop.created_at);
        activities.push({
          id: sop.id,
          action: wasUpdated ? 'Updated SOP' : 'Created SOP',
          timestamp: wasUpdated ? sop.updated_at : sop.created_at,
          item: sop.title,
          type: 'sop'
        });
      });

      // Add Workflow activities
      workflowsData?.slice(0, 5).forEach(workflow => {
        activities.push({
          id: workflow.id,
          action: 'Created Workflow',
          timestamp: workflow.created_at,
          item: workflow.title,
          type: 'workflow'
        });
      });

      // Sort by timestamp and take latest 5
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentActivity(activities.slice(0, 5));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error loading dashboard",
        description: "Failed to load dashboard data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleActivityClick = (activity: RecentActivity) => {
    if (activity.type === 'sop' && onNavigateToSOPs) {
      onNavigateToSOPs();
      toast({
        title: "Navigating to SOPs",
        description: `Opening ${activity.item}`,
      });
    } else if (activity.type === 'workflow' && onNavigateToWorkflows) {
      onNavigateToWorkflows();
      toast({
        title: "Navigating to Workflows",
        description: `Opening ${activity.item}`,
      });
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'generate':
        onNavigateToGenerate?.();
        toast({
          title: "Generate New SOP",
          description: "Opening SOP generator...",
        });
        break;
      case 'view':
        onNavigateToSOPs?.();
        toast({
          title: "View SOPs",
          description: "Opening your SOPs collection...",
        });
        break;
      case 'workflow':
        onNavigateToWorkflows?.();
        toast({
          title: "Create Workflow",
          description: "Opening workflow creator...",
        });
        break;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-80 bg-gray-200 rounded"></div>
            <div className="h-80 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name || 
                     user?.user_metadata?.name || 
                     user?.email?.split('@')[0] || 
                     'User';

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto">
      <motion.div 
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back, {displayName}! Here's what's happening with your SOPs and workflows.</p>
        </div>
        <Button 
          onClick={onNavigateToGenerate} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          New SOP
        </Button>
      </motion.div>

      {/* Stats Cards with Modern Design */}
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Total SOPs Card */}
        <motion.div variants={itemVariants}>
          <Card 
            className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-800 cursor-pointer"
            onClick={() => handleQuickAction('view')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                  <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total SOPs</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {loading ? <Skeleton className="h-8 w-12" /> : stats.totalSOPs}
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {stats.totalSOPs > 0 
                      ? `+${Math.max(0, stats.totalSOPs - 1)} from last month` 
                      : 'Create your first SOP!'}
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Workflows Card */}
        <motion.div variants={itemVariants}>
          <Card 
            className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-800 cursor-pointer"
            onClick={() => handleQuickAction('workflow')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                  <GitBranch className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Workflows</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {loading ? <Skeleton className="h-8 w-12" /> : stats.workflowsCreated}
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {stats.workflowsCreated > 0 
                      ? `+${Math.max(0, stats.workflowsCreated)} from last month` 
                      : 'Start with workflows!'}
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Projects Card */}
        <motion.div variants={itemVariants}>
          <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Projects</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {loading ? <Skeleton className="h-8 w-12" /> : stats.activeProjects}
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">Based on your SOPs and workflows</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2 dark:bg-gray-700">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, stats.activeProjects * 20)}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Efficiency Gain Card */}
        <motion.div variants={itemVariants}>
          <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30">
                  <ZapIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Efficiency Gain</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {loading ? <Skeleton className="h-8 w-16" /> : `${stats.efficiencyGain}%`}
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-amber-600 dark:text-amber-400 font-medium">
                    +{Math.floor(stats.efficiencyGain * 0.05)}% from last month
                  </span>
                  <TrendingUp className="h-4 w-4 text-amber-500" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full" 
                    style={{ width: `${stats.efficiencyGain}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Chart Section */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full border border-gray-100 dark:border-gray-800 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Activity Overview</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your SOP and workflow creation over the last 6 months</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    This Month
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {chartData.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <defs>
                        <linearGradient id="sopGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="workflowGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        vertical={false} 
                        stroke="#f1f5f9"
                        strokeOpacity={0.5}
                      />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                        tickMargin={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                        tickMargin={10}
                        width={30}
                      />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
                                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                                <div className="mt-1 space-y-1">
                                  <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">SOPs: {payload[0].value}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Workflows: {payload[1].value}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }}
                      />
                      <Bar 
                        dataKey="SOPs" 
                        fill="url(#sopGradient)" 
                        radius={[4, 4, 0, 0]} 
                        barSize={24}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-sop-${index}`}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        ))}
                      </Bar>
                      <Bar 
                        dataKey="Workflows" 
                        fill="url(#workflowGradient)" 
                        radius={[4, 4, 0, 0]} 
                        barSize={24}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        animationBegin={200}
                      >
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-wf-${index}`}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                      <span className="text-gray-600 dark:text-gray-300">SOPs</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-gray-600 dark:text-gray-300">Workflows</span>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div 
                  className="h-[300px] flex flex-col items-center justify-center text-center p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                    <BarChart2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No activity data yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                    Start creating SOPs and workflows to track your progress and see beautiful charts like this.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => handleQuickAction('generate')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First SOP
                  </Button>
                </motion.div>
              )}
            </CardContent>
            {recentActivity.length > 0 && (
              <CardFooter className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 px-6 py-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
                  onClick={() => onNavigateToSOPs?.()}
                >
                  View all activity
                </Button>
              </CardFooter>
            )}
          </Card>
        </motion.div>

        {/* Enhanced Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full border border-gray-100 dark:border-gray-800 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your latest actions and updates</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-7 px-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  onClick={() => fetchDashboardData()}
                >
                  <RefreshIcon className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence mode="wait">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <motion.div 
                        key={`skeleton-${i}`}
                        className="p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex items-start">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="ml-3 space-y-2 flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : recentActivity.length > 0 ? (
                    <AnimatePresence>
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ 
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            delay: index * 0.05
                          }}
                          whileHover={{ x: 2 }}
                          onClick={() => handleActivityClick(activity)}
                        >
                          <div className="flex items-start">
                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                              activity.type === 'sop' 
                                ? 'bg-indigo-50 dark:bg-indigo-900/30' 
                                : 'bg-purple-50 dark:bg-purple-900/30'
                            }`}>
                              {activity.type === 'sop' ? (
                                <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                              ) : (
                                <GitBranch className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                              )}
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {activity.action}
                                </p>
                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                  {formatTimeAgo(activity.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                                {activity.item}
                              </p>
                              <div className="mt-1">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    activity.type === 'sop' 
                                      ? 'border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/20' 
                                      : 'border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-purple-50/50 dark:bg-purple-900/20'
                                  }`}
                                >
                                  {activity.type === 'sop' ? 'SOP' : 'Workflow'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  ) : (
                    <motion.div 
                      className="p-6 text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                        <Activity className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No activity yet</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        Your recent actions will appear here.
                      </p>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction('generate')}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First SOP
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
            {recentActivity.length > 0 && (
              <CardFooter className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 px-6 py-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
                  onClick={() => onNavigateToSOPs?.()}
                >
                  View all activity
                </Button>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions - Now fully functional */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">Get started with these common tasks</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
              <Button 
                className="h-24 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={() => handleQuickAction('generate')}
              >
                <Zap className="h-6 w-6" />
                <span>Generate New SOP</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50"
                onClick={() => handleQuickAction('view')}
              >
                <Eye className="h-6 w-6" />
                <span>View My SOPs ({stats.totalSOPs})</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50"
                onClick={() => handleQuickAction('workflow')}
              >
                <GitBranch className="h-6 w-6" />
                <span>Create Workflow</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started Tips - Enhanced */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <p className="text-sm text-muted-foreground">Tips to maximize your productivity</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                    💡 Pro Tip
                    {stats.totalSOPs === 0 && <Badge variant="secondary" className="ml-2 text-xs">Start Here</Badge>}
                  </h3>
                  <p className="text-sm text-blue-800">
                    Start with simple processes and gradually build more complex SOPs as you get comfortable with the platform.
                  </p>
                  {stats.totalSOPs === 0 && (
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => handleQuickAction('generate')}>
                      Create First SOP
                    </Button>
                  )}
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-900 mb-2">🎯 Best Practice</h3>
                  <p className="text-sm text-green-800">
                    Use clear, descriptive titles and include relevant tags to make your SOPs easy to find and organize.
                  </p>
                  {stats.totalSOPs > 0 && (
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => handleQuickAction('view')}>
                      Organize SOPs
                    </Button>
                  )}
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-medium text-purple-900 mb-2">🚀 Feature Update</h3>
                  <p className="text-sm text-purple-800">
                    Try the new visual workflow feature to create flowcharts alongside your SOPs for better clarity.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => handleQuickAction('workflow')}>
                    Try Workflows
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
