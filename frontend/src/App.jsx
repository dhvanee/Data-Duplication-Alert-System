import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import NonAuthenticatedLayout from "./layouts/NonAuthenticatedLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import DataManagement from "./pages/DataManagement";
import DataDuplication from "./pages/DataDuplication";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  // Always show navigation, but it will be conditionally rendered based on route
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Routes>
        {/* Non-authenticated routes */}
        <Route element={<NonAuthenticatedLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* Authenticated routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data" element={<DataManagement />} />
          <Route path="/duplicates" element={<DataDuplication />} />
          <Route path="/duplicates/:id" element={<DataDuplication />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
