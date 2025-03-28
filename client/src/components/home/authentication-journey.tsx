import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Package, Factory, Truck, ShoppingBag, CheckCircle, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface JourneyStep {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

export default function AuthenticationJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: JourneyStep[] = [
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Product is created with a unique identifier linked to the blockchain",
      color: "bg-blue-500"
    },
    {
      icon: Package,
      title: "Registration",
      description: "Manufacturer registers the product on AuthentiCore with detailed information",
      color: "bg-indigo-500"
    },
    {
      icon: Box,
      title: "QR Generation",
      description: "Unique QR code is generated and attached to the product",
      color: "bg-purple-500"
    },
    {
      icon: Truck,
      title: "Distribution",
      description: "Product moves through the supply chain with verification at each step",
      color: "bg-pink-500"
    },
    {
      icon: ShoppingBag,
      title: "Retail",
      description: "Retailers verify authenticity before selling to consumers",
      color: "bg-red-500"
    },
    {
      icon: Smartphone,
      title: "Consumer Verification",
      description: "Consumer scans QR code to verify product authenticity",
      color: "bg-orange-500"
    },
    {
      icon: CheckCircle,
      title: "Confirmation",
      description: "Blockchain verification confirms product is genuine",
      color: "bg-green-500"
    }
  ];

  // Auto-advance through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Follow the journey of an authentic product from manufacturing to verification
          </p>
        </div>

        {/* Journey Visualization */}
        <div className="max-w-5xl mx-auto">
          {/* Step Timeline */}
          <div className="relative mb-8">
            <div className="absolute h-1 w-full bg-gray-200 dark:bg-gray-700 top-1/2 transform -translate-y-1/2 rounded-full"></div>
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <motion.div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center z-10 
                    ${index === currentStep ? step.color : "bg-gray-300 dark:bg-gray-600"}`}
                    animate={{
                      scale: index === currentStep ? [1, 1.2, 1] : 1
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                  >
                    {index < currentStep && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div 
                      className={`absolute h-1 left-3 top-1/2 transform -translate-y-1/2 rounded-full z-0
                      ${index < currentStep ? step.color : "bg-gray-200 dark:bg-gray-700"}`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: index < currentStep ? "100%" : "0%"
                      }}
                      style={{ width: "calc(100vw / 8)" }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Display */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-t-4" style={{ borderTopColor: steps[currentStep].color.replace('bg-', '#').replace('-500', '') }}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className={`p-4 rounded-full ${steps[currentStep].color} text-white`}>
                    {(() => {
                      const Icon = steps[currentStep].icon;
                      return <Icon size={28} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {steps[currentStep].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {steps[currentStep].description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Journey Step Selector */}
          <div className="flex justify-center mt-8 gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => setCurrentStep(index)}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}