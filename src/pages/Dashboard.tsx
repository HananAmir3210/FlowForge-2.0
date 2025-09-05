import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/navigation/DashboardSidebar';
import DashboardTopBar from '@/components/navigation/DashboardTopBar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import MySOPs from '@/components/dashboard/MySOPs';
import GenerateNewSOP from '@/components/dashboard/GenerateNewSOP';
import AccountSettings from '@/components/dashboard/AccountSettings';
import BillingSection from '@/components/dashboard/BillingSection';
import SupportSection from '@/components/dashboard/SupportSection';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import type { Database } from '@/integrations/supabase/types';

type SOP = Database['public']['Tables']['sops']['Row'];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingSOP, setEditingSOP] = useState<SOP | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, user } = useAuth();

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <DashboardOverview 
            onNavigateToSOPs={() => setActiveSection('sops')}
            onNavigateToGenerate={() => setActiveSection('generate')}
            onNavigateToWorkflows={() => setActiveSection('generate')}
          />
        );
      case 'sops':
        return (
          <MySOPs 
            onEdit={(sop) => {
              setEditingSOP(sop);
              setActiveSection('generate');
            }}
          />
        );
      case 'generate':
        return (
          <GenerateNewSOP 
            editingSOP={editingSOP}
            onSOPCreated={() => setActiveSection('sops')}
            onClearEdit={() => setEditingSOP(null)}
          />
        );
      case 'settings':
        return <AccountSettings />;
      case 'billing':
        return <BillingSection />;
      case 'support':
        return <SupportSection />;
      default:
        return <DashboardOverview />;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an error logging you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: `${isDarkMode ? 'Light' : 'Dark'} mode activated`,
      description: `Switched to ${isDarkMode ? 'light' : 'dark'} theme.`,
    });
  };

  return (
    <motion.div 
      className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-80 z-40">
          <DashboardSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            editingSOP={editingSOP}
            onClearEdit={() => setEditingSOP(null)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-80">
          {/* Top Bar */}
          <DashboardTopBar
            activeSection={activeSection}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleTheme}
            onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
            onLogout={handleLogout}
          />
          
          {/* Content Area */}
          <main className="p-6 pt-20 lg:pt-6">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto"
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>

        {/* Mobile Sidebar */}
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          editingSOP={editingSOP}
          onClearEdit={() => setEditingSOP(null)}
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;