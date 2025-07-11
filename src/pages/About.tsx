
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Users, Award } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former operations director at Fortune 500 companies, passionate about streamlining business processes."
    },
    {
      name: "Mike Chen",
      role: "CTO & Co-Founder",
      bio: "AI researcher with 10+ years in machine learning and natural language processing."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "UX expert focused on making complex tools simple and intuitive for everyday users."
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      bio: "Full-stack developer with expertise in scalable systems and AI integration."
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Simplicity",
      description: "We believe powerful tools should be simple to use. Complex processes shouldn't require complex software."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Great processes are built by teams. We enable seamless collaboration across organizations."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're committed to delivering the highest quality SOPs that meet industry standards."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Clear communication and honest practices in everything we do, from pricing to processes."
    }
  ];

  return (
    <Layout title="About Us">
      <div className="space-y-12">
        {/* Mission Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            To democratize business process documentation by making it as simple as describing your workflow in plain English. 
            We believe every organization, regardless of size, should have access to professional-grade Standard Operating Procedures.
          </p>
        </div>

        {/* Story Section */}
        <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-white font-montserrat text-2xl text-center">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              FlowForge was born from a simple frustration: creating Standard Operating Procedures was taking too long and costing too much. 
              Our founders, Sarah and Mike, were working at different companies but facing the same problem - teams were spending weeks 
              documenting processes that could be explained in minutes.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              In 2023, they decided to combine Sarah's operations expertise with Mike's AI background to build a solution. 
              The idea was revolutionary yet simple: what if you could just describe your process and get a professional SOP instantly?
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Today, FlowForge serves thousands of businesses worldwide, from startups to Fortune 500 companies, 
              helping them transform ideas into actionable processes in minutes, not months.
            </p>
          </CardContent>
        </Card>

        {/* Vision & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-6 w-6" />
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To become the global standard for process documentation, enabling every organization to operate 
                with clarity, consistency, and efficiency. We envision a world where business knowledge is 
                never lost and best practices are always accessible.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6" />
                <span>What Drives Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Every day, we see businesses struggle with inconsistent processes, knowledge silos, and operational inefficiencies. 
                We're driven by the impact our technology has on real people - helping teams work smarter, 
                reducing errors, and enabling organizations to scale successfully.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <value.icon className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-white font-montserrat text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#EEEEEE] font-inter text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-white font-montserrat text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium text-[#EEEEEE] font-inter">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600 dark:text-gray-300">SOPs Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-300">Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
