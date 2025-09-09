import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { ProfileMode } from '../../types';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Header: React.FC = () => {
  const { mode, setMode } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const registerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (registerRef.current && !registerRef.current.contains(event.target as Node)) {
        setIsRegisterOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavLinks: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
    <>
      <Link to="/" className={`${isMobile ? 'block py-2' : ''} hover:text-[#e42525]`} onClick={() => setIsMenuOpen(false)}>Home</Link>
      <Link to="/search" className={`${isMobile ? 'block py-2' : ''} hover:text-[#e42525]`} onClick={() => setIsMenuOpen(false)}>Search</Link>
      <Link to="/inbox" className={`${isMobile ? 'block py-2' : ''} hover:text-[#e42525]`} onClick={() => setIsMenuOpen(false)}>Inbox</Link>
      <Link to="/matches" className={`${isMobile ? 'block py-2' : ''} hover:text-[#e42525]`} onClick={() => setIsMenuOpen(false)}>Matches</Link>
      <Link to="/payment" className={`${isMobile ? 'block py-2' : ''} text-[#e42525] font-bold`} onClick={() => setIsMenuOpen(false)}>Upgrade Now</Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md h-[60px] z-50">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <Link to="/"><Logo /></Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-gray-700">
          <NavLinks />
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mode Toggle */}
          <div className="hidden sm:flex items-center bg-gray-200 rounded-full p-1">
            <button onClick={() => setMode(ProfileMode.Marriage)} className={`px-3 py-1 text-sm rounded-full ${mode === ProfileMode.Marriage ? 'bg-white shadow' : 'text-gray-600'}`}>Marriage</button>
            <button onClick={() => setMode(ProfileMode.Dating)} className={`px-3 py-1 text-sm rounded-full ${mode === ProfileMode.Dating ? 'bg-white shadow' : 'text-gray-600'}`}>Dating</button>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100">
                  <img src={user.photoUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="font-semibold text-gray-700 hidden lg:block">{user.name}</span>
                  <FaChevronDown className="text-gray-500" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>My Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="link" className="text-sm px-4 !text-[#007bff]">Login</Button>
                </Link>
                <div ref={registerRef} className="relative">
                  <Button onClick={() => setIsRegisterOpen(!isRegisterOpen)} className="text-sm px-4">
                    Register <FaChevronDown className="ml-2 inline" size={12}/>
                  </Button>
                  {isRegisterOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link to="/register/marriage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsRegisterOpen(false)}>For Marriage</Link>
                      <Link to="/register/dating" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsRegisterOpen(false)}>For Dating</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 right-0 bg-white shadow-lg p-4">
          <nav className="flex flex-col space-y-4 text-gray-700">
            <NavLinks isMobile />
            <div className="border-t pt-4 space-y-4">
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
                     <img src={user.photoUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                     <span className="font-semibold text-gray-800">My Profile</span>
                  </Link>
                  <Button variant="secondary" onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full">Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="link" className="w-full !justify-start !text-[#007bff] text-base p-0">Login</Button>
                  </Link>
                  <Link to="/register/marriage" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                     <Button className="w-full">Register</Button>
                  </Link>
                </>
              )}
            </div>
             {/* Mobile Mode Toggle */}
            <div className="flex items-center justify-center bg-gray-200 rounded-full p-1 mt-4 sm:hidden">
                <button onClick={() => setMode(ProfileMode.Marriage)} className={`px-3 py-1 text-sm rounded-full ${mode === ProfileMode.Marriage ? 'bg-white shadow' : 'text-gray-600'}`}>Marriage</button>
                <button onClick={() => setMode(ProfileMode.Dating)} className={`px-3 py-1 text-sm rounded-full ${mode === ProfileMode.Dating ? 'bg-white shadow' : 'text-gray-600'}`}>Dating</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;