
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card p-10 text-center max-w-md mx-auto animate-scale-in">
        <div className="text-6xl font-bold mb-4">404</div>
        <h1 className="text-2xl font-semibold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl inline-block font-medium hover-scale"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
