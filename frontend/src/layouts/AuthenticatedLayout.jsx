import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const AuthenticatedLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout; 