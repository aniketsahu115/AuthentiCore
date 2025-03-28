import { ReactNode } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/context/auth-context";
import { PermissionType } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: PermissionType;
  requiredRole?: string;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredPermission,
  requiredRole,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, hasPermission } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Redirect to={redirectTo} />;
  }

  // Check for required role if specified
  if (requiredRole && user?.role !== requiredRole) {
    return <Redirect to="/unauthorized" />;
  }

  // Check for required permission if specified
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Redirect to="/unauthorized" />;
  }

  // If all checks pass, render the children
  return <>{children}</>;
}