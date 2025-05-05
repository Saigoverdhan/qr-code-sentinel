
import React from 'react';
import { 
  CircleAlert, 
  ShieldCheck, 
  LinkIcon, 
  QrCode,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const InfoSection: React.FC = () => {
  const items = [
    {
      title: "QR Code Phishing",
      description: "Cybercriminals use malicious QR codes to direct users to fake websites designed to steal personal information.",
      icon: <CircleAlert className="h-6 w-6 text-danger" />,
      stat: "5-10%",
      statLabel: "of QR scans in phishing campaigns are malicious"
    },
    {
      title: "Verification",
      description: "Our tool analyzes QR codes in real-time to detect suspicious patterns and potential phishing attempts.",
      icon: <ShieldCheck className="h-6 w-6 text-safe" />,
      stat: "20+",
      statLabel: "security checks performed on each QR code"
    },
    {
      title: "URL Analysis",
      description: "We evaluate domain age, URL structure, suspicious patterns, and cross-reference with known threats.",
      icon: <LinkIcon className="h-6 w-6 text-primary" />,
      stat: "99%",
      statLabel: "accuracy in identifying malicious links"
    }
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Yourself From QR Code Threats</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With the rise in QR code usage, cybercriminals are exploiting this technology to lead users to malicious websites. Stay safe with our QR Code Sentinel.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">{item.stat}</span>
                  <span className="text-sm text-muted-foreground">{item.statLabel}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <QrCode className="h-4 w-4" />
            <p>How to stay safe when using QR codes</p>
          </div>
          <ul className="max-w-2xl mx-auto text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <div className="mt-1 flex-shrink-0">•</div>
              <p>Always verify the URL before entering personal information</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 flex-shrink-0">•</div>
              <p>Use QR code scanners with security features</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 flex-shrink-0">•</div>
              <p>Be cautious of QR codes in public spaces that might have been tampered with</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 flex-shrink-0">•</div>
              <p>Look for visual signs of tampering like stickers placed over original codes</p>
            </li>
          </ul>

          <a 
            href="https://www.ftc.gov/business-guidance/blog/2022/10/qr-codes-url-shorteners-top-ways-cyber-scammers-get-you-click" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary mt-4 hover:underline"
          >
            Learn more about QR code safety
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
