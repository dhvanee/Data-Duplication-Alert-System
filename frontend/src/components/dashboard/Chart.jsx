import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from './lib/utils'; // Corrected import path

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 5000, expenses: 3800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
  { name: 'Aug', revenue: 4000, expenses: 2400 },
  { name: 'Sep', revenue: 3000, expenses: 1398 },
  { name: 'Oct', revenue: 5000, expenses: 3800 },
  { name: 'Nov', revenue: 2780, expenses: 3908 },
  { name: 'Dec', revenue: 1890, expenses: 4800 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-sm shadow-lg">
        <p className="font-medium text-base mb-2">{label}</p>
        <p className="text-[#8884d8] mb-1">
          Revenue: ${payload[0].value.toLocaleString()}
        </p>
        <p className="text-[#82ca9d]">
          Expenses: ${payload[1].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const timeRanges = ['1W', '1M', '3M', '6M', '1Y', 'All'];

const Chart = () => {
  const [selectedRange, setSelectedRange] = useState('1Y');

  return (
    <div className="glass-card p-6 rounded-xl mb-6 animate-slide-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Revenue Overview</h2>
        <div className="flex bg-background/60 rounded-full p-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={cn(
                "text-xs px-3 py-1 rounded-full transition-colors",
                selectedRange === range 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-background/80"
              )}
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
            <XAxis 
              dataKey="name" 
              tick={{fontSize: 12}} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`} 
              tick={{fontSize: 12}} 
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8884d8" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stroke="#82ca9d" 
              fillOpacity={1} 
              fill="url(#colorExpenses)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
