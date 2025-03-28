import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { User, UserRoles, PermissionType } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<User | null>;
  register: (userData: RegisterData) => Promise<User | null>;
  logout: () => void;
  hasPermission: (permission: PermissionType) => boolean;
  isAdmin: boolean;
  isManufacturer: boolean;
  isDistributor: boolean;
  isRetailer: boolean;
  isConsumer: boolean;
}

interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  role: string;
  walletAddress?: string;
}

interface LoginData {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await apiRequest<User>("/api/auth/me", {
          method: "GET",
        });
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        // Silent error - user is not logged in
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      return apiRequest<User>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data) => {
      setUser(data);
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.username}!`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      return apiRequest<User>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data) => {
      setUser(data);
      toast({
        title: "Registration successful",
        description: `Welcome to AuthentiCore, ${data.username}!`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
    },
  });

  // Login function
  const login = async (username: string, password: string): Promise<User | null> => {
    try {
      const userData = await loginMutation.mutateAsync({ username, password });
      return userData;
    } catch (error) {
      return null;
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<User | null> => {
    try {
      const user = await registerMutation.mutateAsync(userData);
      return user;
    } catch (error) {
      return null;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiRequest("/api/auth/logout", {
        method: "POST",
      });
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not log out",
        variant: "destructive",
      });
    }
  };

  // Check if user has permission
  const hasPermission = (permission: PermissionType): boolean => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  // Role-based checks
  const isAdmin = user?.role === UserRoles.ADMIN;
  const isManufacturer = user?.role === UserRoles.MANUFACTURER;
  const isDistributor = user?.role === UserRoles.DISTRIBUTOR;
  const isRetailer = user?.role === UserRoles.RETAILER;
  const isConsumer = user?.role === UserRoles.CONSUMER;

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    hasPermission,
    isAdmin,
    isManufacturer,
    isDistributor,
    isRetailer,
    isConsumer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}