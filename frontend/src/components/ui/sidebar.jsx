
import { Link, useLocation } from "wouter";
import { Home, Folder, Upload, History } from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();
  
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
      <nav className="space-y-2 p-4">
        <Link href="/">
          <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${location === '/' ? 'bg-accent' : 'hover:bg-accent/50'}`}>
            <Home className="h-5 w-5" />
            <span>Home</span>
          </div>
        </Link>
        <Link href="/files">
          <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${location === '/files' ? 'bg-accent' : 'hover:bg-accent/50'}`}>
            <Folder className="h-5 w-5" />
            <span>Files</span>
          </div>
        </Link>
        <Link href="/upload">
          <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${location === '/upload' ? 'bg-accent' : 'hover:bg-accent/50'}`}>
            <Upload className="h-5 w-5" />
            <span>Upload</span>
          </div>
        </Link>
        <Link href="/history">
          <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${location === '/history' ? 'bg-accent' : 'hover:bg-accent/50'}`}>
            <History className="h-5 w-5" />
            <span>History</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
}
