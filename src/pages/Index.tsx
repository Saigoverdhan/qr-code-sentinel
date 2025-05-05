import React, { useRef, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import QRCodeScanner from '@/components/QRCodeScanner';
import URLAnalysis, { URLAnalysisResult } from '@/components/URLAnalysis';
import InfoSection from '@/components/InfoSection';
import { analyzeUrl } from '@/lib/url-analyzer';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<URLAnalysisResult | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleQRCodeScanned = (url: string) => {
    setIsScanning(true);
    
    // Simulate an API call delay
    setTimeout(() => {
      try {
        const result = analyzeUrl(url);
        setAnalysisResult(result);
        
        // Show toast based on result
        if (result.riskLevel === 'safe') {
          toast({
            title: "QR Code is safe",
            description: "This URL appears to be safe to visit.",
            variant: "default",
          });
        } else if (result.riskLevel === 'suspicious') {
          toast({
            title: "Suspicious QR Code detected",
            description: "This URL has some suspicious characteristics. Proceed with caution.",
            variant: "default",
          });
        } else {
          toast({
            title: "Potentially dangerous QR Code",
            description: "This URL has characteristics common to phishing sites. We recommend not visiting it.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Analysis failed",
          description: "We couldn't analyze this QR code. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsScanning(false);
      }
    }, 2000);
  };

  const handleGetStarted = () => {
    if (scannerRef.current) {
      scannerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero onGetStarted={handleGetStarted} />
        
        <section className="py-16" ref={scannerRef}>
          <div className="container px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-2">Scan Your QR Code</h2>
              <p className="text-muted-foreground">
                Upload a QR code image to check if it's safe before you scan it with your phone
              </p>
            </div>
            
            <QRCodeScanner onQRCodeScanned={handleQRCodeScanned} isScanning={isScanning} />
            
            {analysisResult && (
              <div className="mt-12">
                <URLAnalysis result={analysisResult} />
              </div>
            )}
          </div>
        </section>
        
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
