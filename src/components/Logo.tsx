
import React from 'react';
import { Shield, QrCode } from 'lucide-react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: { container: "h-8", text: "text-lg", icon: 16 },
    md: { container: "h-10", text: "text-xl", icon: 20 },
    lg: { container: "h-14", text: "text-3xl", icon: 28 },
  };

  return (
    <div className={`flex items-center gap-2 ${sizes[size].container}`}>
      <div className="relative">
        <Shield className={`text-primary w-${sizes[size].icon} h-${sizes[size].icon}`} />
        <QrCode className={`absolute text-secondary w-${Math.floor(sizes[size].icon * 0.6)} h-${Math.floor(sizes[size].icon * 0.6)} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
      </div>
      <span className={`font-bold ${sizes[size].text}`}>
        <span className="gradient-text">QR Code Sentinel</span>
      </span>
    </div>
  );
};

export default Logo;
