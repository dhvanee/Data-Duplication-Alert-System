import React from 'react';
import { cn } from './lib/utils'; // Corrected import path

const Card = ({ 
  className,
  title,
  value,
  icon,
  trend,
  children
}) => {
  return (
    <div 
      className={cn(
        "glass-card p-5 rounded-xl hover-scale",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold">{value}</div>
          
          {trend && (
            <div className={cn(
              "flex items-center text-xs mt-1",
              trend.positive ? "text-green-500" : "text-red-500"
            )}>
              <span className="mr-1">
                {trend.positive ? '↑' : '↓'}
              </span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default Card;
