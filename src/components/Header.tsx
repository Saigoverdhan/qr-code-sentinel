
import React from 'react';
import Logo from './Logo';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Logo size="md" />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm">About</Button>
          <Button variant="ghost" size="sm">Docs</Button>
          <Button variant="outline" size="sm">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
