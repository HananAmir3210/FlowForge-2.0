
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Play, Calendar, User, Mail, Phone } from 'lucide-react';

const Demo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo request submitted:', formData);
    // Handle form submission here
  };

  return (
    <Layout title="Demo">
      <div className="space-y-8">
        <div className="text-center mb-12">
          <p className="text-lg text-[#EEEEEE] font-inter max-w-3xl mx-auto">
            See FlowForge in action! Watch our demo video or schedule a personalized demonstration with our team.
          </p>
        </div>

        {/* Video Demo Section */}
        <Card className="overflow-hidden bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white font-montserrat">Watch FlowForge in Action</CardTitle>
            <CardDescription className="text-[#EEEEEE] font-inter">
              See how easy it is to create professional SOPs in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-white/10 backdrop-blur-md rounded-lg aspect-video flex items-center justify-center border border-sopfuel-gray">
              <div className="text-center">
                <Play className="h-16 w-16 text-brand-blue mx-auto mb-4 drop-shadow-lg" />
                <p className="text-[#EEEEEE] font-inter mb-4">
                  Demo Video Coming Soon
                </p>
                <Button className="btn-premium font-montserrat text-white text-lg shadow-xl">Watch Demo</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Demo Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white font-montserrat">
                <Calendar className="h-6 w-6 text-brand-blue" />
                <span>Request a Personalized Demo</span>
              </CardTitle>
              <CardDescription className="text-[#EEEEEE] font-inter">
                Schedule a 30-minute demo with our team to see how FlowForge can transform your business processes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#EEEEEE] font-inter mb-1">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#EEEEEE] font-inter mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#EEEEEE] font-inter mb-1">
                    Company
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#EEEEEE] font-inter mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#EEEEEE] font-inter mb-1">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your specific needs or questions"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full btn-premium font-montserrat text-white text-lg shadow-xl">
                  Request Demo
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-white font-montserrat">What You'll See</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="bg-brand-blue/20 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                    </div>
                    <span className="text-[#EEEEEE] font-inter">
                      AI-powered SOP generation in real-time
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-brand-blue/20 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                    </div>
                    <span className="text-[#EEEEEE] font-inter">
                      Visual workflow creation and editing
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-brand-blue/20 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                    </div>
                    <span className="text-[#EEEEEE] font-inter">
                      Team collaboration features
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-brand-blue/20 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                    </div>
                    <span className="text-[#EEEEEE] font-inter">
                      Export and sharing options
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-brand-blue/20 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                    </div>
                    <span className="text-[#EEEEEE] font-inter">
                      Integration possibilities
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-white font-montserrat">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-brand-blue" />
                  <span className="text-[#EEEEEE] font-inter">demo@flowforge.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-brand-blue" />
                  <span className="text-[#EEEEEE] font-inter">+1 (555) 987-6543</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
