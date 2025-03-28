import { ReactNode } from "react";
import { useAuth } from "@/context/auth-context";
import { PermissionType, UserRole } from "@shared/schema";

interface PermissionGateProps {
  children: ReactNode;
  requiredPermission?: PermissionType;
  requiredRole?: UserRole;
  fallback?: ReactNode;
}

/**
 * Component for rendering content based on user permissions
 * 
 * @example
 * // Show content only to users with admin role
 * <PermissionGate requiredRole={UserRoles.ADMIN}>
 *   <AdminPanel />
 * </PermissionGate>
 * 
 * // Show content only to users with create_product permission
 * <PermissionGate requiredPermission={PermissionTypes.CREATE_PRODUCT}>
 *   <CreateProductButton />
 * </PermissionGate>
 */
export function PermissionGate({
  children,
  requiredPermission,
  requiredRole,
  fallback = null
}: PermissionGateProps) {
  const { isAuthenticated, user, hasPermission } = useAuth();

  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  // Check for required role
  if (requiredRole && user.role !== requiredRole) {
    return <>{fallback}</>;
  }

  // Check for required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  // If all checks pass, render the children
  return <>{children}</>;
}