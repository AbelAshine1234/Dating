
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/ui/Logo';
import { FaTachometerAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout: React.FC = () => {
  const { adminLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };
  
  const navLinkClasses = "flex items-center px-4 py-2 text-gray-100 rounded-md hover:bg-red-700";
  const activeLinkClasses = "bg-red-700";

  return (
    <div className="flex h-screen bg-gray-200">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <Logo />
          <span className="text-sm text-gray-400 block ml-8">Admin Panel</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}
          >
            <FaTachometerAlt className="mr-3" /> Dashboard
          </NavLink>
          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}
          >
            <FaUsers className="mr-3" /> Users
          </NavLink>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className={navLinkClasses}>
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
