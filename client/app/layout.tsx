import './globals.css';
import type { Metadata } from 'next';
import { UserProvider } from '@/context/UserContext';
import { ChatProvider } from '@/context/ChatContext';
import NavBar from '@/components/NavBar';
import { Facebook, Twitter, Instagram, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DATEMATCH - Find Love. Your Way.',
  description: 'Modern dating and marriage application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <UserProvider>
          <ChatProvider>
            <NavBar />
            <main className="pb-20">
              {children}
            </main>
            <footer className="relative bg-black/90 border-t border-neon/30 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-neon neon-glow">Contact Us</h3>
                    <p className="text-gray-300">
                      <a href="tel:+18001234567" className="hover:text-neon transition-colors">
                        +1 (800) 123-4567
                      </a>
                    </p>
                    <p className="text-gray-300">
                      <a href="mailto:support@loveconnect.com" className="hover:text-neon transition-colors">
                        support@loveconnect.com
                      </a>
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-magenta magenta-glow">Follow Us</h3>
                    <div className="flex justify-center md:justify-start gap-6">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-neon transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-neon transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-6 h-6" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-neon transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                      <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-neon transition-colors"
                        aria-label="TikTok"
                      >
                        <Music className="w-6 h-6" />
                      </a>
                    </div>
                  </div>

                  {/* Copyright */}
                  <div className="flex items-center justify-center md:justify-end">
                    <p className="text-gray-400 text-sm">
                      © 2025 LoveConnect. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </ChatProvider>
        </UserProvider>
      </body>
    </html>
  );
}