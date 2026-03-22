import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store';
import { FileText, Layout, User, BarChart3, LogOut } from 'lucide-react';
import { supabase } from '../supabase';
import axios from 'axios';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navLinks = [
    { name: 'ATS Checker', path: '/ats', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Build Resume', path: '/builder', icon: <FileText className="w-4 h-4" /> },
    { name: 'Portfolio', path: '/portfolio', icon: <Layout className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <FileText className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight gradient-text">ResumeMaker</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center space-x-1 font-medium transition-colors ${
              location.pathname === link.path ? 'text-primary-600' : 'text-gray-600 hover:text-primary-500'
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                try {
                  await axios.post('http://localhost:5001/api/auth/logout');
                } catch (e) {
                  console.error('Logout error:', e);
                }
                logout();
              }}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary py-2 px-5">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
