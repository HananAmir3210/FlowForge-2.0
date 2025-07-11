
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Clipboard, Layout, Settings, CreditCard, HelpCircle, LogOut, Moon, Sun, User } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import MySOPs from '@/components/dashboard/MySOPs';
import GenerateNewSOP from '@/components/dashboard/GenerateNewSOP';
import AccountSettings from '@/components/dashboard/AccountSettings';
import BillingSection from '@/components/dashboard/BillingSection';
import SupportSection from '@/components/dashboard/SupportSection';
import ProfileModal from '@/components/ProfileModal';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import type { Database } from '@/integrations/supabase/types';

type SOP = Database['public']['Tables']['sops']['Row'];

const menuItems = [
  { id: 'overview', label: 'Dashboard Overview', icon: Home },
  { id: 'sops', label: 'My SOPs', icon: Clipboard },
  { id: 'generate', label: 'Generate SOP & Workflow', icon: Layout },
  { id: 'settings', label: 'Account Settings', icon: Settings },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingSOP, setEditingSOP] = useState<SOP | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, user } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };

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

  const displayName = user?.user_metadata?.full_name || 
                     user?.user_metadata?.name || 
                     user?.email?.split('@')[0] || 
                     'User';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-background'}`}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r hidden md:block">
            <SidebarHeader className="border-b p-3 sm:p-4">
              <div 
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleLogoClick}
              >
                <img 
                  src="/lovable-uploads/684a1ef7-80d1-4c48-86f8-3546b9693236.png" 
                  alt="FlowForge Logo" 
                  className="h-10 sm:h-12"
                />
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => {
                        setActiveSection(item.id);
                        if (item.id !== 'generate') {
                          setEditingSOP(null);
                        }
                      }}
                      isActive={activeSection === item.id}
                      className="w-full justify-start text-sm sm:text-base"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    className="w-full justify-start text-destructive hover:text-destructive text-sm sm:text-base"
                  >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span>Log Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 min-w-0">
            <header className="sticky top-0 z-10 flex h-14 sm:h-16 items-center gap-2 border-b bg-background px-3 sm:px-4">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1 min-w-0" />
              <div className="text-xs sm:text-sm text-muted-foreground hidden lg:block truncate">
                Welcome back, {displayName} 👋
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsProfileModalOpen(true)}
                className="text-xs sm:text-sm btn-touch flex-shrink-0"
              >
                <User className="h-4 w-4" />
                <span className="ml-1 sm:ml-2 hidden sm:inline">Profile</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleTheme}
                className="text-xs sm:text-sm btn-touch flex-shrink-0"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="ml-1 sm:ml-2 hidden lg:inline">
                  {isDarkMode ? 'Light' : 'Dark'} Mode
                </span>
              </Button>
            </header>
            
            <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
              <div className="max-w-7xl mx-auto">
                {renderContent()}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={{ name: displayName, email: user?.email || '' }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleTheme}
        onLogout={handleLogout}
        onViewAccount={() => {
          setActiveSection('settings');
          setIsProfileModalOpen(false);
        }}
      />
    </div>
  );
};

export default Dashboard;
