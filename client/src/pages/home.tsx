import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";
import FeaturesSection from "@/components/home/features-section";
import TrustSection from "@/components/home/trust-section";
import Testimonials from "@/components/home/testimonials";
import VerificationForm from "@/components/product/verification-form";
import AuthenticationFlow from "@/components/home/authentication-flow";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <AuthenticationFlow />
      
      <section id="verification" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Product Verification</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Verify Authenticity Instantly
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Enter a product ID or scan a QR code to check if your product is authentic.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <VerificationForm />
          </div>
        </div>
      </section>
      
      <TrustSection />
      <Testimonials />
      
      <section className="py-16 bg-gradient-to-br from-primary/90 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">
            Ready to secure your products?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join hundreds of brands using AuthentiCore to protect their products and customers from counterfeiting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/register"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Register Products
            </a>
            <a
              href="/about"
              className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
