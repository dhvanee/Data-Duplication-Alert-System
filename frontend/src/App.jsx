import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.jsx";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PrivateRoute from "./components/private-routes.jsx";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const FilesPage = lazy(() => import("./pages/FilesPage.jsx"));
const UploadPage = lazy(() => import("./pages/UploadPage.jsx"));
const HistoryPage = lazy(() => import("./pages/HistoryPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFoundPage.jsx"));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">The application encountered an unexpected error.</p>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        
        <Route path="/">
          {() => (
            <Layout>
              <PrivateRoute component={HomePage} />
            </Layout>
          )}
        </Route>
        
        <Route path="/files">
          {() => (
            <Layout>
              <PrivateRoute component={FilesPage} />
            </Layout>
          )}
        </Route>
        
        <Route path="/upload">
          {() => (
            <Layout>
              <PrivateRoute component={UploadPage} />
            </Layout>
          )}
        </Route>
        
        <Route path="/history">
          {() => (
            <Layout>
              <PrivateRoute component={HistoryPage} />
            </Layout>
          )}
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;