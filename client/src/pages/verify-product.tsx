import { useState } from "react";
import VerificationForm from "@/components/product/verification-form";
import Product3DModel from "@/components/product/product-3d-model";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Box, Shield } from "lucide-react";

export default function VerifyProduct() {
  const [verificationResult, setVerificationResult] = useState<'authentic' | 'counterfeit' | null>(null);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  
  // Demo function to simulate verification result
  const handleVerificationDemo = (productId: string) => {
    setVerificationInProgress(true);
    setVerificationResult(null);
    
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, set result based on product ID
      // In a real app, this would be the result of an API call
      if (productId.includes("auth") || productId.includes("real") || productId.length > 10) {
        setVerificationResult('authentic');
      } else {
        setVerificationResult('counterfeit');
      }
      setVerificationInProgress(false);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="py-16">
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
          
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="id" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="id" className="flex items-center justify-center gap-2">
                  <Box className="w-4 h-4" />
                  <span>Product ID</span>
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center justify-center gap-2">
                  <QrCode className="w-4 h-4" />
                  <span>Scan QR Code</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="id" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
                    <VerificationForm onVerify={handleVerificationDemo} simplified={false} />
                  </div>
                  
                  {verificationResult && (
                    <motion.div 
                      className={`mt-4 p-4 rounded-lg flex items-center ${
                        verificationResult === 'authentic' 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Shield className="w-5 h-5 mr-3" />
                      <span className="font-medium">
                        {verificationResult === 'authentic' 
                          ? 'Product verified as authentic' 
                          : 'Warning: This appears to be a counterfeit product'}
                      </span>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex justify-center">
                  <Product3DModel 
                    isAuthentic={verificationResult === 'authentic'}
                    showVerificationState={verificationResult !== null}
                    size="lg"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="qr" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-2">
                  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
                    <div className="text-center">
                      <QrCode className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h3 className="text-lg font-bold mb-2">Scan QR Code</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Point your camera at the product's QR code to verify its authenticity.
                      </p>
                      
                      <div className="aspect-video relative bg-black/5 dark:bg-white/5 rounded-lg mb-4">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          Camera feed would appear here
                        </div>
                      </div>
                      
                      <button 
                        className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90"
                        onClick={() => handleVerificationDemo("authentic-demo-product")}
                      >
                        {verificationInProgress ? "Scanning..." : "Start Scanning"}
                      </button>
                    </div>
                  </div>
                  
                  {verificationResult && (
                    <motion.div 
                      className={`mt-4 p-4 rounded-lg flex items-center ${
                        verificationResult === 'authentic' 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Shield className="w-5 h-5 mr-3" />
                      <span className="font-medium">
                        {verificationResult === 'authentic' 
                          ? 'Product verified as authentic' 
                          : 'Warning: This appears to be a counterfeit product'}
                      </span>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex justify-center lg:order-1">
                  <Product3DModel 
                    isAuthentic={verificationResult === 'authentic'}
                    showVerificationState={verificationResult !== null}
                    size="lg"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              Why Verify?
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Protect Yourself From Counterfeits
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Counterfeit products can be dangerous, ineffective, and harm legitimate businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Ensure Quality & Safety
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Authentic products meet safety standards and quality controls, protecting you and your family.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Support Genuine Businesses
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                When you buy authentic products, you support companies that invest in innovation and quality.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Full Transparency
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access the complete history and provenance of your products, verified on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
