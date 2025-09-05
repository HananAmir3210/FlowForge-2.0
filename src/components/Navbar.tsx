import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/AuthModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');

  const handleGetStarted = useCallback(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthTab('signup');
      setIsAuthModalOpen(true);
    }
  }, [user, navigate]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'ai-demo') {
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

  return (
    <motion.header 
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
      className="fixed top-0 w-full bg-white/10 backdrop-blur-lg border-b border-neutral-light z-50"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-montserrat">Flowforge</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['features', 'how-it-works', 'ai-demo', 'pricing', 'faq', 'testimonials', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-white hover:text-brand-blue transition-all duration-300 font-inter capitalize"
              >
                {section}
              </button>
            ))}
            <Button 
              onClick={handleGetStarted}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl px-6 py-2.5 font-medium shadow-md transition-all duration-300"
            >
              Start Free Trial
            </Button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                <motion.div 
                  className="w-6 h-6 flex flex-col justify-center items-center"
                  animate={isMenuOpen ? { rotate: 45 } : { rotate: 0 }}
                >
                  <motion.span 
                    className="block w-5 h-0.5 bg-white"
                    animate={isMenuOpen ? { rotate: 90, y: 0 } : { rotate: 0, y: -2 }}
                  />
                  <motion.span 
                    className="block w-5 h-0.5 bg-white mt-1"
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  />
                  <motion.span 
                    className="block w-5 h-0.5 bg-white mt-1"
                    animate={isMenuOpen ? { rotate: -90, y: 0 } : { rotate: 0, y: 2 }}
                  />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
        {/* Mobile menu */}
        <motion.div 
          className="md:hidden overflow-hidden"
          initial={false}
          animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4 bg-brand-blue/80 text-white rounded-2xl shadow-xl mx-2 my-2">
            {['features', 'how-it-works', 'ai-demo', 'pricing', 'faq', 'testimonials', 'contact'].map((section) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-3 text-white hover:text-brand-green font-open-sans capitalize"
                whileHover={{ x: 10 }}
              >
                {section}
              </motion.button>
            ))}
            <Button 
              onClick={handleGetStarted} 
              className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-xl mt-2 py-3 text-lg shadow-lg"
            >
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </nav>
      {isAuthModalOpen && (
        <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} defaultTab={authTab} />
      )}
    </motion.header>
  );
};

export default Navbar; 