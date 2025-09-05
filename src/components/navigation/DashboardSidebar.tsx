import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Bot, 
  Home, 
  FileText, 
  Layout, 
  Settings, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  User,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  editingSOP?: any;
  onClearEdit?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  onSectionChange,
  editingSOP,
  onClearEdit
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const menuItems = [
    { 
      id: 'overview', 
      label: 'Dashboard', 
      icon: Home,
      description: 'Overview and analytics'
    },
    { 
      id: 'sops', 
      label: 'My SOPs', 
      icon: FileText,
      description: 'View and manage SOPs'
    },
    { 
      id: 'generate', 
      label: 'Generate SOP', 
      icon: Layout,
      description: 'Create new SOPs'
    },
    { 
      id: 'settings', 
      label: 'Account', 
      icon: Settings,
      description: 'Account settings'
    },
    { 
      id: 'billing', 
      label: 'Billing', 
      icon: CreditCard,
      description: 'Subscription & billing'
    },
    { 
      id: 'support', 
      label: 'Support', 
      icon: HelpCircle,
      description: 'Help and support'
    },
  ];

  const handleLogoClick = () => {
    navigate('/');
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

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    if (sectionId !== 'generate' && onClearEdit) {
      onClearEdit();
    }
    setIsMobileOpen(false);
  };

  const displayName = user?.user_metadata?.full_name || 
                     user?.user_metadata?.name || 
                     user?.email?.split('@')[0] || 
                     'User';

  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  const SidebarContent = () => (
    <motion.div 
      className="flex flex-col h-full bg-white border-r border-gray-200 shadow-lg"
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center group-hover:bg-brand-blue/90 transition-colors">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  className="text-xl font-bold font-montserrat text-gray-900"
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ duration: 0.2 }}
                >
                  Flowforge
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-8 w-8 p-0 hover:bg-gray-100"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border-2 border-brand-blue/20">
            <AvatarFallback className="bg-brand-blue/10 text-brand-blue font-semibold">
              {displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant="ghost"
                onClick={() => handleSectionChange(item.id)}
                className={cn(
                  "w-full justify-start h-12 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "bg-brand-blue text-white shadow-md hover:bg-brand-blue/90" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-brand-blue"
                )}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-green/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <item.icon className={cn(
                  "h-5 w-5 transition-colors relative z-10",
                  isActive ? "text-white" : "text-gray-500 group-hover:text-brand-blue"
                )} />
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      variants={contentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-start ml-3 relative z-10"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className={cn(
                        "text-xs transition-colors",
                        isActive ? "text-white/80" : "text-gray-400 group-hover:text-brand-blue/70"
                      )}>
                        {item.description}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start h-12 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2 }}
                className="ml-3 font-medium"
              >
                Log Out
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(true)}
                className="h-10 w-10 p-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={handleLogoClick}
              >
                <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold font-montserrat text-gray-900">
                  Flowforge
                </span>
              </div>
            </div>
            
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-brand-blue/10 text-brand-blue text-xs font-semibold">
                {displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileOpen(false)}
              />
              
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-white shadow-2xl"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                          <Bot className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold font-montserrat text-gray-900">
                          Flowforge
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileOpen(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* User Profile */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 border-2 border-brand-blue/20">
                        <AvatarFallback className="bg-brand-blue/10 text-brand-blue font-semibold">
                          {displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Menu */}
                  <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item, index) => {
                      const isActive = activeSection === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Button
                            variant="ghost"
                            onClick={() => handleSectionChange(item.id)}
                            className={cn(
                              "w-full justify-start h-14 rounded-xl transition-all duration-200 group relative overflow-hidden",
                              isActive 
                                ? "bg-brand-blue text-white shadow-md" 
                                : "text-gray-700 hover:bg-gray-100 hover:text-brand-blue"
                            )}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-green/10"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                            
                            <item.icon className={cn(
                              "h-5 w-5 transition-colors relative z-10",
                              isActive ? "text-white" : "text-gray-500 group-hover:text-brand-blue"
                            )} />
                            
                            <div className="flex flex-col items-start ml-3 relative z-10">
                              <span className="font-medium">{item.label}</span>
                              <span className={cn(
                                "text-xs transition-colors",
                                isActive ? "text-white/80" : "text-gray-400 group-hover:text-brand-blue/70"
                              )}>
                                {item.description}
                              </span>
                            </div>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Footer */}
                  <div className="p-4 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start h-12 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="ml-3 font-medium">Log Out</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default DashboardSidebar;