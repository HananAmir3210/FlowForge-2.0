
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <Layout title="Terms of Service">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Terms of Service</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                By accessing or using FlowForge's AI-powered SOP generation platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                FlowForge provides an AI-powered platform for creating, editing, and managing Standard Operating Procedures (SOPs) and business process documentation. Our Service includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>AI-generated SOP creation from text descriptions</li>
                <li>Visual workflow generation and editing tools</li>
                <li>Collaboration and sharing features</li>
                <li>Export capabilities in multiple formats</li>
                <li>API access for integrations (paid plans)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Accounts</h2>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.1 Account Creation</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You must create an account to use our Service. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.2 Account Security</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Acceptable Use</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the intellectual property rights of others</li>
                <li>Upload malicious code or attempt to compromise our systems</li>
                <li>Reverse engineer or attempt to extract our AI models</li>
                <li>Share your account credentials with unauthorized users</li>
                <li>Use the Service to create content that is harmful, offensive, or inappropriate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Subscription Plans and Payment</h2>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.1 Subscription Plans</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We offer various subscription plans with different features and usage limits. Plan details and pricing are available on our website and may change with notice.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.2 Payment Terms</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as expressly stated</li>
                <li>You authorize us to charge your payment method for all applicable fees</li>
                <li>Price changes will be communicated with 30 days notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.1 Your Content</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You retain ownership of all content you create using our Service. By using our Service, you grant us a limited license to process your content to provide the Service.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.2 Our Platform</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                The Service and its original content, features, and functionality are owned by FlowForge and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. AI-Generated Content</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Our AI generates content based on your input. While we strive for accuracy, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>AI-generated content may require review and editing</li>
                <li>You are responsible for verifying the accuracy and appropriateness of generated content</li>
                <li>We do not guarantee the accuracy, completeness, or suitability of AI-generated content</li>
                <li>You should not rely solely on AI-generated content for critical business decisions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Privacy and Data Protection</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Termination</h2>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9.1 Termination by You</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9.2 Termination by Us</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We may terminate or suspend your account immediately if you breach these Terms or engage in conduct that we determine to be harmful to our Service or other users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Disclaimers and Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                IN NO EVENT SHALL FLOWFORGE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Changes to Terms</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes via email or through our Service. Your continued use of the Service after changes become effective constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Governing Law</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Email:</strong> legal@flowforge.com<br />
                  <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94107<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default TermsOfService;
