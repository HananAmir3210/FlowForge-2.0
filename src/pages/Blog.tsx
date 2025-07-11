
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of Business Process Documentation",
      excerpt: "Exploring how AI is revolutionizing the way we create and maintain Standard Operating Procedures.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      category: "Industry Insights",
      readTime: "5 min read"
    },
    {
      title: "5 Common SOP Mistakes and How to Avoid Them",
      excerpt: "Learn from the most frequent pitfalls in process documentation and discover best practices for creating effective SOPs.",
      author: "Mike Chen",
      date: "2024-01-10",
      category: "Best Practices",
      readTime: "7 min read"
    },
    {
      title: "Case Study: How TechCorp Reduced Onboarding Time by 60%",
      excerpt: "Discover how TechCorp streamlined their employee onboarding process using FlowForge's AI-powered SOP generation.",
      author: "Emily Rodriguez",
      date: "2024-01-05",
      category: "Case Studies",
      readTime: "8 min read"
    },
    {
      title: "Building a Culture of Documentation",
      excerpt: "Why documentation culture matters and practical steps to foster it in your organization.",
      author: "David Kim",
      date: "2024-01-01",
      category: "Culture",
      readTime: "6 min read"
    },
    {
      title: "API Integration: Automating SOP Creation in Your Workflow",
      excerpt: "Learn how to integrate FlowForge's API into your existing tools and automate process documentation.",
      author: "Mike Chen",
      date: "2023-12-28",
      category: "Technical",
      readTime: "10 min read"
    },
    {
      title: "The ROI of Standardized Processes",
      excerpt: "Quantifying the business impact of well-documented processes and Standard Operating Procedures.",
      author: "Sarah Johnson",
      date: "2023-12-20",
      category: "Business",
      readTime: "6 min read"
    }
  ];

  const categories = ["All", "Industry Insights", "Best Practices", "Case Studies", "Culture", "Technical", "Business"];

  return (
    <Layout title="Blog">
      <div className="space-y-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Insights, best practices, and stories from the world of business process documentation. 
            Stay updated with the latest trends in SOP creation and management.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
              <div className="text-center p-8">
                <h3 className="text-xl font-bold mb-2">Featured Post</h3>
                <p className="text-blue-100">Latest insights from our team</p>
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                  {blogPosts[0].category}
                </span>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{blogPosts[0].author}</span>
                </div>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <Button className="group">
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-white font-montserrat text-xl hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#EEEEEE] font-inter text-base mb-4 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest insights on business process documentation, 
                AI trends, and FlowForge updates.
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Blog;
