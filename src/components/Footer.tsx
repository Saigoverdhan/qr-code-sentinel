
import React from 'react';
import Logo from './Logo';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground max-w-xs">
              QR Code Sentinel helps protect you from malicious QR codes and phishing attempts.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">API Reference</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest security updates and features.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
              />
              <button 
                className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} QR Code Sentinel. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
