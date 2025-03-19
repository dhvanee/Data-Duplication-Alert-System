
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "./button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">File Manager</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <>
              <Avatar>
                <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
