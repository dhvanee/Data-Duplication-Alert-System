import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center">
        {/* Main spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 border-8 border-blue-100 rounded-full animate-spin-slow"></div>
          {/* Middle ring */}
          <div className="absolute top-1 left-1 w-18 h-18 border-6 border-blue-300 border-t-transparent rounded-full animate-spin" 
               style={{ width: '4.5rem', height: '4.5rem' }}></div>
          {/* Inner ring */}
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
               style={{ animationDuration: '0.6s' }}></div>
        </div>
        
        {/* Loading text with gradient and pulse */}
        <div className="mt-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-lg font-bold animate-pulse">
          Loading...
        </div>
        
        {/* Optional subtle pulsing circle behind the spinner */}
        <div className="absolute -inset-4 bg-blue-50 rounded-full animate-pulse opacity-50"></div>
      </div>
    </div>
  );
};

export default Loading; 