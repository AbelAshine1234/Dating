import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon, MoonIcon, UserIcon, CreditCardIcon } from '../constants';

export const NavBar: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative font-heading text-lg transition-colors duration-300 ${
      isActive
        ? 'text-neon-magenta dark:text-neon-magenta'
        : 'text-gray-600 dark:text-gray-300 hover:text-neon-purple dark:hover:text-neon-purple'
    } after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-2px] after:left-0 after:bg-neon-magenta after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 ${
        isActive ? 'after:scale-x-100 after:origin-bottom-left' : 'group-hover:after:scale-x-100 group-hover:after:origin-bottom-left'
    }`;
    
  const mainNavLinks = (
      <>
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/dating" className={navLinkClass}>Dating</NavLink>
        <NavLink to="/marriage" className={navLinkClass}>Marriage</NavLink>
        <NavLink to="/chat" className={navLinkClass}>Chat</NavLink>
        <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
        <NavLink to="/subscription" className={navLinkClass}>Plans</NavLink>
      </>
  );
  
  const mobileMenuLinkClass = `flex items-center gap-3 w-full text-left p-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700`;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm shadow-md animate-fade-in">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-3xl font-bold font-heading text-neon-purple animate-glow">
              DATEMATCH
            </NavLink>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {mainNavLinks}
          </div>

          <div className="flex items-center">
             <button
              onClick={themeContext?.toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {themeContext?.theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <div className="md:hidden ml-2">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-purple">
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
            <div className="md:hidden pb-4 absolute top-20 left-0 right-0 bg-white dark:bg-dark-bg shadow-lg z-50 px-4">
                <div className="flex flex-col items-center space-y-2 pt-4">
                  <NavLink to="/profile" className={mobileMenuLinkClass} onClick={() => setIsMenuOpen(false)}>
                    <UserIcon /> Profile
                  </NavLink>
                  <NavLink to="/subscription" className={mobileMenuLinkClass} onClick={() => setIsMenuOpen(false)}>
                    <CreditCardIcon /> Subscription
                  </NavLink>
                </div>
            </div>
        )}
      </nav>
    </header>
  );
};
