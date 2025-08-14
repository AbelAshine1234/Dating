import './globals.css';
import type { Metadata } from 'next';
import { UserProvider } from '@/context/UserContext';
import { ChatProvider } from '@/context/ChatContext';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'LoveSync - Find Love. Your Way.',
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
          </ChatProvider>
        </UserProvider>
      </body>
    </html>
  );
}