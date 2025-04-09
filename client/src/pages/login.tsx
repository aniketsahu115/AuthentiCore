import { LoginForm } from "@/components/auth/login-form";
import BrandLogo from "@/components/ui/brand-logo";

export default function Login() {
  console.log("Login page rendered");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-lg mx-auto mb-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center">
            <BrandLogo size={80} animated variant="filled" />
            <h2 className="text-3xl font-bold text-primary mt-2">AuthentiCore</h2>
          </div>
          <p className="text-muted-foreground mt-2">
            The blockchain-based product authentication platform
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}