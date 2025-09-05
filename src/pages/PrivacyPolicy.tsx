
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <Layout title="Privacy Policy">
      <Card className="bg-white/10 backdrop-blur-md border border-flowforge-gray text-white shadow-lg max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-white font-montserrat text-center">Privacy Policy</CardTitle>
          <p className="text-center text-[#EEEEEE] font-inter">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <div className="space-y-6">
            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-[#EEEEEE] font-inter leading-relaxed">
                FlowForge ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered Standard Operating Procedure (SOP) generation platform and related services.
              </p>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc list-inside text-[#EEEEEE] font-inter space-y-2 mb-4">
                <li>Account information (name, email address, company details)</li>
                <li>SOP content and process descriptions you create</li>
                <li>Payment information (processed through secure third-party providers)</li>
                <li>Communications with our support team</li>
                <li>Feedback and survey responses</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.2 Information We Collect Automatically</h3>
              <ul className="list-disc list-inside text-[#EEEEEE] font-inter space-y-2 mb-4">
                <li>Usage data (features used, time spent, interaction patterns)</li>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Log data (access times, pages viewed, errors encountered)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-[#EEEEEE] font-inter space-y-2">
                <li>Provide and improve our SOP generation services</li>
                <li>Process payments and manage your account</li>
                <li>Communicate with you about our services</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Train and improve our AI models (using anonymized data)</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send important updates and security notifications</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-[#EEEEEE] font-inter leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-[#EEEEEE] font-inter space-y-2">
                <li>With trusted service providers who assist in operating our platform</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a business transaction (merger, acquisition, etc.)</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Data Security</h2>
              <p className="text-[#EEEEEE] font-inter leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-[#EEEEEE] font-inter space-y-2">
                <li>End-to-end encryption for data transmission</li>
                <li>Encrypted storage in SOC 2 compliant data centers</li>
                <li>Regular security audits and penetration testing</li>
                <li>Multi-factor authentication for account access</li>
                <li>Employee access controls and training</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Your Rights and Choices</h2>
              <p className="text-[#EEEEEE] font-inter leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside text-[#EEEEEE] font-inter space-y-2">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Data portability (receive your data in a structured format)</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Cookies and Tracking</h2>
              <p className="text-[#EEEEEE] font-inter leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience. You can control cookie preferences through your browser settings. Essential cookies required for platform functionality cannot be disabled.
              </p>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. International Data Transfers</h2>
              <p className="text-[#EEEEEE] font-inter leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Children's Privacy</h2>
              <p className="text-[#EEEEEE] font-inter leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-[#EEEEEE] font-inter leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or through our platform. Your continued use of our services after changes become effective constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-white font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
              <p className="text-[#EEEEEE] font-inter leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-6">
                <div className="bg-white/10 backdrop-blur-md border border-flowforge-gray rounded-xl p-6 text-white shadow-lg max-w-md mx-auto">
                  <h4 className="text-lg font-bold font-montserrat mb-2 text-white">Contact Information</h4>
                  <p className="text-[#EEEEEE] font-inter mb-1">
                    <strong>Email:</strong> privacy@flowforge.com
                  </p>
                  <p className="text-[#EEEEEE] font-inter mb-1">
                    <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94107
                  </p>
                  <p className="text-[#EEEEEE] font-inter">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default PrivacyPolicy;
