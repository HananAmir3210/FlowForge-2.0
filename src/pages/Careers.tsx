
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Users, Coffee, Heart, Zap, Globe } from 'lucide-react';

const Careers = () => {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "Help build the next generation of AI-powered SOP creation tools with React, TypeScript, and modern web technologies."
    },
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Remote / New York",
      type: "Full-time",
      salary: "$140k - $180k",
      description: "Develop and improve our natural language processing models for automated SOP generation and process understanding."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $130k",
      description: "Design intuitive user experiences that make complex process documentation simple and enjoyable for our users."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Austin",
      type: "Full-time",
      salary: "$80k - $110k",
      description: "Help our customers achieve success with FlowForge by providing guidance, training, and ongoing support."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $140k",
      description: "Build and maintain our cloud infrastructure, CI/CD pipelines, and ensure scalability and reliability."
    },
    {
      title: "Technical Writer",
      department: "Marketing",
      location: "Remote",
      type: "Contract",
      salary: "$60k - $80k",
      description: "Create comprehensive documentation, tutorials, and educational content for our API and platform."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance. Mental health support and wellness stipend."
    },
    {
      icon: Coffee,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours. Home office setup allowance and co-working stipend."
    },
    {
      icon: Zap,
      title: "Growth & Learning",
      description: "Annual learning budget, conference attendance, and internal mentorship programs."
    },
    {
      icon: Globe,
      title: "Time Off",
      description: "Unlimited PTO policy, company-wide week off, and sabbatical opportunities after 5 years."
    }
  ];

  const values = [
    "Customer obsession - We put our customers at the center of everything we do",
    "Continuous learning - We embrace curiosity and invest in personal growth",
    "Radical transparency - We communicate openly and honestly",
    "Bias for action - We move fast and iterate based on feedback",
    "Diverse perspectives - We value different backgrounds and viewpoints"
  ];

  return (
    <Layout title="Careers">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We're building the future of business process documentation. Join our team of passionate individuals 
            who are making it easier for organizations worldwide to create, manage, and scale their operations.
          </p>
        </div>

        {/* Company Stats */}
        <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-gray-600 dark:text-gray-300">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-gray-600 dark:text-gray-300">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$15M</div>
                <div className="text-gray-600 dark:text-gray-300">Series A Raised</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
                <div className="text-gray-600 dark:text-gray-300">Glassdoor Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why FlowForge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <benefit.icon className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-white font-montserrat text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#EEEEEE] font-inter text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-white font-montserrat text-2xl text-center">Our Values</CardTitle>
            <CardDescription className="text-[#EEEEEE] font-inter text-center">
              The principles that guide everything we do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {values.map((value, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">{value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <Button className="w-full lg:w-auto">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Don't See a Perfect Fit?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for improving business processes. 
              Send us your resume and tell us how you'd like to contribute to FlowForge's mission.
            </p>
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Send Us Your Resume
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Careers;
