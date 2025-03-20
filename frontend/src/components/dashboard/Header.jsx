import React from 'react';
import { cn } from './lib/utils'; // Corrected import path
import { Search, Bell, ChevronDown } from "lucide-react";

const Header = ({ className }) => {
  return (
    <header className={cn("glass-card border-b border-border h-16 flex items-center justify-between px-6", className)}>
      <div className="font-medium text-lg">Welcome back, Alex</div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            className="bg-background/60 border border-border rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 w-56"
            placeholder="Search..." 
          />
        </div>
        
        <button className="relative bg-background/60 hover:bg-background/80 p-2 rounded-full flex items-center justify-center">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 bg-destructive text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>
        
        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
            <span className="text-white font-medium text-sm">A</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Header;
