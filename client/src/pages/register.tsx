import { RegisterForm } from "@/components/auth/register-form";
import BrandLogo from "@/components/ui/brand-logo";
import Brand from "@/components/ui/brand";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-lg mx-auto mb-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <BrandLogo size={60} animated variant="filled" />
          </div>
          <Brand fontSize="xl" animated textColor="text-primary" />
          <p className="text-muted-foreground mt-2">
            Join the blockchain-based product authentication ecosystem
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}