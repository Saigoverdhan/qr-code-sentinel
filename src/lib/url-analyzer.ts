
import { URLAnalysisResult } from "@/components/URLAnalysis";

// This is a simple URL analyzer to detect potentially malicious URLs
// In a real application, this would be connected to actual ML models and security services

// Check if URL is using HTTPS
const hasHttps = (url: string): boolean => {
  return url.toLowerCase().startsWith("https://");
};

// Check if URL contains an IP address instead of domain
const containsIpAddress = (url: string): boolean => {
  const ipPattern = /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i;
  return ipPattern.test(url);
};

// Check for unusually long URLs (potential obfuscation)
const isExcessiveLength = (url: string): boolean => {
  return url.length > 100;
};

// Check for suspicious subdomains or multiple subdomains
const hasSuspiciousSubdomains = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const hostnameParts = urlObj.hostname.split(".");
    
    // Check for excessive subdomains
    if (hostnameParts.length > 3) return true;
    
    // Check for subdomains that mimic known brands but aren't their actual domain
    const suspiciousBrands = ["paypa1", "amaz0n", "g00gle", "faceb00k", "apple-id", "microsoft-verify"];
    return suspiciousBrands.some(brand => 
      urlObj.hostname.includes(brand) && !urlObj.hostname.endsWith(brand + ".com")
    );
  } catch {
    return true; // If URL parsing fails, consider it suspicious
  }
};

// Check for suspicious URL patterns
const hasSuspiciousPattern = (url: string): boolean => {
  const suspiciousPatterns = [
    /login/i, /signin/i, /verify/i, /account/i, /update/i, /confirm/i, 
    /secure/i, /auth/i, /credential/i, /password/i
  ];
  
  // Check if URL contains suspicious patterns and isn't from a well-known domain
  return suspiciousPatterns.some(pattern => pattern.test(url)) && 
    !isWellKnownDomain(url);
};

// Check if URL is from a well-known trusted domain
const isWellKnownDomain = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const trustedDomains = [
      "google.com", "apple.com", "microsoft.com", "amazon.com", 
      "facebook.com", "twitter.com", "instagram.com", "linkedin.com",
      "github.com", "reddit.com", "netflix.com", "spotify.com"
    ];
    
    return trustedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith("." + domain)
    );
  } catch {
    return false;
  }
};

// Check if URL uses URL shorteners
const isUrlShortener = (url: string): boolean => {
  const shorteners = [
    "bit.ly", "tinyurl.com", "goo.gl", "t.co", "is.gd", 
    "buff.ly", "rebrand.ly", "ow.ly", "tiny.cc", "cutt.ly"
  ];
  
  try {
    const urlObj = new URL(url);
    return shorteners.some(shortener => urlObj.hostname === shortener);
  } catch {
    return false;
  }
};

export const analyzeUrl = (url: string): URLAnalysisResult => {
  // Set of findings that we'll use to determine risk
  const findings = [];
  let riskScore = 0;
  
  // Check HTTPS
  if (hasHttps(url)) {
    findings.push({
      title: "Secure Connection",
      description: "The URL uses HTTPS for secure data transfer.",
      status: "positive",
      icon: <Lock className="h-5 w-5 text-safe" />
    });
  } else {
    findings.push({
      title: "Insecure Connection",
      description: "The URL doesn't use HTTPS, leaving data transfers potentially vulnerable.",
      status: "negative",
      icon: <AlertOctagon className="h-5 w-5 text-danger" />
    });
    riskScore += 25;
  }
  
  // Check for IP address instead of domain
  if (containsIpAddress(url)) {
    findings.push({
      title: "IP Address Detected",
      description: "The URL uses an IP address instead of a domain name, which is often associated with phishing.",
      status: "negative",
      icon: <Hash className="h-5 w-5 text-danger" />
    });
    riskScore += 30;
  }
  
  // Check URL length
  if (isExcessiveLength(url)) {
    findings.push({
      title: "Suspicious URL Length",
      description: "The URL is unusually long, which may indicate obfuscation attempts.",
      status: "warning"
    });
    riskScore += 15;
  }
  
  // Check for suspicious subdomains
  if (hasSuspiciousSubdomains(url)) {
    findings.push({
      title: "Suspicious Subdomain",
      description: "The URL contains unusual or suspicious subdomains that might be attempting to impersonate trusted sites.",
      status: "negative"
    });
    riskScore += 25;
  }
  
  // Check for well-known trusted domains
  if (isWellKnownDomain(url)) {
    findings.push({
      title: "Trusted Domain",
      description: "The URL belongs to a well-known and trusted domain.",
      status: "positive"
    });
    riskScore = Math.max(0, riskScore - 20);
  }
  
  // Check for URL shorteners
  if (isUrlShortener(url)) {
    findings.push({
      title: "URL Shortener Detected",
      description: "The URL uses a shortening service, which can disguise the actual destination.",
      status: "warning",
      icon: <Timer className="h-5 w-5 text-warning" />
    });
    riskScore += 15;
  }
  
  // Check for suspicious patterns
  if (hasSuspiciousPattern(url)) {
    findings.push({
      title: "Suspicious URL Pattern",
      description: "The URL contains patterns commonly associated with phishing attempts.",
      status: "negative"
    });
    riskScore += 20;
  }
  
  // Determine overall risk level
  let riskLevel: "safe" | "suspicious" | "dangerous";
  if (riskScore < 30) {
    riskLevel = "safe";
  } else if (riskScore < 70) {
    riskLevel = "suspicious";
  } else {
    riskLevel = "dangerous";
  }
  
  return {
    url,
    riskLevel,
    riskScore,
    findings,
    scannedAt: new Date()
  };
};
