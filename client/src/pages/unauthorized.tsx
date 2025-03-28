import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">
          You don't have permission to access this page. Please contact your administrator 
          if you believe this is an error.
        </p>
        <div className="flex flex-col space-y-2 pt-4">
          <Button 
            variant="default" 
            onClick={() => setLocation("/")}
          >
            Return to Home
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setLocation("/login")}
          >
            Log in with a different account
          </Button>
        </div>
      </div>
    </div>
  );
}