import { useState } from "react";
import { Link } from "wouter";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";
import ConnectButton from "@/components/wallet/connect-button";
import Logo from "@/components/ui/logo";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center justify-center">
                <Logo size={42} animated={true} textColor={theme === "dark" ? "white" : "#4b5563"} />
              </div>
              <span className="ml-2 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 group-hover:from-primary group-hover:to-primary/70 transition-all duration-300">
                AuthentiCore
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/verify" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
              Verify Product
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
              For Manufacturers
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-400"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Wallet Connect Button */}
            <ConnectButton />

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex items-center mt-4 ml-3">
                  <Logo size={32} animated={false} textColor={theme === "dark" ? "white" : "#4b5563"} />
                  <span className="ml-2 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    AuthentiCore
                  </span>
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link 
                    href="/" 
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/verify" 
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Verify Product
                  </Link>
                  <Link 
                    href="/register" 
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    For Manufacturers
                  </Link>
                  <Link 
                    href="/about" 
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
