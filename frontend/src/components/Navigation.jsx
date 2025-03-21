import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useToast } from '../hooks/use-toast';
import { 
  LayoutDashboard, 
  Database, 
  Copy, 
  Settings, 
  HelpCircle,
  Bell,
  User
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setShowNotifications(!showNotifications);
    
    if (!showNotifications) {
      notifications.forEach(notification => {
        if (notification.status === 'unread') {
          toast({
            title: notification.title,
            description: notification.description,
            variant: notification.variant,
          });
        }
      });
      setNotifications(notifications.map(n => ({ ...n, status: 'read' })));
    }
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      label: 'Data Management',
      path: '/data',
      icon: <Database className="w-5 h-5" />
    },
    {
      label: 'Duplicate Detection',
      path: '/duplicates',
      icon: <Copy className="w-5 h-5" />
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: <Settings className="w-5 h-5" />
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
        <nav className="flex-1 px-4 mt-6">
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
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={handleNotificationClick}
                className="relative p-3 bg-gray-50 hover:bg-blue-50 rounded-xl text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center gap-2 w-full"
                title={unreadCount > 0 ? `${unreadCount} unread notifications` : 'No new notifications'}
              >
                <Bell className="w-6 h-6" />
                <span className="text-sm font-medium">Notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="fixed left-64 bottom-[120px] w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-[100] max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="sticky top-0 p-3 border-b border-gray-100 bg-white">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={cn(
                            "p-3 hover:bg-gray-50 transition-colors cursor-pointer",
                            notification.status === 'unread' ? 'bg-blue-50/50' : ''
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "w-2 h-2 mt-2 rounded-full flex-shrink-0",
                              notification.variant === 'warning' ? 'bg-yellow-500' :
                              notification.variant === 'info' ? 'bg-blue-500' :
                              notification.variant === 'success' ? 'bg-green-500' : 'bg-gray-500'
                            )} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 break-words">{notification.title}</p>
                              <p className="text-xs text-gray-500 mt-1 break-words">{notification.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Link to="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors relative z-10">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-700">John Anderson</div>
              <div className="text-gray-500 text-xs">Admin</div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 