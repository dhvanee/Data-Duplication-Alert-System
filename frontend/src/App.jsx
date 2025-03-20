import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import Navigation from "./components/Navigation";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-50">
                <Navigation />
                <main className="page-container">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/data" element={<DataManagement />} />
                    <Route path="/duplicates" element={<DataDuplication />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
