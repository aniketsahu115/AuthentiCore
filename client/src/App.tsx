import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/context/theme-context";
import { WalletProvider } from "@/context/wallet-context";
import { AuthProvider } from "@/context/auth-context";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import VerifyProduct from "@/pages/verify-product";
import RegisterProduct from "@/pages/register-product";
import About from "@/pages/about";
import ProductDetails from "@/pages/product-details";
import Documentation from "@/pages/documentation";
import Support from "@/pages/support";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Unauthorized from "@/pages/unauthorized";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verify" component={VerifyProduct} />
      <Route path="/register-product" component={RegisterProduct} />
      <Route path="/about" component={About} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/support" component={Support} />
      <Route path="/product/:productId" component={ProductDetails} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/unauthorized" component={Unauthorized} />
      {/* This is a catch-all route for 404s */}
      <Route path="/:rest*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WalletProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </WalletProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
