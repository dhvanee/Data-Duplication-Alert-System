import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LogIn, UserPlus, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const NonAuthenticatedNavigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      label: 'Home',
      path: '/',
      icon: <Home className="w-5 h-5" />
    },
    {
      label: 'Sign In',
      path: '/sign-in',
      icon: <LogIn className="w-5 h-5" />
    },
    {
      label: 'Sign Up',
      path: '/sign-up',
      icon: <UserPlus className="w-5 h-5" />
    },
    {
      label: 'Help',
      path: '/help',
      icon: <HelpCircle className="w-5 h-5" />
    }
  ];

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link 
            to="/" 
            className="block text-4xl font-bold text-center"
          >
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text text-transparent">
              DDAS
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 mt-6">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-blue-900 to-blue-700 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900'
                )}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © 2024 DDAS. All rights reserved.
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NonAuthenticatedNavigation; 