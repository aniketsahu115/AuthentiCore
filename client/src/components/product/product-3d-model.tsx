import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Box, CheckCircle, AlertTriangle } from "lucide-react";

type ModelSize = "sm" | "md" | "lg";

interface Product3DModelProps {
  isAuthentic?: boolean;
  showVerificationState?: boolean;
  autoRotate?: boolean;
  size?: ModelSize;
}

export default function Product3DModel({
  isAuthentic = true,
  showVerificationState = false,
  autoRotate = true,
  size = "md"
}: Product3DModelProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Size dimensions based on prop
  const dimensions: Record<string, { container: string; cube: string }> = {
    sm: { container: "h-32 w-32", cube: "w-16 h-16" },
    md: { container: "h-64 w-64", cube: "w-32 h-32" },
    lg: { container: "h-96 w-96", cube: "w-48 h-48" }
  };

  // Auto-rotate effect
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x,
        y: prev.y + 0.5
      }));
    }, 30);
    
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  // Mouse/touch event handlers for rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPos({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setStartPos({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - startPos.x;
    const deltaY = e.touches[0].clientY - startPos.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setStartPos({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`relative ${dimensions[size].container} perspective-800 mx-auto
        select-none cursor-grab ${isDragging ? 'cursor-grabbing' : ''}
        touch-none`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute inset-0 flex items-center justify-center transform-style-3d"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        {/* Cube */}
        <div className={`relative ${dimensions[size].cube} transform-style-3d`}>
          {/* Front */}
          <div
            className={`absolute inset-0 flex items-center justify-center
              ${isAuthentic ? 'bg-primary/80' : 'bg-red-500/80'} 
              backdrop-blur text-white font-bold border-2 border-white/20`}
            style={{
              transform: 'translateZ(calc(var(--cube-size) / 2))',
              width: '100%',
              height: '100%'
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <Box className="w-8 h-8" />
              <span className="text-xs mt-1">FRONT</span>
            </div>
          </div>
          
          {/* Back */}
          <div
            className={`absolute inset-0 flex items-center justify-center
              ${isAuthentic ? 'bg-primary/80' : 'bg-red-500/80'} 
              backdrop-blur text-white font-bold border-2 border-white/20`}
            style={{
              transform: 'translateZ(calc(var(--cube-size) / -2)) rotateY(180deg)',
              width: '100%',
              height: '100%'
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <Box className="w-8 h-8" />
              <span className="text-xs mt-1">BACK</span>
            </div>
          </div>
          
          {/* Left */}
          <div
            className={`absolute inset-0 flex items-center justify-center
              ${isAuthentic ? 'bg-primary/80' : 'bg-red-500/80'} 
              backdrop-blur text-white font-bold border-2 border-white/20`}
            style={{
              transform: 'translateX(calc(var(--cube-size) / -2)) rotateY(-90deg)',
              width: '100%',
              height: '100%'
            }}
          >
            <div className="flex flex-col items-center justify-center">
              {showVerificationState && (
                isAuthentic ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-yellow-300" />
                )
              )}
              {!showVerificationState && (
                <>
                  <Box className="w-8 h-8" />
                  <span className="text-xs mt-1">LEFT</span>
                </>
              )}
            </div>
          </div>
          
          {/* Right */}
          <div
            className={`absolute inset-0 flex items-center justify-center
              ${isAuthentic ? 'bg-primary/80' : 'bg-red-500/80'} 
              backdrop-blur text-white font-bold border-2 border-white/20`}
            style={{
              transform: 'translateX(calc(var(--cube-size) / 2)) rotateY(90deg)',
              width: '100%',
              height: '100%'
            }}
          >
            <div className="flex flex-col items-center justify-center">
              {showVerificationState ? (
                <div className="text-center">
                  <div className="text-sm font-bold mb-1">
                    {isAuthentic ? 'AUTHENTIC' : 'COUNTERFEIT'}
                  </div>
                  <div className="text-xs opacity-80">
                    {isAuthentic ? 'Verified on chain' : 'Not registered'}
                  </div>
                </div>
              ) : (
                <>
                  <Box className="w-8 h-8" />
                  <span className="text-xs mt-1">RIGHT</span>
                </>
              )}
            </div>
          </div>
          
          {/* Top */}
          <div
            className={`absolute inset-0 flex items-center justify-center
              ${isAuthentic ? 'bg-primary/80' : 'bg-red-500/80'} 
              backdrop-blur text-white font-bold border-2 border-white/20`}
            style={{
              transform: 'translateY(calc(var(--cube-size) / -2)) rotateX(90deg)',
              width: '100%',
              height: '100%'
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <Box className="w-8 h-8" />
              <span className="text-xs mt-1">TOP</span>
            </div>
          </div>
          
          {/* Bottom */}
          <div
            className={`absolute inset-0 flex items-center justify-center
              ${isAuthentic ? 'bg-primary/80' : 'bg-red-500/80'} 
              backdrop-blur text-white font-bold border-2 border-white/20`}
            style={{
              transform: 'translateY(calc(var(--cube-size) / 2)) rotateX(-90deg)',
              width: '100%',
              height: '100%'
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <Box className="w-8 h-8" />
              <span className="text-xs mt-1">BOTTOM</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-500 mt-2">
        Drag to rotate
      </div>
      
      {/* Verification Status */}
      {showVerificationState && (
        <motion.div 
          className={`absolute top-0 left-0 right-0 py-1 text-center text-xs text-white
            ${isAuthentic ? 'bg-green-500' : 'bg-red-500'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {isAuthentic ? 'AUTHENTIC PRODUCT' : 'COUNTERFEIT DETECTED'}
        </motion.div>
      )}
    </div>
  );
}