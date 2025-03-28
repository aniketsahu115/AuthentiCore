import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { z } from "zod";
import { useAuth } from "@/context/auth-context";
import { useWallet } from "@/context/wallet-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRoles } from "@shared/schema";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  companyName: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  phoneNumber: z.string().optional(),
  role: z.string().min(1, "Please select a role"),
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})
.refine(
  data => {
    // Require company name for manufacturer, distributor, and retailer roles
    if (
      (data.role === UserRoles.MANUFACTURER ||
       data.role === UserRoles.DISTRIBUTOR ||
       data.role === UserRoles.RETAILER) && 
       !data.companyName
    ) {
      return false;
    }
    return true;
  },
  {
    message: "Company name is required for this role",
    path: ["companyName"],
  }
);

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const { wallet, connectWallet } = useWallet();
  const [location, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      email: "",
      phoneNumber: "",
      role: UserRoles.CONSUMER,
    },
  });

  const selectedRole = watch("role");

  const needsCompanyName = 
    selectedRole === UserRoles.MANUFACTURER || 
    selectedRole === UserRoles.DISTRIBUTOR || 
    selectedRole === UserRoles.RETAILER;

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setIsLoading(true);
    try {
      // Add wallet address if connected
      const registerData = {
        ...data,
        walletAddress: wallet?.address || undefined
      };
      
      const user = await registerUser(registerData);
      if (user) {
        // Redirect based on role
        if (user.role === UserRoles.ADMIN) {
          setLocation("/admin/dashboard");
        } else if (user.role === UserRoles.MANUFACTURER) {
          setLocation("/manufacturer/dashboard");
        } else {
          setLocation("/dashboard");
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      setError("Failed to connect wallet");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Join AuthentiCore to access the blockchain-based product authentication platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="johndoe"
              {...register("username")}
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              onValueChange={(value) => setValue("role", value)} 
              defaultValue={UserRoles.CONSUMER}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRoles.MANUFACTURER}>Manufacturer</SelectItem>
                <SelectItem value={UserRoles.DISTRIBUTOR}>Distributor</SelectItem>
                <SelectItem value={UserRoles.RETAILER}>Retailer</SelectItem>
                <SelectItem value={UserRoles.CONSUMER}>Consumer</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {needsCompanyName && (
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Company Name"
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number (optional)</Label>
            <Input
              id="phoneNumber"
              placeholder="+1 (555) 123-4567"
              {...register("phoneNumber")}
              autoComplete="tel"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Wallet Address (optional)</Label>
            {wallet?.connected ? (
              <div className="flex items-center justify-between p-2 border rounded-md bg-muted/30">
                <span className="text-sm font-mono truncate flex-1">
                  {wallet.address}
                </span>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => wallet.disconnect()}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </Button>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setLocation("/login");
            }}
          >
            Log in
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}