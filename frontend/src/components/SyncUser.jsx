import React from 'react';
import { useAuth } from '../hooks/use-auth';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

const SyncUser = () => {
  const { user, logoutMutation } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">
        Welcome, {user.username}
      </span>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => logoutMutation.mutate()}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default SyncUser;
