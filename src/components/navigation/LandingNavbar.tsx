import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/AuthModal";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = useCallback(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthTab('signup');
      setIsAuthModalOpen(true);
    }
  }, [user, navigate]);

  const handleLogin = useCallback(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthTab('login');
      setIsAuthModalOpen(true);
    }
  }, [user, navigate]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'demo') {
      navigate('/demo');
      setIsMenuOpen(false);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      setIsMenuOpen(false);
    }
  }, [navigate]);

  const menuItems = [
    { 
      label: 'Features', 
      action: () => scrollToSection('features'),
      hasDropdown: false
    },
    { 
      label: 'Pricing', 
      action: () => scrollToSection('pricing'),
      hasDropdown: false
    },
    { 
      label: 'Support', 
      action: () => navigate('/help'),
      hasDropdown: true,
      dropdownItems: [
        { label: 'Help Center', action: () => navigate('/help') },
        { label: 'Documentation', action: () => navigate('/documentation') },
        { label: 'Community', action: () => navigate('/community') },
        { label: 'Contact', action: () => navigate('/contact') }
      ]
    }
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center group-hover:bg-brand-blue/90 transition-colors">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className={`text-2xl font-bold font-montserrat transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Flowforge
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`flex items-center space-x-1 font-inter transition-all duration-300 relative group ${
                          isScrolled ? 'text-gray-700 hover:text-brand-blue' : 'text-white hover:text-brand-green'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                        <motion.div
                          className={`absolute bottom-0 left-0 h-0.5 bg-brand-blue origin-left`}
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                          style={{ width: '100%' }}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                          >
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <button
                                key={idx}
                                onClick={dropdownItem.action}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors font-inter"
                              >
                                {dropdownItem.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      onClick={item.action}
                      className={`font-inter transition-all duration-300 relative group ${
                        isScrolled ? 'text-gray-700 hover:text-brand-blue' : 'text-white hover:text-brand-green'
                      }`}
                    >
                      {item.label}
                      <motion.div
                        className={`absolute bottom-0 left-0 h-0.5 bg-brand-blue origin-left`}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ width: '100%' }}
                      />
                    </button>
                  )}
                </div>
              ))}
              
              <div className="flex items-center space-x-3">
                {user ? (
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl px-6 py-2.5 font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="ghost"
                      onClick={handleLogin}
                      className={`font-medium transition-all duration-300 hover:bg-white/10 ${
                        isScrolled ? 'text-gray-700 hover:text-brand-blue' : 'text-white'
                      }`}
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={handleGetStarted}
                      className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl px-6 py-2.5 font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Start Free Trial
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden"
              >
                <motion.div 
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="py-4 mt-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200"
                >
                  <div className="space-y-1 px-4">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={item.action}
                        className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-brand-blue/10 hover:text-brand-blue rounded-lg font-inter transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                    
                    <div className="border-t border-gray-200 my-2"></div>
                    
                    {user ? (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.4 }}
                      >
                        <Button 
                          onClick={() => navigate('/dashboard')} 
                          className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl py-3 text-lg shadow-lg"
                        >
                          Dashboard
                        </Button>
                      </motion.div>
                    ) : (
                      <div className="space-y-2">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.4 }}
                        >
                          <Button 
                            variant="outline"
                            onClick={handleLogin} 
                            className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl py-3 font-medium"
                          >
                            Login
                          </Button>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.5 }}
                        >
                          <Button 
                            onClick={handleGetStarted} 
                            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl py-3 text-lg shadow-lg"
                          >
                            Start Free Trial
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal 
          open={isAuthModalOpen} 
          onOpenChange={setIsAuthModalOpen} 
          defaultTab={authTab} 
        />
      )}
    </>
  );
};

export default LandingNavbar;