
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Shield, 
  ShieldAlert, 
  ShieldX, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Lock,
  AlertOctagon,
  Timer,
  Hash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export type RiskLevel = 'safe' | 'suspicious' | 'dangerous';

export interface URLAnalysisResult {
  url: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0-100
  findings: {
    title: string;
    description: string;
    status: 'positive' | 'warning' | 'negative';
    iconType?: 'lock' | 'alert-octagon' | 'hash' | 'timer';
    icon?: React.ReactNode;
  }[];
  scannedAt: Date;
}

interface URLAnalysisProps {
  result: URLAnalysisResult | null;
}

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const colors = {
    safe: "bg-safe text-safe-foreground",
    suspicious: "bg-warning text-warning-foreground",
    dangerous: "bg-danger text-danger-foreground"
  };
  
  const icons = {
    safe: <Shield className="h-4 w-4 mr-1" />,
    suspicious: <ShieldAlert className="h-4 w-4 mr-1" />,
    dangerous: <ShieldX className="h-4 w-4 mr-1" />
  };
  
  const labels = {
    safe: "Safe",
    suspicious: "Suspicious",
    dangerous: "Dangerous"
  };

  return (
    <Badge className={`${colors[level]} px-2 py-1`}>
      {icons[level]}
      {labels[level]}
    </Badge>
  );
};

const URLAnalysis: React.FC<URLAnalysisProps> = ({ result }) => {
  if (!result) return null;

  const getScoreColor = (score: number) => {
    if (score <= 30) return 'bg-safe';
    if (score <= 70) return 'bg-warning';
    return 'bg-danger';
  };

  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case 'safe':
        return <Shield className="h-12 w-12 text-safe" />;
      case 'suspicious':
        return <ShieldAlert className="h-12 w-12 text-warning" />;
      case 'dangerous':
        return <ShieldX className="h-12 w-12 text-danger" />;
    }
  };
  
  const getStatusIcon = (status: 'positive' | 'warning' | 'negative') => {
    switch (status) {
      case 'positive':
        return <CheckCircle2 className="h-5 w-5 text-safe" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'negative':
        return <XCircle className="h-5 w-5 text-danger" />;
    }
  };

  const getIconByType = (iconType?: string) => {
    if (!iconType) return null;
    
    switch (iconType) {
      case 'lock':
        return <Lock className="h-5 w-5 text-safe" />;
      case 'alert-octagon':
        return <AlertOctagon className="h-5 w-5 text-danger" />;
      case 'hash':
        return <Hash className="h-5 w-5 text-danger" />;
      case 'timer':
        return <Timer className="h-5 w-5 text-warning" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>URL Analysis Result</CardTitle>
            <CardDescription>
              Scanned {result.scannedAt.toLocaleString()}
            </CardDescription>
          </div>
          <RiskBadge level={result.riskLevel} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          {getRiskIcon(result.riskLevel)}
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Risk Score</span>
              <span className="text-sm font-medium">{result.riskScore}/100</span>
            </div>
            <Progress value={result.riskScore} className={`h-2 ${getScoreColor(result.riskScore)}`} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Detected URL</h3>
          <div className="flex items-center gap-2 p-2 bg-muted rounded-md break-all">
            <ExternalLink className="h-4 w-4 flex-shrink-0" />
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} 
              className="text-sm font-mono hover:underline"
            >
              {result.url}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Security Findings</h3>
          <ul className="space-y-3">
            {result.findings.map((finding, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                <div className="mt-0.5">
                  {finding.icon || (finding.iconType ? getIconByType(finding.iconType) : getStatusIcon(finding.status))}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{finding.title}</h4>
                  <p className="text-sm text-muted-foreground">{finding.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-3 pt-2">
        <Button variant="outline">Scan Another</Button>
        <Button>View Detailed Report</Button>
      </CardFooter>
    </Card>
  );
};

export default URLAnalysis;
