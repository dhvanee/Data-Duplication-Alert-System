import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useToast } from '../hooks/use-toast';

const Navigation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Duplicate Found',
      description: 'A new potential duplicate record has been detected.',
      status: 'unread',
      timestamp: '2 minutes ago',
      variant: 'warning'
    },
    {
      id: 2,
      title: 'System Update',
      description: 'System maintenance scheduled for tonight.',
      status: 'unread',
      timestamp: '1 hour ago',
      variant: 'info'
    },
    {
      id: 3,
      title: 'Import Complete',
      description: 'Successfully imported 100 new records.',
      status: 'unread',
      timestamp: '3 hours ago',
      variant: 'success'
    }
  ]);

  const isActive = (path) => location.pathname === path;

  const handleNotificationClick = () => {
    notifications.forEach(notification => {
      if (notification.status === 'unread') {
        toast({
          title: notification.title,
          description: notification.description,
          variant: notification.variant,
        });
      }
    });
    // Mark all as read
    setNotifications(notifications.map(n => ({ ...n, status: 'read' })));
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Data Management',
      path: '/data',
      icon: 'Database'
    },
    {
      label: 'Duplicate Detection',
      path: '/duplicates',
      icon: 'Copy'
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings'
    },
    {
      label: 'Help',
      path: '/help',
      icon: 'HelpCircle'
    }
  ];

  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">DDAS</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-blue-600">
            DDAS
          </Link>
          
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors',
                  isActive(item.path)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleNotificationClick}
            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            title={unreadCount > 0 ? `${unreadCount} unread notifications` : 'No new notifications'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          <Link to="/profile" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-700">John Anderson</div>
              <div className="text-gray-500 text-xs">Admin</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation; 