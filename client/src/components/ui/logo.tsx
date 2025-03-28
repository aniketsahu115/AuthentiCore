import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
  variant?: "default" | "outline" | "filled";
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = 40,
  animated = false,
  variant = "default",
  textColor = "currentColor"
}) => {
  const uniqueId = React.useMemo(() => `blockchain-gradient-${Math.random().toString(36).substring(2, 9)}`, []);
  const pulseId = React.useMemo(() => `pulse-${Math.random().toString(36).substring(2, 9)}`, []);
  const nodeId = React.useMemo(() => `node-${Math.random().toString(36).substring(2, 9)}`, []);
  
  const getFill = () => {
    switch (variant) {
      case "outline":
        return "none";
      case "filled":
        return `url(#${uniqueId})`;
      default:
        return `url(#${uniqueId})`;
    }
  };
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? 'logo-animated' : ''}`}
      style={{
        "--gradient-start": "var(--primary)",
        "--gradient-end": "var(--primary-foreground)",
      } as React.CSSProperties}
    >
      {/* Animation definitions */}
      {animated && (
        <defs>
          <radialGradient
            id={pulseId}
            cx="0.5"
            cy="0.5"
            r="0.5"
            fx="0.5"
            fy="0.5"
          >
            <animate
              attributeName="fx"
              values="0.5;0.52;0.48;0.5"
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fy"
              values="0.5;0.48;0.52;0.5"
              dur="10s"
              repeatCount="indefinite"
            />
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.7">
              <animate
                attributeName="stopOpacity"
                values="0.7;0.9;0.7"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="95%" stopColor="var(--primary)" stopOpacity="0.2" />
          </radialGradient>
          
          <filter id={nodeId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>
      )}
      
      {/* Outer hexagon (blockchain block) */}
      <path
        d="M100 10L177.942 55V145L100 190L22.0577 145V55L100 10Z"
        fill={getFill()}
        stroke={variant === "filled" ? "none" : textColor}
        strokeWidth="4"
        className="logo-outer-hex"
      />
      
      {/* Pulse effect for animated version */}
      {animated && (
        <path
          d="M100 10L177.942 55V145L100 190L22.0577 145V55L100 10Z"
          fill={`url(#${pulseId})`}
          className="logo-pulse"
          opacity="0.3"
        />
      )}
      
      {/* Inner hexagons forming a pattern */}
      <path
        d="M100 40L147.942 67.5V122.5L100 150L52.0577 122.5V67.5L100 40Z"
        fill={variant === "outline" ? "none" : "rgba(255,255,255,0.1)"}
        stroke={textColor}
        strokeWidth="2"
        strokeDasharray="3 3"
        className="logo-inner-hex"
      />
      
      {/* Inner shield shape */}
      <path
        d="M100 60L135 80V125L100 145L65 125V80L100 60Z"
        fill={variant === "outline" ? "none" : "rgba(255,255,255,0.15)"}
        stroke={textColor}
        strokeWidth="2.5"
        className="logo-shield"
      />
      
      {/* AC letters - made larger and more centered */}
      <path
        d="M82 108L70 85H79L88 104L97 85H106L94 108H82Z"
        fill={textColor}
        className="logo-letter"
        style={{ fontWeight: 'bold' }}
      />
      <path
        d="M103 85C103 85 109 85 113 85C118 85 126 88 126 96.5C126 105 118 108 113 108H103V85ZM111 102C116 102 119 99 119 96.5C119 94 116 91 111 91H111V102H111Z"
        fill={textColor}
        className="logo-letter"
        style={{ fontWeight: 'bold' }}
      />
      
      {/* Connection lines */}
      {animated && (
        <>
          <line 
            x1="100" y1="10" 
            x2="177.942" y2="55" 
            stroke={textColor} 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            className="logo-line">
            <animate
              attributeName="strokeDashoffset"
              values="60;0;60"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
          <line 
            x1="177.942" y1="55" 
            x2="177.942" y2="145" 
            stroke={textColor} 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            className="logo-line">
            <animate
              attributeName="strokeDashoffset"
              values="90;30;90"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
          <line 
            x1="177.942" y1="145" 
            x2="100" y2="190" 
            stroke={textColor} 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            className="logo-line">
            <animate
              attributeName="strokeDashoffset"
              values="0;60;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
          <line 
            x1="100" y1="190" 
            x2="22.0577" y2="145" 
            stroke={textColor} 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            className="logo-line">
            <animate
              attributeName="strokeDashoffset"
              values="60;0;60"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
          <line 
            x1="22.0577" y1="145" 
            x2="22.0577" y2="55" 
            stroke={textColor} 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            className="logo-line">
            <animate
              attributeName="strokeDashoffset"
              values="0;90;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
          <line 
            x1="22.0577" y1="55" 
            x2="100" y2="10" 
            stroke={textColor} 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            className="logo-line">
            <animate
              attributeName="strokeDashoffset"
              values="60;0;60"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
        </>
      )}
      
      {/* Connection nodes */}
      <circle cx="100" cy="10" r="4" fill={textColor} className="logo-node" />
      <circle cx="177.942" cy="55" r="4" fill={textColor} className="logo-node" />
      <circle cx="177.942" cy="145" r="4" fill={textColor} className="logo-node" />
      <circle cx="100" cy="190" r="4" fill={textColor} className="logo-node" />
      <circle cx="22.0577" cy="145" r="4" fill={textColor} className="logo-node" />
      <circle cx="22.0577" cy="55" r="4" fill={textColor} className="logo-node" />
      
      {/* Glowing nodes for animated version */}
      {animated && (
        <>
          <circle cx="100" cy="10" r="6" fill="var(--primary)" filter={`url(#${nodeId})`} opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="177.942" cy="55" r="6" fill="var(--primary)" filter={`url(#${nodeId})`} opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="177.942" cy="145" r="6" fill="var(--primary)" filter={`url(#${nodeId})`} opacity="0.7">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="190" r="6" fill="var(--primary)" filter={`url(#${nodeId})`} opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.5;0.7" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="22.0577" cy="145" r="6" fill="var(--primary)" filter={`url(#${nodeId})`} opacity="0.7">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="22.0577" cy="55" r="6" fill="var(--primary)" filter={`url(#${nodeId})`} opacity="0.7">
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      
      {/* Gradient definition */}
      <defs>
        <linearGradient
          id={uniqueId}
          x1="25"
          y1="25"
          x2="175"
          y2="175"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;