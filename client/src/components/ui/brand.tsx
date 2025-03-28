import React from "react";
import BrandLogo from "@/components/ui/brand-logo";

interface BrandProps {
  logoSize?: number;
  fontSize?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  variant?: "default" | "outline" | "filled";
  textColor?: string;
  dark?: boolean;
}

const Brand: React.FC<BrandProps> = ({
  logoSize = 42,
  fontSize = "xl",
  animated = true,
  variant = "default",
  textColor,
  dark
}) => {
  const fontSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-xl sm:text-2xl"
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    return dark ? "white" : "#4b5563";
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center">
        <BrandLogo
          size={logoSize}
          animated={animated}
          variant={variant}
          textColor={getTextColor()}
        />
      </div>
      <span className={`ml-3 ${fontSizeClasses[fontSize]} font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 hover:from-primary hover:to-primary/70`}>
        AuthentiCore
      </span>
    </div>
  );
};

export default Brand;