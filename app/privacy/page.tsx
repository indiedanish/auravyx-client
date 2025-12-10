import Container from '@/components/Container';
import Section from '@/components/Section';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Notice | Auravyx',
  description: 'Privacy policy for Auravyx Technologies Ltd',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors font-medium"
            >
              ← Back to home
            </Link>

            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
              Privacy Notice
            </h1>
            
            <div className="space-y-8 text-gray-700 leading-relaxed">
              <div>
                <p className="text-sm text-gray-500 mb-8">
                  Last updated: December 2025
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  1. Introduction
                </h2>
                <p>
                  Auravyx Technologies Ltd ("we", "our", or "us") is committed to protecting your privacy. 
                  This Privacy Notice explains how we collect, use, and safeguard your personal information 
                  when you interact with our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  2. Information We Collect
                </h2>
                <p className="mb-3">
                  We collect the following information when you use our website:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Waitlist submissions:</strong> Email address and optional interest preferences</li>
                  <li><strong>Partner enquiries:</strong> Name, company, email, role, and message content</li>
                  <li><strong>Technical data:</strong> IP address, browser type, device information, and usage patterns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="mb-3">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide updates about Auravyx and early access opportunities</li>
                  <li>Respond to partnership enquiries and business communications</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  4. Data Storage and Security
                </h2>
                <p>
                  Your data is stored securely using industry-standard encryption and security measures. 
                  We use Supabase for data storage, which is compliant with GDPR and other data protection 
                  regulations. We retain your information only for as long as necessary to fulfill the 
                  purposes outlined in this notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  5. Your Rights
                </h2>
                <p className="mb-3">
                  Under data protection law, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  6. Third-Party Services
                </h2>
                <p>
                  We use trusted third-party services to operate our website, including Supabase for data 
                  storage and Vercel for hosting. These providers have their own privacy policies and 
                  security measures in place.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  7. Cookies and Analytics
                </h2>
                <p>
                  We use minimal cookies and privacy-conscious analytics to understand how visitors use 
                  our website. We do not use tracking cookies or sell your data to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  8. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Notice or wish to exercise your rights, 
                  please contact us at:
                </p>
                <p className="mt-4">
                  <a href="mailto:hello@auravyx.com" className="text-primary-600 hover:text-primary-700 font-medium">
                    hello@auravyx.com
                  </a>
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Auravyx Technologies Ltd<br />
                  United Kingdom
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  9. Changes to This Notice
                </h2>
                <p>
                  We may update this Privacy Notice from time to time. We will notify you of any 
                  significant changes by posting the new Privacy Notice on this page and updating 
                  the "Last updated" date.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

