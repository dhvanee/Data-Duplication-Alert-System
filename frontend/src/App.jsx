import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
<<<<<<< HEAD
import Navigation from './components/Navigation';
=======
import Layout from './components/Layout';
>>>>>>> 613ad7caadd552286172dfa29eed2c60d555e84f

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
<<<<<<< HEAD
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
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster />
      <Sonner />
=======
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected Routes */}
          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="/app/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="data-management" element={<DataManagement />} />
            <Route path="duplicates" element={<DataDuplication />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
>>>>>>> 613ad7caadd552286172dfa29eed2c60d555e84f
    </QueryClientProvider>
  );
};

export default App;
