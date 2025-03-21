import React from 'react';
import { Outlet } from 'react-router-dom';
import NonAuthenticatedNavigation from '../components/NonAuthenticatedNavigation';

const NonAuthenticatedLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <NonAuthenticatedNavigation />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default NonAuthenticatedLayout; 