
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  MessageSquare,
  FileText,
  Wallet,
  HelpCircle,
  LogOut
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false,
  onClick
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full mb-2 hover-scale",
              active 
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <Icon size={22} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-sidebar-accent text-sidebar-foreground border border-sidebar-border">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = ({ className }) => {
  return (
    <div className={cn(
      "flex flex-col items-center py-6 h-full bg-sidebar glass-card border-r border-border",
      className
    )}>
      <div className="mb-10 w-12 h-12 rounded-full bg-sidebar-primary flex items-center justify-center">
        <span className="text-white font-bold text-xl">A</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
        <SidebarItem icon={BarChart3} label="Analytics" />
        <SidebarItem icon={Users} label="Customers" />
        <SidebarItem icon={Wallet} label="Finance" />
        <SidebarItem icon={MessageSquare} label="Messages" />
        <SidebarItem icon={FileText} label="Documents" />
        <SidebarItem icon={Settings} label="Settings" />
      </div>
      
      <div className="mt-auto flex flex-col items-center">
        <SidebarItem icon={HelpCircle} label="Help" />
        <SidebarItem icon={LogOut} label="Logout" />
      </div>
    </div>
  );
};

export default Sidebar;
