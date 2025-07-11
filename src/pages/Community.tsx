
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Calendar, Award, ExternalLink, Github } from 'lucide-react';

const Community = () => {
  const communityStats = [
    { label: "Active Members", value: "5,000+", icon: Users },
    { label: "Discussions", value: "1,200+", icon: MessageSquare },
    { label: "Events Hosted", value: "50+", icon: Calendar },
    { label: "Solutions Shared", value: "800+", icon: Award }
  ];

  const platforms = [
    {
      name: "Discord Server",
      description: "Join our Discord for real-time discussions, Q&A sessions, and community support",
      members: "3,500+ members",
      link: "https://discord.gg/flowforge",
      color: "purple"
    },
    {
      name: "Community Forum",
      description: "Share experiences, ask questions, and find solutions in our dedicated forum",
      members: "2,000+ posts",
      link: "https://community.flowforge.com",
      color: "blue"
    },
    {
      name: "GitHub Discussions",
      description: "Technical discussions, feature requests, and open-source contributions",
      members: "500+ contributors",
      link: "https://github.com/flowforge/community",
      color: "gray"
    }
  ];

  const events = [
    {
      title: "Monthly SOP Masterclass",
      date: "Every 3rd Thursday",
      time: "2:00 PM EST",
      description: "Learn advanced SOP creation techniques and best practices from industry experts"
    },
    {
      title: "Community Showcase",
      date: "Last Friday of the month",
      time: "1:00 PM EST",
      description: "Share your SOP success stories and learn from other community members"
    },
    {
      title: "AI & Automation Workshop",
      date: "Quarterly",
      time: "TBA",
      description: "Deep dive into AI-powered process automation and advanced FlowForge features"
    }
  ];

  const guidelines = [
    "Be respectful and constructive in all interactions",
    "Share knowledge and help fellow community members",
    "Keep discussions relevant to FlowForge and process documentation",
    "No spam, self-promotion, or off-topic content",
    "Respect privacy - don't share sensitive business information",
    "Follow platform-specific rules and guidelines"
  ];

  return (
    <Layout title="Community">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Join the FlowForge Community</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Connect with thousands of process documentation enthusiasts, share knowledge, 
            and learn from experts in business operations and AI-powered automation.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {communityStats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Platforms */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Where We Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{platform.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </CardTitle>
                  <CardDescription className="text-[#EEEEEE] font-inter">{platform.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {platform.members}
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => window.open(platform.link, '_blank')}
                    >
                      Join {platform.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Events */}
        <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-white font-montserrat text-2xl flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span>Community Events</span>
            </CardTitle>
            <CardDescription className="text-[#EEEEEE] font-inter">
              Regular events to help you learn, network, and grow your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {event.date} • {event.time}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-white font-montserrat text-2xl">Community Guidelines</CardTitle>
              <CardDescription className="text-[#EEEEEE] font-inter">
                Help us maintain a positive and productive environment for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border border-sopfuel-gray text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-white font-montserrat text-2xl">Get Involved</CardTitle>
              <CardDescription className="text-[#EEEEEE] font-inter">
                Ways to contribute and make a difference in our community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Share Your Expertise</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Help other members by answering questions and sharing your SOP creation experiences.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contribute to Documentation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Help improve our community knowledge base and tutorials.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Host Community Events</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Organize workshops, meetups, or discussion sessions on topics you're passionate about.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Beta Testing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get early access to new features and help shape the future of FlowForge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Community Members */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-100" />
              <h3 className="text-2xl font-bold mb-4">Community Champions</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Every month, we recognize outstanding community members who go above and beyond 
                to help others and contribute to our collective knowledge.
              </p>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Nominate a Champion
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Community;
