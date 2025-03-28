import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserRoles } from "@shared/schema";
import { 
  LogOut, 
  User, 
  Settings, 
  ShieldCheck, 
  Building2, 
  Truck, 
  Store, 
  UserCircle 
} from "lucide-react";
import { useLocation } from "wouter";
import { truncateAddress } from "@/lib/utils";

export function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setLocation("/login")}>
          Log in
        </Button>
        <Button onClick={() => setLocation("/register")}>Sign up</Button>
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    setLocation("/");
  };

  const getRoleIcon = () => {
    switch (user.role) {
      case UserRoles.ADMIN:
        return <ShieldCheck className="h-4 w-4 mr-2" />;
      case UserRoles.MANUFACTURER:
        return <Building2 className="h-4 w-4 mr-2" />;
      case UserRoles.DISTRIBUTOR:
        return <Truck className="h-4 w-4 mr-2" />;
      case UserRoles.RETAILER:
        return <Store className="h-4 w-4 mr-2" />;
      default:
        return <UserCircle className="h-4 w-4 mr-2" />;
    }
  };

  const getRoleDisplay = () => {
    switch (user.role) {
      case UserRoles.ADMIN:
        return "Administrator";
      case UserRoles.MANUFACTURER:
        return "Manufacturer";
      case UserRoles.DISTRIBUTOR:
        return "Distributor";
      case UserRoles.RETAILER:
        return "Retailer";
      case UserRoles.CONSUMER:
        return "Consumer";
      default:
        return "Guest";
    }
  };

  const getInitials = () => {
    return user.username.substring(0, 2).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={user.profileImageUrl || ""} alt={user.username} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          {getRoleIcon()}
          <span>{getRoleDisplay()}</span>
        </DropdownMenuItem>
        
        {user.walletAddress && (
          <DropdownMenuItem className="cursor-pointer">
            <svg 
              className="h-4 w-4 mr-2" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0 0 4h2v-4Z" />
            </svg>
            <span className="font-mono text-xs">
              {truncateAddress(user.walletAddress)}
            </span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => setLocation("/profile")}
        >
          <User className="h-4 w-4 mr-2" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        {(user.role === UserRoles.ADMIN || user.role === UserRoles.MANUFACTURER) && (
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => {
              const dashboardUrl = 
                user.role === UserRoles.ADMIN 
                  ? "/admin/dashboard"
                  : "/manufacturer/dashboard";
              setLocation(dashboardUrl);
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}