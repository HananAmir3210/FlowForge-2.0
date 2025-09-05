
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Bot } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "Flowforge" }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #191970 0%, #000000 100%)' }}
    >
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          {title && title !== "Flowforge" && (
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-montserrat text-white mb-8 text-center leading-tight">
              {title}
            </h1>
          )}
          <div className="text-[#EEEEEE] font-inter text-lg">
            {children}
          </div>
        </div>
      </main>

      {/* Footer (copied from landing page for consistency) */}
      <footer className="bg-white/10 backdrop-blur-md text-white py-16 relative border-t border-white/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6 group cursor-pointer" onClick={handleLogoClick} aria-label="Navigate to home page">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3">
                  <Bot className="h-6 w-6 text-brand-blue" />
                </div>
                <span className="text-2xl font-bold font-montserrat group-hover:text-[#DDDDDD] transition-colors duration-300">
                  Flowforge
                </span>
              </div>
              <p className="text-[#DDDDDD] font-inter leading-relaxed max-w-md">
                Streamline your processes with intelligent SOP creation powered by AI. Transform your business workflows into clear, actionable procedures.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-6 font-montserrat text-lg text-white">Product</h3>
              <ul className="space-y-3 text-[#DDDDDD] font-inter">
                <li><a href="/features" className="hover:text-white transition-colors duration-300">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors duration-300">Pricing</a></li>
                <li><a href="/templates" className="hover:text-white transition-colors duration-300">Templates</a></li>
                <li><a href="/docs/api" className="hover:text-white transition-colors duration-300">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 font-montserrat text-lg text-white">Support</h3>
              <ul className="space-y-3 text-[#DDDDDD] font-inter">
                <li><a href="/help" className="hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="/documentation" className="hover:text-white transition-colors duration-300">Documentation</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors duration-300">Contact</a></li>
                <li><a href="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-[#DDDDDD]">
            <p className="font-inter">
              © {new Date().getFullYear()} Flowforge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
