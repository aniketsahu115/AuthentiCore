import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Factory, Package, QrCode, Truck, Store, 
  Smartphone, CheckCircle, ArrowRight, Shield
} from "lucide-react";

type FlowStep = {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  animation?: string;
};

export default function AuthenticationFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const steps: FlowStep[] = [
    {
      id: 1,
      icon: Factory,
      title: "Manufacturing",
      description: "Product is created with unique identifiers and embedded security features",
      color: "bg-blue-500",
      animation: "manufacturing"
    },
    {
      id: 2,
      icon: QrCode,
      title: "Blockchain Registration",
      description: "Product details are registered on the Solana blockchain with a tamper-proof record",
      color: "bg-violet-600",
      animation: "blockchain"
    },
    {
      id: 3,
      icon: Package,
      title: "Smart Packaging",
      description: "QR codes and NFC tags are embedded into product packaging",
      color: "bg-purple-500",
      animation: "packaging"
    },
    {
      id: 4,
      icon: Truck,
      title: "Secured Distribution",
      description: "Supply chain verification at every checkpoint with immutable tracking",
      color: "bg-indigo-500",
      animation: "distribution"
    },
    {
      id: 5,
      icon: Store,
      title: "Retail Authentication",
      description: "Stores verify products before displaying them to consumers",
      color: "bg-pink-500",
      animation: "retail"
    },
    {
      id: 6,
      icon: Smartphone,
      title: "Consumer Verification",
      description: "Consumers scan product to instantly verify authenticity",
      color: "bg-red-500",
      animation: "consumer"
    },
    {
      id: 7,
      icon: CheckCircle,
      title: "Ownership Transfer",
      description: "Authenticated ownership is recorded on the blockchain",
      color: "bg-green-600",
      animation: "ownership"
    }
  ];

  // Auto-advance through steps
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  // Pause auto-play on user interaction
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 15 seconds of inactivity
    const timeout = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 15000);
    
    return () => clearTimeout(timeout);
  };

  const renderAnimation = (animationName: string | undefined) => {
    // Simple placeholder animations
    switch (animationName) {
      case 'manufacturing':
        return (
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <motion.div 
              className="absolute w-16 h-16 bg-blue-500 rounded-md"
              initial={{ x: -50, y: 50, opacity: 0 }}
              animate={{ 
                x: [50, 100, 150, 200, 250],
                y: [50, 50, 50, 50, 50],
                opacity: [0, 1, 1, 1, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            <motion.div 
              className="absolute bottom-4 left-4 right-4 h-10 bg-gray-300 dark:bg-gray-700 rounded-md"
              initial={{ width: 0 }}
              animate={{ width: "calc(100% - 2rem)" }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
        );
        
      case 'blockchain':
        return (
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-12 h-12 bg-violet-500 rounded-md flex items-center justify-center text-white font-mono text-xs"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1, 1, 1, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 2
                  }}
                >
                  {i}
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="absolute inset-0 border-2 border-violet-400 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0.8, 1, 1.1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        );
        
      case 'packaging':
        return (
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <motion.div 
              className="w-32 h-32 border-2 border-purple-500 rounded-md flex items-center justify-center"
              animate={{ 
                rotateY: [0, 180, 360],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <QrCode className="w-16 h-16 text-purple-500" />
            </motion.div>
            <motion.div 
              className="absolute top-6 right-6 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Shield className="w-6 h-6" />
            </motion.div>
          </div>
        );
        
      case 'distribution':
        return (
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute bottom-8 left-0 right-0 h-2 bg-indigo-200 dark:bg-indigo-900"></div>
            <motion.div 
              className="absolute bottom-6 w-20 h-14"
              initial={{ x: -50 }}
              animate={{ 
                x: [0, 350],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Truck className="w-full h-full text-indigo-500" />
            </motion.div>
            
            <motion.div 
              className="absolute top-6 left-4 p-2 bg-white dark:bg-gray-700 rounded shadow-md"
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [0, -10, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1
              }}
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
            </motion.div>
            
            <motion.div 
              className="absolute top-6 right-4 p-2 bg-white dark:bg-gray-700 rounded shadow-md"
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [0, -10, -10, 0],
              }}
              transition={{ 
                duration: 2,
                delay: 2,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1
              }}
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
            </motion.div>
          </div>
        );
        
      case 'retail':
        return (
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-pink-200 dark:bg-pink-900 flex justify-around items-end px-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="w-12 h-16 bg-white dark:bg-gray-700 rounded-t-md shadow-md flex items-center justify-center"
                  initial={{ y: 16 }}
                  animate={{ 
                    y: [16, 0, 0, 16],
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 2
                  }}
                >
                  <Package className="w-8 h-8 text-pink-500" />
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="absolute top-6 left-1/2 transform -translate-x-1/2 p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Store className="w-8 h-8 text-pink-500" />
            </motion.div>
          </div>
        );
        
      case 'consumer':
        return (
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
              <motion.div 
                className="mr-6 relative"
                animate={{ 
                  rotateZ: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Smartphone className="w-12 h-12 text-red-500" />
                <motion.div 
                  className="absolute -right-4 top-0 w-4 h-4 bg-red-500 rounded-full"
                  animate={{ 
                    opacity: [0, 1, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </motion.div>
              
              <motion.div 
                className="w-3 h-1 bg-red-400 rounded-full"
                animate={{ 
                  width: [3, 20, 3],
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
              
              <motion.div 
                className="ml-6 relative"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Package className="w-12 h-12 text-red-500" />
                <motion.div 
                  className="absolute -top-2 -right-2 bg-white dark:bg-gray-700 rounded-full p-1 shadow"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1, 1, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1
                  }}
                >
                  <QrCode className="w-4 h-4 text-red-500" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        );
        
      case 'ownership':
        return (
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <motion.div 
              className="absolute top-8 left-1/3 transform -translate-x-1/2 p-2 bg-white dark:bg-gray-700 rounded-lg shadow"
              animate={{ 
                x: ["-33%", 0],
                opacity: [0, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 2
              }}
            >
              <Package className="w-8 h-8 text-green-500" />
            </motion.div>
            
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </motion.div>
            
            <motion.div 
              className="absolute top-8 right-1/3 transform translate-x-1/2 p-2 bg-white dark:bg-gray-700 rounded-lg shadow"
              animate={{ 
                x: ["50%", 0],
                opacity: [0, 1],
              }}
              transition={{ 
                duration: 2,
                delay: 2,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 2
              }}
            >
              <Smartphone className="w-8 h-8 text-green-500" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"
              animate={{ 
                y: [10, 0],
                opacity: [0, 1],
                scale: [0.8, 1],
              }}
              transition={{ 
                duration: 1,
                delay: 3,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 3
              }}
            >
              <Shield className="w-10 h-10 text-green-600" />
            </motion.div>
          </div>
        );
        
      default:
        return (
          <div className="h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <motion.div 
              className="w-20 h-20 border-4 border-primary rounded-full border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        );
    }
  };
  
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Product Authentication Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the complete journey of how products are authenticated from creation to consumer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Steps Navigation */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Authentication Process</h3>
            
            <div className="space-y-1">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors flex items-center gap-3
                    ${index === activeStep 
                      ? `${step.color} text-white` 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`
                  }
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    ${index === activeStep ? 'bg-white bg-opacity-20' : step.color}`
                  }>
                    {(() => {
                      const Icon = step.icon;
                      return <Icon size={18} className={index === activeStep ? 'text-white' : 'text-white'} />;
                    })()}
                  </div>
                  <span className="font-medium">{step.title}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex items-center justify-between text-sm">
              <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-primary hover:text-primary-dark"
              >
                {isAutoPlaying ? 'Pause Animation' : 'Auto Play'}
              </button>
              
              <span className="text-gray-500">
                Step {activeStep + 1} of {steps.length}
              </span>
            </div>
          </div>
          
          {/* Animation and Description */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {/* Animation Display */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {renderAnimation(steps[activeStep].animation)}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Step Description */}
              <div className={`p-6 ${steps[activeStep].color} text-white`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                  >
                    <h3 className="text-xl font-bold">{steps[activeStep].title}</h3>
                    <p>{steps[activeStep].description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Step Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeStep ? "w-6 bg-primary" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => handleStepClick(index)}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}