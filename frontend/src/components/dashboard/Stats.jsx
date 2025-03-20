
import React from 'react';
import Card from './Card';
import { 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  ShoppingCart 
} from "lucide-react";

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 animate-fade-in">
      <Card 
        title="Total Revenue" 
        value="$45,231.89" 
        icon={<DollarSign size={18} />}
        trend={{ value: 12.8, positive: true }}
      />
      <Card 
        title="New Customers" 
        value="2,842" 
        icon={<Users size={18} />}
        trend={{ value: 5.3, positive: true }}
      />
      <Card 
        title="Active Sessions" 
        value="1,249" 
        icon={<ArrowUpRight size={18} />}
        trend={{ value: 2.1, positive: true }}
      />
      <Card 
        title="Pending Orders" 
        value="48" 
        icon={<ShoppingCart size={18} />}
        trend={{ value: 3.7, positive: false }}
      />
    </div>
  );
};

export default Stats;
