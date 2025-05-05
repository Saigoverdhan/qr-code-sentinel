
import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Protect Against QR Code Phishing Threats
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Scan and analyze QR codes before you visit them. Detect malicious URLs and stay safe from QR phishing attacks.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-2" onClick={onGetStarted}>
                Scan QR Code Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn How It Works
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-safe" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-safe" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-safe" />
                <span>Privacy focused</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur-md opacity-50"></div>
              <div className="relative bg-card rounded-lg border overflow-hidden">
                <div className="flex h-[400px] items-center justify-center p-8">
                  <div className="flex flex-col items-center text-center gap-4">
                    <QrCodeDisplay />
                    <div>
                      <p className="text-base font-medium">Scan with your smartphone!</p>
                      <p className="text-sm text-muted-foreground">Then check if it's safe with our tool</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple QR code display component
const QrCodeDisplay: React.FC = () => {
  return (
    <div className="w-48 h-48 bg-white p-2 rounded-lg flex items-center justify-center relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary opacity-30 rounded-lg blur"></div>
      <div className="relative w-full h-full bg-white rounded-md flex items-center justify-center">
        <div className="grid grid-cols-6 grid-rows-6 w-4/5 h-4/5">
          {/* QR Code Corner Squares */}
          <div className="col-span-1 row-span-1 bg-black border-4 border-white m-1 rounded-sm"></div>
          <div className="col-span-1 row-span-1 col-start-6 bg-black border-4 border-white m-1 rounded-sm"></div>
          <div className="col-span-1 row-span-1 row-start-6 bg-black border-4 border-white m-1 rounded-sm"></div>
          
          {/* QR Code Inner Pattern - Simplified */}
          <div className="col-span-4 row-span-4 col-start-2 row-start-2 grid grid-cols-4 grid-rows-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`${Math.random() > 0.6 ? 'bg-black' : 'bg-white'}`}></div>
            ))}
          </div>
          
          {/* QR Code data pattern */}
          {Array.from({ length: 20 }).map((_, i) => {
            const col = Math.floor(Math.random() * 6) + 1;
            const row = Math.floor(Math.random() * 6) + 1;
            return (
              <div 
                key={`p-${i}`} 
                className="bg-black" 
                style={{ 
                  gridColumn: col, 
                  gridRow: row,
                  opacity: Math.random() > 0.2 ? 1 : 0 
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
