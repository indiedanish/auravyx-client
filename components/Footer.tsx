import React from 'react';
import Container from './Container';
import { Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage-900 border-t border-sage-800 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Auravyx
            </h3>
            <p className="text-sage-200 text-sm">
              Inclusive wellness intelligence for real skin, real tones, real lives.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-sage-200 hover:text-primary-400 transition-colors text-sm">
                  Privacy Notice
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-400" />
                <span className="text-sage-200 text-sm">Patent Pending</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sage-200 text-sm mb-2">
              <a href="mailto:hello@auravyx.com" className="hover:text-primary-400 transition-colors">
                hello@auravyx.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-sage-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sage-300 text-sm">
              © {currentYear} Auravyx Technologies Ltd. All rights reserved.
            </p>
            <p className="text-sage-400 text-xs max-w-md text-center md:text-right">
              Auravyx does not provide medical diagnosis or treatment. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

