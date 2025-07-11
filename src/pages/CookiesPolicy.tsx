
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiesPolicy = () => {
  return (
    <Layout title="Cookies Policy">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Cookies Policy</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What Are Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you visit our website. 
                They allow us to recognize your device and remember information about your visit, such as your preferred 
                language and other settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                FlowForge uses cookies for several purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Essential cookies that are necessary for the website to function properly</li>
                <li>Analytics cookies to understand how visitors interact with our website</li>
                <li>Preference cookies to remember your settings and choices</li>
                <li>Marketing cookies to deliver relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Essential Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                These cookies are strictly necessary for the operation of our site. They enable core functionality 
                such as security, network management, and accessibility.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Analytics Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We use analytics cookies to collect information about how visitors use our website. This helps us 
                improve our services and user experience.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Functionality Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                These cookies allow our website to remember choices you make and provide enhanced features and 
                personal content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Through your browser settings - most browsers allow you to refuse or accept cookies</li>
                <li>Through our cookie consent banner when you first visit our site</li>
                <li>By contacting us directly to opt-out of certain cookie types</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Some cookies on our site are set by third-party services that appear on our pages. We have no control 
                over these cookies, and you should check the relevant third party's website for more information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Updates to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We may update this Cookies Policy from time to time. Any changes will be posted on this page with 
                an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Email:</strong> privacy@flowforge.com<br />
                  <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94107
                </p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CookiesPolicy;
