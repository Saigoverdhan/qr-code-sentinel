
import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, PasteClipboard, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface QRCodeScannerProps {
  onQRCodeScanned: (url: string) => void;
  isScanning: boolean;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onQRCodeScanned, isScanning }) => {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Function to extract URL from QR Code (placeholder - would use an actual library in production)
  const simulateQRCodeScan = (image: string): string => {
    // This is a placeholder - in a real app, use a QR code library
    // For demo purposes, we'll return fake URLs with different risk levels
    const urls = [
      "https://legitimate-bank.com/login",
      "https://amaz0n.phishing-site.com/login?account=verify",
      "http://192.168.1.1/admin.php?id=123456789",
      "https://google.com",
      "https://bit.ly/3xR4n2Z"
    ];
    
    // Return a random URL from our test list
    return urls[Math.floor(Math.random() * urls.length)];
  };

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.includes('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file containing a QR code",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      setImagePreview(imageDataUrl);
      
      // In real implementation, we'd use a QR code scanning library here
      // For demo, we're using a placeholder function
      setTimeout(() => {
        try {
          const url = simulateQRCodeScan(imageDataUrl);
          onQRCodeScanned(url);
        } catch (error) {
          toast({
            title: "Failed to scan QR code",
            description: "We couldn't detect a valid QR code in your image. Please try again with a clearer image.",
            variant: "destructive",
          });
        }
      }, 1500); // Simulate processing time
    };
    reader.readAsDataURL(file);
  }, [onQRCodeScanned, toast]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            const blob = await clipboardItem.getType(type);
            const file = new File([blob], "pasted-image.png", { type });
            handleFileUpload(file);
            return;
          }
        }
      }
      
      toast({
        title: "No image in clipboard",
        description: "Please copy an image to your clipboard first",
        variant: "destructive",
      });
    } catch (err) {
      toast({
        title: "Clipboard access denied",
        description: "Please allow clipboard access or try uploading an image instead",
        variant: "destructive",
      });
    }
  };

  // This would be implemented with a real QR code scanner library in production
  const handleCameraScan = () => {
    toast({
      title: "Camera functionality",
      description: "In a production app, this would open your device camera to scan a QR code",
      variant: "default",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="paste">
            <PasteClipboard className="w-4 h-4 mr-2" />
            Paste
          </TabsTrigger>
          <TabsTrigger value="camera">
            <Camera className="w-4 h-4 mr-2" />
            Camera
          </TabsTrigger>
        </TabsList>

        <CardContent className="p-6">
          {/* Upload tab */}
          <TabsContent value="upload" className="mt-0">
            <div className="flex flex-col items-center justify-center">
              <div 
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img src={imagePreview} alt="QR Code" className="w-full h-full object-contain p-4" />
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-full h-1 bg-secondary/70 animate-scanning"></div>
                        <ScanLine className="w-12 h-12 text-secondary animate-pulse" />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 5MB)</p>
                  </>
                )}
              </div>
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileInputChange}
              />
            </div>
          </TabsContent>

          {/* Paste tab */}
          <TabsContent value="paste" className="mt-0">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg bg-muted/30">
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img src={imagePreview} alt="QR Code" className="w-full h-full object-contain p-4" />
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-full h-1 bg-secondary/70 animate-scanning"></div>
                        <ScanLine className="w-12 h-12 text-secondary animate-pulse" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <PasteClipboard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="mb-4 text-sm text-muted-foreground">Paste an image from clipboard</p>
                    <Button onClick={handlePaste}>Paste from Clipboard</Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Camera tab */}
          <TabsContent value="camera" className="mt-0">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg bg-muted/30">
                <Camera className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="mb-4 text-sm text-muted-foreground">Use your device camera to scan a QR code</p>
                <Button onClick={handleCameraScan}>Start Camera</Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default QRCodeScanner;
