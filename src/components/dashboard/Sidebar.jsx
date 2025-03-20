import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  path,
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
              "flex items-center justify-center w-12 h-12 rounded-full mb-2 hover-scale transition-all duration-200",
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
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // TODO: Implement logout logic here
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: Wallet, label: "Finance", path: "/finance" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: FileText, label: "Documents", path: "/documents" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className={cn(
      "flex flex-col items-center py-6 h-full bg-sidebar glass-card border-r border-border",
      className
    )}>
      <div 
        className="mb-10 w-12 h-12 rounded-full bg-sidebar-primary flex items-center justify-center cursor-pointer hover-scale"
        onClick={() => navigate('/dashboard')}
      >
        <span className="text-white font-bold text-xl">D</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={isActive(item.path)}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
      
      <div className="mt-auto flex flex-col items-center">
        <SidebarItem
          icon={HelpCircle}
          label="Help"
          onClick={() => navigate('/help')}
          active={isActive('/help')}
        />
        <SidebarItem
          icon={LogOut}
          label="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Sidebar;
