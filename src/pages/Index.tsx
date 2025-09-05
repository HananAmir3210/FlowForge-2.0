import React, { useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Zap, 
  Users, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Play, 
  FileText, 
  Workflow, 
  Download, 
  Share, 
  Clock, 
  Target, 
  Lightbulb,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/AuthModal";
import FeatureModal from "@/components/FeatureModal";
import PaymentModal from "@/components/PaymentModal";
import PricingDropdown from "@/components/PricingDropdown";
import LandingNavbar from "@/components/navigation/LandingNavbar";
import Lottie from 'lottie-react';
import SplineScene from '@/components/SplineScene';
import PremiumVideo from '@/components/PremiumVideo';

// Import Lottie animations
import heroAnimation from '@/assets/hero-3d-automation.json';
import featuresAnimation from '@/assets/features-workflow.json';
import howItWorksAnimation from '@/assets/how-it-works.json';
import aiInActionAnimation from '@/assets/ai-in-action.json';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { user } = useAuth();

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleGetStarted = useCallback(() => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      setAuthTab('signup');
      setIsAuthModalOpen(true);
    }
  }, [user]);

  const handleLogin = useCallback(() => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      setAuthTab('login');
      setIsAuthModalOpen(true);
    }
  }, [user]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Generation",
      description: "Transform simple descriptions into comprehensive SOPs using advanced AI technology.",
      details: "Our AI understands context, industry standards, and best practices to create professional SOPs that would typically take hours to write manually.",
      example: "Simply describe 'customer onboarding process' and get a complete 12-step SOP with detailed instructions, compliance notes, and quality checkpoints."
    },
    {
      icon: Workflow,
      title: "Visual Workflows",
      description: "Automatically generate flowcharts and visual representations of your processes.",
      details: "Every SOP comes with an interactive flowchart that makes complex procedures easy to understand and follow for your team.",
      example: "A customer support SOP automatically includes a decision tree flowchart showing escalation paths and resolution steps."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share SOPs with your team, collect feedback, and maintain version control.",
      details: "Real-time collaboration features allow multiple team members to review, comment, and improve SOPs together.",
      example: "Team leads can review draft SOPs, add comments, suggest improvements, and approve final versions before implementation."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 compliance and data encryption.",
      details: "Your sensitive business processes are protected with enterprise-level security measures and compliance standards.",
      example: "All SOPs are encrypted at rest and in transit, with audit logs tracking every access and modification."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Director",
      company: "TechCorp Inc.",
      content: "FlowForge reduced our SOP creation time from weeks to minutes. The AI understands our business context perfectly.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Quality Manager",
      company: "Manufacturing Plus",
      content: "The visual workflows are game-changing. Our team finally understands complex processes at a glance.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "HR Director",
      company: "StartupXYZ",
      content: "We've standardized all our HR processes with FlowForge. Onboarding new employees is now seamless.",
      rating: 5,
      avatar: "ER"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "Free",
      period: "forever",
      description: "Perfect for individuals getting started",
      features: [
        "Up to 3 SOPs per month",
        "Basic AI generation",
        "PDF export",
        "Email support"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Ideal for small teams and growing businesses",
      features: [
        "Unlimited SOPs",
        "Advanced AI generation",
        "All export formats",
        "Visual workflow builder",
        "Team collaboration",
        "Priority support"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with specific needs",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Advanced analytics",
        "Dedicated support",
        "SLA guarantees",
        "On-premise deployment"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the AI generate SOPs?",
      answer: "Our AI analyzes your process description and applies industry best practices to create comprehensive, step-by-step procedures. It understands context, compliance requirements, and organizational standards."
    },
    {
      question: "Can I customize the generated SOPs?",
      answer: "Absolutely! Every SOP can be fully edited, customized, and branded to match your organization's style and requirements. You have complete control over the final output."
    },
    {
      question: "What export formats are supported?",
      answer: "We support PDF, Word, HTML, and Markdown exports. Enterprise customers also get custom branded templates and bulk export capabilities."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use bank-grade encryption and are SOC 2 compliant. Your data is encrypted at rest and in transit, and we never share your information with third parties."
    },
    {
      question: "Do you offer team collaboration features?",
      answer: "Yes! Teams can share SOPs, collaborate in real-time, leave comments, track changes, and manage permissions. Perfect for organizations of any size."
    }
  ];

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setIsFeatureModalOpen(true);
  };

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <LandingNavbar />

      {/* Hero Section */}
      <motion.section 
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue/90 to-brand-green/80" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-brand-green/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2 text-sm font-medium">
                  🚀 AI-Powered SOP Generation
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-montserrat text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Streamline Your Processes with{" "}
                <span className="bg-gradient-to-r from-brand-green to-white bg-clip-text text-transparent">
                  Intelligent SOP Creation
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white/90 font-inter mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Transform your business workflows into clear, actionable Standard Operating Procedures in minutes with AI. 
                No more manual documentation - just describe your process and watch it become a professional SOP.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Button 
                  onClick={handleGetStarted}
                  className="bg-white text-brand-blue hover:bg-gray-100 rounded-xl px-8 py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => scrollToSection('demo')}
                  className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 font-medium text-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div
                className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-brand-green" />
                  <span className="font-inter">No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-brand-green" />
                  <span className="font-inter">14-day free trial</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px]">
                <SplineScene
                  sceneUrl="https://prod.spline.design/ai-automation-hero/scene.splinecode"
                  className="w-full h-full rounded-2xl"
                  fallback={
                    <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-green/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <Lottie 
                        animationData={heroAnimation} 
                        className="w-full h-full max-w-md max-h-md"
                        loop={true}
                      />
                    </div>
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 mb-6 px-4 py-2 text-sm font-medium">
              ✨ Powerful Features
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-montserrat text-gray-900 mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Streamline Operations
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Powerful AI-driven tools designed to transform how you create, manage, and share your business processes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Features List */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => handleFeatureClick(feature)}
                >
                  <Card className="border-2 border-transparent hover:border-brand-blue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-brand-blue/10 rounded-xl group-hover:bg-brand-blue/20 transition-colors">
                          <feature.icon className="h-6 w-6 text-brand-blue" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 font-inter leading-relaxed">
                            {feature.description}
                          </p>
                          <div className="mt-3 flex items-center text-brand-blue font-medium text-sm group-hover:translate-x-2 transition-transform">
                            Learn more <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Features Animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px]">
                <SplineScene
                  sceneUrl="https://prod.spline.design/workflow-features/scene.splinecode"
                  className="w-full h-full rounded-2xl"
                  fallback={
                    <div className="w-full h-full bg-gradient-to-br from-brand-blue/10 to-brand-green/10 rounded-2xl flex items-center justify-center border border-gray-200">
                      <Lottie 
                        animationData={featuresAnimation} 
                        className="w-full h-full max-w-lg max-h-lg"
                        loop={true}
                      />
                    </div>
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 mb-6 px-4 py-2 text-sm font-medium">
              🎯 Simple Process
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-montserrat text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Creating professional SOPs has never been easier. Follow these simple steps to transform your processes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Process Animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[400px]">
                <PremiumVideo
                  src="/videos/how-it-works-process.webm"
                  className="w-full h-full rounded-2xl shadow-xl"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  fallback={
                    <div className="w-full h-full bg-gradient-to-br from-brand-blue/10 to-brand-green/10 rounded-2xl flex items-center justify-center border border-gray-200">
                      <Lottie 
                        animationData={howItWorksAnimation} 
                        className="w-full h-full max-w-lg max-h-lg"
                        loop={true}
                      />
                    </div>
                  }
                />
              </div>
            </motion.div>

            {/* Steps */}
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Describe Your Process",
                  description: "Simply describe your business process in plain English. No technical jargon needed.",
                  icon: FileText
                },
                {
                  number: "02", 
                  title: "AI Generates SOP",
                  description: "Our advanced AI analyzes your description and creates a comprehensive, professional SOP.",
                  icon: Zap
                },
                {
                  number: "03",
                  title: "Review & Customize",
                  description: "Edit, customize, and perfect your SOP with our intuitive editor and visual workflow tools.",
                  icon: Settings
                },
                {
                  number: "04",
                  title: "Share & Implement",
                  description: "Export in multiple formats and share with your team for immediate implementation.",
                  icon: Share
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:bg-brand-blue/90 transition-colors">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 font-inter leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section id="ai-demo" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-6 px-4 py-2 text-sm font-medium">
              🤖 AI in Action
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-montserrat text-gray-900 mb-6">
              See AI Magic in Action
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Watch how our AI transforms simple descriptions into comprehensive, professional SOPs in real-time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Demo Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-montserrat">
                  Input Example:
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 font-mono text-sm text-gray-700">
                  "Create a customer onboarding process that includes account setup, 
                  product training, and initial support touchpoints to ensure successful adoption."
                </div>
              </div>

              <div className="flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full"
                />
                <span className="ml-3 text-gray-600 font-inter">AI Processing...</span>
              </div>

              <div className="bg-brand-blue/5 rounded-xl p-6 border border-brand-blue/20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-montserrat">
                  Generated SOP Preview:
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <span className="font-medium">Initial Customer Contact & Welcome</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <span className="font-medium">Account Setup & Configuration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <span className="font-medium">Product Training & Orientation</span>
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-brand-blue font-medium">+ 9 more detailed steps</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[400px]">
                <PremiumVideo
                  src="/videos/ai-in-action-demo.webm"
                  className="w-full h-full rounded-2xl shadow-xl"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  fallback={
                    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl flex items-center justify-center border border-gray-200">
                      <Lottie 
                        animationData={aiInActionAnimation} 
                        className="w-full h-full max-w-lg max-h-lg"
                        loop={true}
                      />
                    </div>
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-green-100 text-green-700 border-green-200 mb-6 px-4 py-2 text-sm font-medium">
              💰 Simple Pricing
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-montserrat text-gray-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-brand-blue text-white px-4 py-1 text-sm font-medium shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  plan.popular ? 'border-2 border-brand-blue shadow-lg scale-105' : 'border border-gray-200'
                }`}>
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold font-montserrat text-gray-900">
                      {plan.name}
                    </CardTitle>
                    <div className="space-y-2">
                      <div className="text-4xl font-extrabold text-gray-900">
                        {plan.price}
                      </div>
                      <div className="text-gray-600 font-inter">{plan.period}</div>
                    </div>
                    <CardDescription className="text-gray-600 font-inter text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-brand-green flex-shrink-0" />
                          <span className="text-gray-700 font-inter">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handlePlanSelect(plan)}
                      className={`w-full py-3 font-semibold text-lg rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                        plan.popular 
                          ? 'bg-brand-blue hover:bg-brand-blue/90 text-white shadow-md' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              onClick={() => setIsPricingDropdownOpen(true)}
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl px-6 py-3 font-medium"
            >
              Compare All Features
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 mb-6 px-4 py-2 text-sm font-medium">
              ❓ FAQ
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-montserrat text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Get answers to common questions about FlowForge and SOP creation.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border border-gray-200 hover:border-brand-blue/30 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 font-montserrat">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 font-inter leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-6 px-4 py-2 text-sm font-medium">
              ⭐ Customer Stories
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-montserrat text-gray-900 mb-6">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              See how organizations are transforming their operations with FlowForge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 font-inter leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                        <span className="text-brand-blue font-bold">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 font-montserrat">{testimonial.name}</p>
                        <p className="text-sm text-gray-600 font-inter">{testimonial.role}</p>
                        <p className="text-sm text-gray-500 font-inter">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-green">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold font-montserrat text-white mb-6">
              Ready to Transform Your Processes?
            </h2>
            <p className="text-xl text-white/90 font-inter mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of organizations already using FlowForge to streamline their operations. 
              Start your free trial today and see the difference AI can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleGetStarted}
                className="bg-white text-brand-blue hover:bg-gray-100 rounded-xl px-8 py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 font-medium text-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold font-montserrat text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-montserrat text-gray-900">
                    Send us a message
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-inter">
                    We'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleNewsletterSignup} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" className="rounded-lg" />
                      <Input placeholder="Last Name" className="rounded-lg" />
                    </div>
                    <Input placeholder="Email Address" type="email" className="rounded-lg" />
                    <Input placeholder="Company" className="rounded-lg" />
                    <textarea 
                      placeholder="Your message..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue resize-none"
                    />
                    <Button 
                      type="submit"
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl py-3 font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">hello@flowforge.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">123 Innovation Drive<br />San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 font-montserrat">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6 group cursor-pointer" onClick={() => window.location.href = '/'}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3">
                  <Bot className="h-6 w-6 text-brand-blue" />
                </div>
                <span className="text-2xl font-bold font-montserrat group-hover:text-gray-300 transition-colors">
                  Flowforge
                </span>
              </div>
              <p className="text-gray-400 font-inter leading-relaxed max-w-md mb-6">
                Streamline your processes with intelligent SOP creation powered by AI. Transform your business workflows into clear, actionable procedures.
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-lg"
                />
                <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 rounded-lg">
                  Subscribe
                </Button>
              </form>
            </div>
            <div>
              <h3 className="font-semibold mb-6 font-montserrat text-lg">Product</h3>
              <ul className="space-y-3 text-gray-400 font-inter">
                <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/templates" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="/docs/api" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 font-montserrat text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400 font-inter">
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/documentation" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400 font-inter">
            <p>© {new Date().getFullYear()} Flowforge. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isAuthModalOpen && (
        <AuthModal 
          open={isAuthModalOpen} 
          onOpenChange={setIsAuthModalOpen} 
          defaultTab={authTab} 
        />
      )}

      <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
        feature={selectedFeature}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPlan={selectedPlan}
      />

      <PricingDropdown
        isOpen={isPricingDropdownOpen}
        onClose={() => setIsPricingDropdownOpen(false)}
      />
    </div>
  );
};

export default Index;