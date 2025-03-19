import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.jsx";
import NotFound from "./pages/NotFoundPage.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import FilesPage from "./pages/FilesPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import PrivateRoute from "./components/private-routes.jsx";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/" component={() => (
        <Layout>
          <PrivateRoute component={HomePage} />
        </Layout>
      )} />
      <Route path="/files" component={() => (
        <Layout>
          <PrivateRoute component={FilesPage} />
        </Layout>
      )} />
      <Route path="/upload" component={() => (
        <Layout>
          <PrivateRoute component={UploadPage} />
        </Layout>
      )} />
      <Route path="/history" component={() => (
        <Layout>
          <PrivateRoute component={HistoryPage} />
        </Layout>
      )} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;