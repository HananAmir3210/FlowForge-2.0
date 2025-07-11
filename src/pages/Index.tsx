import React, { useState, useCallback, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Linkedin, Facebook, Star, CheckCircle, Users, Zap, ArrowRight, Bot, Workflow, FileText, Play, ChevronDown, Plus, Minus } from "lucide-react";
import Lottie from "lottie-react";
import aiAutomationAnimation from "@/assets/ai-automation.json";
import hero3dAnimation from "@/assets/hero-3d-automation.json";
import featuresWorkflowAnimation from "@/assets/features-workflow.json";
import howItWorksAnimation from "@/assets/how-it-works.json";
import aiInActionAnimation from "@/assets/ai-in-action.json";

import heroGraphic from "@/assets/hero-graphic.png";
import featuresGraphic from "@/assets/features-graphic.png";
import howItWorksGraphic from "@/assets/how-it-works-graphic.png";
import aiInActionGraphic from "@/assets/ai-in-action-graphic.png";

import Navbar from "@/components/Navbar";

// Magnetic hover effect hook
const useMagneticHover = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  }, [x, y]);
  
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  return {
    ref,
    style: {
      x: springX,
      y: springY,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};

// Optimized animation variants - GPU-friendly properties only
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.4, 0, 0.2, 1] as const
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Simplified floating animation
const floatingAnimation = {
  y: [-5, 5, -5],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: [0.4, 0, 0.6, 1] as const
  }
};

// Optimized pulse glow - using opacity instead of box-shadow
const pulseGlow = {
  opacity: [0.6, 1, 0.6],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: [0.4, 0, 0.6, 1] as const
  }
};

// Memoized animated section component
const AnimatedSection = React.memo(({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Optimized scroll transforms - reduced number and simplified ranges
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -30]);

  const handleGetStarted = useCallback(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  }, [user, navigate]);

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    setContactForm({ name: "", email: "", message: "" });
  }, [toast]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const features = useMemo(() => [
    {
      icon: <Bot className="h-8 w-8 text-sopfuel-blue" />,
      title: "AI-Powered Generation",
      description: "Create comprehensive SOPs instantly with advanced AI that understands your business processes and industry requirements."
    },
    {
      icon: <Workflow className="h-8 w-8 text-sopfuel-blue" />,
      title: "Visual Workflow Builder",
      description: "Design and visualize your processes with our intuitive drag-and-drop workflow builder and real-time collaboration tools."
    },
    {
      icon: <Users className="h-8 w-8 text-sopfuel-blue" />,
      title: "Team Collaboration",
      description: "Share, review, and iterate on SOPs with your team in real-time with version control and role-based permissions."
    },
    {
      icon: <FileText className="h-8 w-8 text-sopfuel-blue" />,
      title: "Smart Templates",
      description: "Access industry-specific templates that adapt to your needs, with customizable formats and automated compliance checks."
    }
  ], []);

  const pricingPlans = useMemo(() => [
    {
      name: "Basic",
      price: "$9",
      period: "/month",
      features: ["5 SOPs per month", "Basic AI templates", "Email support", "PDF export", "Team sharing"],
      popular: false,
      cta: "Start Basic"
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      features: ["Unlimited SOPs", "Advanced AI generation", "Workflow visualization", "Priority support", "Team collaboration", "Custom branding"],
      popular: true,
      cta: "Start Pro"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Everything in Pro", "Custom integrations", "Dedicated support", "Advanced analytics", "SSO & compliance", "Custom training"],
      popular: false,
      cta: "Contact Sales"
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: "Sarah Johnson",
      role: "Operations Director",
      company: "TechFlow",
      content: "Sopfuel transformed how we document processes. What used to take weeks now takes hours. The AI understands our workflows perfectly.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    },
    {
      name: "Michael Chen",
      role: "COO",
      company: "StreamlineHQ",
      content: "The workflow visualization feature is game-changing. Our team can finally see the complete picture of our operations.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Quality Manager",
      company: "Precision Co",
      content: "Implementation was seamless, and the results were immediate. Our process documentation is now consistent and professional.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    }
  ], []);

  const stats = useMemo(() => [
    { value: "10,000+", label: "SOPs Created" },
    { value: "500+", label: "Companies" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ], []);

  const howItWorksSteps = useMemo(() => [
    {
      step: "01",
      title: "Describe Your Process",
      description: "Simply describe your business process or workflow in plain English. Our AI understands natural language and extracts the key components automatically.",
      icon: <FileText className="h-8 w-8 text-sopfuel-blue" />
    },
    {
      step: "02", 
      title: "AI Analysis & Generation",
      description: "Our advanced AI analyzes your process, identifies best practices, and generates a comprehensive SOP with proper formatting, structure, and compliance guidelines.",
      icon: <Bot className="h-8 w-8 text-sopfuel-blue" />
    },
    {
      step: "03",
      title: "Review & Customize",
      description: "Review the generated SOP, make any customizations, and export in your preferred format. Share with your team and track version history.",
      icon: <Workflow className="h-8 w-8 text-sopfuel-blue" />
    }
  ], []);

  const faqData = useMemo(() => [
    {
      question: "How accurate is the AI-generated SOP content?",
      answer: "Our AI has been trained on thousands of industry-standard SOPs and continuously learns from user feedback. The generated content is typically 90-95% accurate and follows best practices for process documentation. You can always review and customize the content before finalizing."
    },
    {
      question: "Can I integrate Sopfuel with my existing tools?",
      answer: "Yes! Sopfuel offers integrations with popular tools like Slack, Microsoft Teams, Google Workspace, and project management platforms. We also provide API access for custom integrations with your existing systems."
    },
    {
      question: "What file formats can I export my SOPs in?",
      answer: "Sopfuel supports multiple export formats including PDF, Word documents, HTML, and Markdown. You can also generate shareable links for easy collaboration with your team members."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption and security measures to protect your data. All information is stored securely in the cloud with regular backups. We never share your data with third parties."
    },
    {
      question: "Can multiple team members collaborate on the same SOP?",
      answer: "Yes! Sopfuel supports real-time collaboration with features like version control, commenting, and approval workflows. Multiple team members can work on the same document simultaneously with changes tracked and synchronized."
    },
    {
      question: "What industries does Sopfuel support?",
      answer: "Sopfuel is designed to work across all industries including manufacturing, healthcare, finance, technology, retail, and more. Our AI adapts to industry-specific terminology and compliance requirements."
    }
  ], []);

  const toggleFAQ = useCallback((index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  }, [openFAQ]);

  return (
    <div className="min-h-screen overflow-x-hidden relative" style={{ scrollBehavior: 'smooth' }}>
      {/* --- DYNAMIC BACKGROUND --- */}
        <motion.div 
        className="fixed inset-0 -z-10"
          style={{
          background: "linear-gradient(135deg, #191970 0%, #000000 100%)"
          }}
        />
        
      {/* Animated Gradient Overlay */}
        <motion.div 
        className="fixed inset-0 -z-10"
          style={{
          background: "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 25%, transparent 50%, rgba(255,255,255,0.05) 75%, transparent 100%)",
          backgroundSize: "400% 400%"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating Abstract Shapes */}
        <motion.div 
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full -z-10 opacity-15"
        style={{ background: "radial-gradient(circle, #50E3C2 0%, transparent 70%)" }}
          animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 25,
              repeat: Infinity,
          ease: "easeInOut"
          }}
        />
        
        <motion.div 
        className="fixed bottom-1/3 right-1/4 w-80 h-80 rounded-full -z-10 opacity-10"
        style={{ background: "radial-gradient(circle, #004AAD 0%, transparent 70%)" }}
          animate={{
          y: [0, 50, 0],
          x: [0, -40, 0],
          scale: [1, 0.8, 1],
          rotate: [0, -180, -360]
        }}
        transition={{
          duration: 30,
              repeat: Infinity,
          ease: "easeInOut"
          }}
        />
        
        <motion.div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full -z-10 opacity-8"
        style={{ background: "radial-gradient(circle, #50E3C2 0%, transparent 70%)" }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Geometric Shapes */}
        <motion.div 
        className="fixed top-1/6 right-1/6 w-32 h-32 -z-10 opacity-10"
        style={{
          background: "linear-gradient(45deg, #004AAD, #50E3C2)",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
        }}
          animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 35,
              repeat: Infinity,
              ease: "linear"
          }}
        />
        
        <motion.div 
        className="fixed bottom-1/6 left-1/6 w-24 h-24 -z-10 opacity-8"
        style={{
          background: "linear-gradient(45deg, #50E3C2, #004AAD)",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
        }}
          animate={{
          rotate: [0, -360],
          scale: [1, 0.7, 1]
        }}
        transition={{
          duration: 40,
              repeat: Infinity,
          ease: "linear"
          }}
        />

      {/* Content with relative positioning */}
      <div className="relative z-10 pt-20">
        {/* Fixed Navbar with backdrop blur */}
        <Navbar />

        {/* Main content with background container */}
        <div className="relative">
          {/* Hero Section - Single Frame */}
          <section id="hero" className="h-screen flex items-center justify-center bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 h-full flex items-center">
              <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                {/* Left: Text */}
              <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="space-y-6 text-left max-w-xl"
              >
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center px-4 py-2 bg-white/15 rounded-full border border-white/25 backdrop-blur-md"
                  >
                    <Zap className="h-4 w-4 text-white mr-2" />
                    <span className="text-xs font-semibold text-white font-inter tracking-wide">AI-Powered SOP Generation</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-montserrat text-white leading-tight"
                  >
                    Automate Your<br />
                    <span className="text-white">Processes with</span><br />
                    <span className="text-white font-bold">Intelligent SOPs</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg lg:text-xl text-[#EEEEEE] font-inter font-medium"
                  >
                    Transform complex workflows into crystal-clear Standard Operating Procedures in seconds.
                </motion.p>
                
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 pt-2"
                  >
                <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                >
                    <Button 
                      size="lg"
                      onClick={handleGetStarted}
                        className="bg-white text-brand-blue font-bold rounded-full px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 text-base"
                    >
                      Start Your Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right: Premium Spline 3D Scene */}
                <motion.div 
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="flex justify-center items-center w-full"
                >
                  <motion.div 
                    className="relative w-full max-w-lg"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 1, 0, -1, 0]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      y: { duration: 6, ease: "easeInOut" },
                      rotate: { duration: 8, ease: "easeInOut" }
                    }}
                  >
                    <img
                      src={heroGraphic}
                      alt="AI Automation Hero"
                      className="w-full h-auto"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </motion.div>
          </section>

          {/* Features Section - Creative Layout */}
          <section id="features" className="py-16 mt-8 relative">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-green/5" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-brand-green/10 to-transparent blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-brand-blue/10 to-transparent blur-3xl" />
            
            <div className="container mx-auto px-6 relative z-10">
              <AnimatedSection className="text-center mb-24">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl lg:text-6xl font-extrabold text-white mb-8 font-montserrat text-center"
                >
                  Powerful Features
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl lg:text-2xl text-[#EEEEEE] max-w-4xl mx-auto font-inter font-medium"
                >
                  Everything you need to create, manage, and optimize your Standard Operating Procedures with AI precision
                </motion.p>
              </AnimatedSection>
              
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                {/* Left: First two features */}
                <motion.div 
                  className="space-y-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {features.slice(0, 2).map((feature, index) => (
                    <motion.div 
                      key={index} 
                      variants={fadeInUp}
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
                        <CardContent className="p-8">
                          <div className="flex items-start space-x-6">
                      <motion.div 
                              className="flex-shrink-0 p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:bg-white/30 transition-all duration-300 border border-white/20 shadow-lg"
                              animate={floatingAnimation}
                      >
                              {React.cloneElement(feature.icon, { className: "h-8 w-8 text-white" })}
                      </motion.div>
                            <div>
                              <CardTitle className="text-2xl font-bold text-white font-montserrat group-hover:text-white transition-colors duration-300 mb-3">
                                {feature.title}
                              </CardTitle>
                              <CardDescription className="text-[#DDDDDD] font-inter leading-relaxed text-lg">
                                {feature.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Right: Premium Spline 3D Workflow Scene */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <motion.div 
                    className="w-full"
                    animate={{ 
                      y: [0, -12, 0],
                      rotate: [0, -0.5, 0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 7, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      y: { duration: 5, ease: "easeInOut" },
                      rotate: { duration: 7, ease: "easeInOut" }
                    }}
                  >
                    <img
                      src={featuresGraphic}
                      alt="Workflow Features"
                      className="w-full h-auto"
                    />
                  </motion.div>
              </motion.div>
              </div>
              
              {/* Bottom: Last two features */}
              <motion.div 
                className="grid lg:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {features.slice(2, 4).map((feature, index) => (
                <motion.div 
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                  <motion.div 
                            className="flex-shrink-0 p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:bg-white/30 transition-all duration-300 border border-white/20 shadow-lg"
                            animate={floatingAnimation}
                          >
                            {React.cloneElement(feature.icon, { className: "h-8 w-8 text-white" })}
                  </motion.div>
                          <div>
                            <CardTitle className="text-2xl font-bold text-white font-montserrat group-hover:text-white transition-colors duration-300 mb-3">
                              {feature.title}
                            </CardTitle>
                            <CardDescription className="text-[#DDDDDD] font-inter leading-relaxed text-lg">
                              {feature.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Trusted By Section */}
          <section className="py-16 relative">
            <div className="container mx-auto px-6 relative z-10">
              <AnimatedSection className="text-center mb-12">
                <p className="text-lg text-[#DDDDDD] font-inter font-medium mb-8">
                  Trusted by innovative companies worldwide
                </p>
                  <motion.div 
                  className="flex flex-wrap justify-center items-center gap-12 opacity-60"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {['Microsoft', 'Google', 'Amazon', 'Netflix', 'Spotify', 'Slack'].map((company, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="text-white/60 font-bold text-xl font-montserrat"
                      whileHover={{ scale: 1.1, opacity: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {company}
                  </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-16 mt-8 relative">
            <div className="container mx-auto px-6 relative z-10">
              <AnimatedSection className="text-center mb-20">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl lg:text-6xl font-extrabold text-white mb-8 font-montserrat text-center"
                >
                  How It Works
                </motion.h2>
                <p className="text-xl lg:text-2xl text-[#EEEEEE] max-w-4xl mx-auto font-inter font-medium">
                  Transform your processes into professional SOPs in three simple steps
                </p>
              </AnimatedSection>
              
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                {/* Steps */}
            <motion.div 
                  className="space-y-12"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {howItWorksSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start space-x-8 group"
                    >
                      <motion.div 
                        className="flex-shrink-0 w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <div className="text-3xl font-extrabold text-white font-montserrat">
                          {step.step}
                        </div>
            </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-white/20 rounded-2xl mr-4 border border-white/20">
                            {React.cloneElement(step.icon, { className: "h-8 w-8 text-white" })}
                          </div>
                          <h3 className="text-2xl font-bold text-white font-montserrat group-hover:text-white transition-colors duration-300">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-[#DDDDDD] font-inter leading-relaxed text-lg">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Premium WebM Video - How It Works Process */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="w-full"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 0.8, 0, -0.8, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      y: { duration: 4, ease: "easeInOut" },
                      rotate: { duration: 6, ease: "easeInOut" }
                    }}
                  >
                    <img
                      src={howItWorksGraphic}
                      alt="How It Works Process"
                      className="w-full h-auto"
                    />
                  </motion.div>
                </motion.div>
              </div>
          </div>
        </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-16 mt-8 relative">
          <div className="container mx-auto px-6 relative z-10">
              <AnimatedSection className="text-center mb-20">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl lg:text-6xl font-extrabold text-white mb-8 font-montserrat text-center"
                >
                  Choose Your Plan
              </motion.h2>
                <p className="text-xl lg:text-2xl text-[#EEEEEE] max-w-4xl mx-auto font-inter font-medium">
                  Start free and scale as you grow. No hidden fees, cancel anytime.
              </p>
            </AnimatedSection>
            
            <motion.div 
                className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                    whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                    <Card className={`relative shadow-2xl transition-all duration-500 rounded-3xl border-0 group ${
                    plan.popular 
                        ? 'bg-white/20 backdrop-blur-xl ring-2 ring-white/30 shadow-white/25 scale-105' 
                        : 'bg-white/10 backdrop-blur-xl hover:shadow-3xl border border-white/20'
                  }`}>
                    {plan.popular && (
                      <motion.div 
                          className="flex justify-center mb-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                          <span className="bg-white text-brand-blue px-8 py-3 rounded-full text-sm font-bold font-montserrat shadow-2xl border border-brand-blue/10">
                          Most Popular
                        </span>
                      </motion.div>
                    )}
                      <CardHeader className="text-center pb-8 pt-12">
                        <CardTitle className="text-3xl font-bold text-white font-montserrat mb-6 group-hover:text-white transition-colors duration-300">
                        {plan.name}
                      </CardTitle>
                      <motion.div 
                          className="mb-8"
                        whileHover={{ scale: 1.05 }}
                      >
                          <span className="text-6xl font-extrabold text-white">{plan.price}</span>
                          <span className="text-[#DDDDDD] font-inter text-xl">{plan.period}</span>
                      </motion.div>
                    </CardHeader>
                      <CardContent className="px-8 pb-8">
                        <ul className="space-y-6 mb-10">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li 
                            key={featureIndex} 
                              className="flex items-start text-[#DDDDDD] font-inter text-lg"
                              whileHover={{ x: 8 }}
                            transition={{ duration: 0.2 }}
                          >
                              <CheckCircle className="h-6 w-6 text-white mr-4 flex-shrink-0 mt-0.5" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                        <motion.div 
                          whileHover={{ scale: 1.02 }} 
                          whileTap={{ scale: 0.98 }}
                          className="group"
                        >
                        <Button 
                            className={`w-full rounded-2xl py-4 font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 ${
                            plan.popular 
                                ? 'bg-white text-brand-blue hover:bg-white/90' 
                                : 'bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 backdrop-blur-md'
                          }`}
                          onClick={handleGetStarted}
                        >
                          {plan.cta}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

          {/* FAQ Section */}
          <section id="faq" className="py-16 mt-8 relative">
            <div className="container mx-auto px-6 relative z-10">
              <AnimatedSection className="text-center mb-20">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl lg:text-6xl font-extrabold text-white mb-8 font-montserrat text-center"
                >
                  Frequently Asked Questions
                </motion.h2>
                <p className="text-xl lg:text-2xl text-[#EEEEEE] max-w-4xl mx-auto font-inter font-medium">
                  Everything you need to know about Sopfuel and AI-powered SOP generation
                </p>
            </AnimatedSection>
            
              <div className="max-w-5xl mx-auto">
            <motion.div 
                  className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
                  {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                      className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
                    >
                      <motion.button
                        className="w-full px-10 py-8 text-left flex items-center justify-between hover:bg-white/10 transition-colors duration-300"
                        onClick={() => toggleFAQ(index)}
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-xl font-bold text-white font-montserrat pr-6">
                          {faq.question}
                        </h3>
                      <motion.div 
                          animate={{ rotate: openFAQ === index ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          {openFAQ === index ? (
                            <Minus className="h-8 w-8 text-white" />
                          ) : (
                            <Plus className="h-8 w-8 text-white" />
                          )}
                        </motion.div>
                      </motion.button>
                      
                        <motion.div 
                        initial={false}
                        animate={{
                          height: openFAQ === index ? "auto" : 0,
                          opacity: openFAQ === index ? 1 : 0
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
                        className="overflow-hidden"
                      >
                        <div className="px-10 pb-8">
                          <p className="text-[#DDDDDD] font-inter leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                        </motion.div>
                </motion.div>
              ))}
            </motion.div>
              </div>
          </div>
        </section>

        {/* Testimonials Section */}
          <section id="testimonials" className="py-16 mt-8 relative">
          <div className="container mx-auto px-6 relative z-10">
              <AnimatedSection className="text-center mb-20">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl lg:text-6xl font-extrabold text-white mb-8 font-montserrat text-center"
                >
                What Our Users Say
              </motion.h2>
                <p className="text-xl lg:text-2xl text-[#EEEEEE] max-w-4xl mx-auto font-inter font-medium">
                Join thousands of teams who've transformed their operations with Sopfuel
              </p>
            </AnimatedSection>
            
            <motion.div 
                className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                    whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                    <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl group h-full bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
                      <CardContent className="pt-10 px-8">
                      <motion.div 
                          className="flex mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {[...Array(5)].map((_, starIndex) => (
                          <motion.div
                            key={starIndex}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: starIndex * 0.1 }}
                          >
                              <Star className="h-6 w-6 text-white fill-current" />
                          </motion.div>
                        ))}
                      </motion.div>
                        <p className="text-[#DDDDDD] mb-10 italic font-inter leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <motion.img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                            className="w-16 h-16 rounded-full mr-5 object-cover shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div>
                            <p className="font-bold text-white font-montserrat text-lg group-hover:text-white transition-colors duration-300">
                            {testimonial.name}
                          </p>
                            <p className="text-[#DDDDDD] font-inter">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 mt-8 relative">
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl lg:text-5xl font-bold text-white mb-6 font-montserrat text-center"
                >
                Contact Us
              </motion.h2>
                <p className="text-xl text-[#EEEEEE] max-w-3xl mx-auto font-inter">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </AnimatedSection>
            
            <div className="max-w-2xl mx-auto">
              <AnimatedSection>
                <motion.div whileHover={{ scale: 1.02 }}>
                    <Card className="border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-500 bg-white/10 backdrop-blur-md border border-white/20">
                    <CardContent className="p-8">
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Label htmlFor="contact-name" className="text-white font-inter font-medium">Name</Label>
                          <Input
                            id="contact-name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                              className="border-white/20 bg-white/10 text-white rounded-xl mt-2 py-3 font-inter transition-all duration-300 focus:scale-105 focus:border-white placeholder:text-[#DDDDDD]"
                              placeholder="Your name"
                            required
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Label htmlFor="contact-email" className="text-white font-inter font-medium">Email</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                              className="border-white/20 bg-white/10 text-white rounded-xl mt-2 py-3 font-inter transition-all duration-300 focus:scale-105 focus:border-white placeholder:text-[#DDDDDD]"
                              placeholder="your@email.com"
                            required
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Label htmlFor="contact-message" className="text-white font-inter font-medium">Message</Label>
                          <Textarea
                            id="contact-message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                              className="border-white/20 bg-white/10 text-white rounded-xl min-h-[150px] mt-2 py-3 font-inter transition-all duration-300 focus:scale-105 focus:border-white placeholder:text-[#DDDDDD]"
                              placeholder="Your message..."
                            required
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                              className="w-full bg-white text-brand-blue rounded-xl py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Send Message
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
              
              {/* Social Media Links */}
              <AnimatedSection className="text-center mt-12">
                  <p className="text-[#DDDDDD] mb-8 font-inter text-lg">
                  Connect with us on social media
                </p>
                <div className="flex justify-center space-x-8">
                  {[
                    { icon: Linkedin, href: "https://linkedin.com/company/sopfuel", label: "LinkedIn" },
                    { icon: Twitter, href: "https://twitter.com/sopfuel", label: "Twitter" },
                    { icon: Facebook, href: "https://facebook.com/sopfuel", label: "Facebook" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#DDDDDD] transition-all duration-300"
                      aria-label={`Follow us on ${social.label}`}
                    >
                      <social.icon className="h-8 w-8" />
                    </a>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
        </div>

        {/* Footer */}
        <footer className="bg-white/10 backdrop-blur-md text-white py-16 relative border-t border-white/20">
          <div className="container mx-auto px-6">
            <motion.div 
              className="grid md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} className="md:col-span-2">
                <div className="flex items-center mb-6 group cursor-pointer">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3">
                    <Bot className="h-6 w-6 text-brand-blue" />
                  </div>
                  <span className="text-2xl font-bold font-montserrat group-hover:text-[#DDDDDD] transition-colors duration-300">
                    Sopfuel
                  </span>
                </div>
                <p className="text-[#DDDDDD] font-inter leading-relaxed max-w-md">
                  Streamline your processes with intelligent SOP creation powered by AI. Transform your business workflows into clear, actionable procedures.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <h3 className="font-semibold mb-6 font-montserrat text-lg text-white">Product</h3>
                <ul className="space-y-3 text-[#DDDDDD] font-inter">
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/features" className="hover:text-white transition-colors duration-300">Features</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/pricing" className="hover:text-white transition-colors duration-300">Pricing</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/templates" className="hover:text-white transition-colors duration-300">Templates</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/docs/api" className="hover:text-white transition-colors duration-300">API</Link>
                  </motion.li>
                </ul>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <h3 className="font-semibold mb-6 font-montserrat text-lg text-white">Support</h3>
                <ul className="space-y-3 text-[#DDDDDD] font-inter">
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/help" className="hover:text-white transition-colors duration-300">Help Center</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/documentation" className="hover:text-white transition-colors duration-300">Documentation</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="border-t border-white/20 mt-12 pt-8 text-center text-[#DDDDDD]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-inter">
                © {new Date().getFullYear()} Sopfuel. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Index;
