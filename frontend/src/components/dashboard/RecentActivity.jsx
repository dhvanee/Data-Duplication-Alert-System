import React from 'react';
import { cn } from './lib/utils'; // Corrected import path
import { 
  User, ShoppingCart, Download, CreditCard, 
  ArrowUpRight, AlertCircle, CheckCircle
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'user',
    title: 'New Customer',
    description: 'John Smith signed up',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'order',
    title: 'New Order #1233',
    description: 'iPhone 15 Pro (1)',
    time: '15 minutes ago',
    status: 'pending'
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Received',
    description: '$1,299.00 from Invoice #8542',
    time: '42 minutes ago',
    status: 'completed'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Storage Almost Full',
    description: '90% of cloud storage used',
    time: '1 hour ago',
  },
  {
    id: 5,
    type: 'download',
    title: 'Report Generated',
    description: 'Monthly Sales Report',
    time: '3 hours ago',
  },
  {
    id: 6,
    type: 'success',
    title: 'System Update',
    description: 'Successfully updated to v2.4.0',
    time: '5 hours ago',
  },
];

const getIconByType = (type) => {
  switch (type) {
    case 'user': return <User size={16} />;
    case 'order': return <ShoppingCart size={16} />;
    case 'download': return <Download size={16} />;
    case 'payment': return <CreditCard size={16} />;
    case 'alert': return <AlertCircle size={16} />;
    case 'success': return <CheckCircle size={16} />;
    default: return <ArrowUpRight size={16} />;
  }
};

const getIconColorByType = (type) => {
  switch (type) {
    case 'user': return 'bg-blue-100 text-blue-600';
    case 'order': return 'bg-purple-100 text-purple-600';
    case 'download': return 'bg-indigo-100 text-indigo-600';
    case 'payment': return 'bg-green-100 text-green-600';
    case 'alert': return 'bg-amber-100 text-amber-600';
    case 'success': return 'bg-teal-100 text-teal-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-amber-100 text-amber-700';
    case 'completed': return 'bg-green-100 text-green-700';
    case 'failed': return 'bg-red-100 text-red-700';
    default: return '';
  }
};

const RecentActivity = () => {
  return (
    <div className="glass-card p-6 rounded-xl h-full animate-blur-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>
      
      <div className="space-y-5 max-h-[460px] overflow-y-auto subtle-scroll pr-1">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-start hover:bg-background/40 p-2 rounded-lg transition-colors"
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5",
              getIconColorByType(activity.type)
            )}>
              {getIconByType(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium truncate">{activity.title}</h4>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              
              {activity.status && (
                <span className={cn(
                  "mt-1.5 inline-block text-xs px-2 py-0.5 rounded-full",
                  getStatusColor(activity.status)
                )}>
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
