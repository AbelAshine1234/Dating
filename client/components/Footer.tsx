
import React from 'react';

const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-magenta transition-colors duration-300">
        {children}
    </a>
)

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-neon-purple">About</a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-neon-purple">Terms</a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-neon-purple">Privacy</a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">© {new Date().getFullYear()} DATEMATCH. All rights reserved.</p>
          <div className="flex space-x-6">
            <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
            </SocialIcon>
             <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>
            </SocialIcon>
             <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02 2.5.06 4.11 1.1 5.46 2.82 1.18 1.5 1.83 3.01 2.05 4.88.08 1.3.1 2.6.1 3.91s-.02 2.61-.1 3.91c-.22 1.87-.87 3.38-2.05 4.88-1.35 1.72-2.96 2.76-5.46 2.82-1.3.03-2.6.02-3.91.02s-2.61.01-3.91-.02c-2.5-.06-4.11-1.1-5.46-2.82-1.18-1.5-1.83-3.01-2.05-4.88-.08-1.3-.1-2.6-.1-3.91s.02-2.61.1-3.91c.22-1.87.87-3.38 2.05-4.88 1.35-1.72 2.96-2.76 5.46-2.82 1.3-.03 2.6-.02 3.91-.02zM7.93 5.43c-2.14.45-3.01 1.8-3.01 4.23v4.6c0 2.51.9 3.84 3.09 4.25.5.09 1.5.15 2.5.15s2-.06 2.5-.15c2.19-.41 3.09-1.74 3.09-4.25v-4.6c0-2.43-.87-3.78-3.01-4.23-.5-.1-1.5-.15-2.58-.15s-2.08.05-2.58.15z" /></svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};
