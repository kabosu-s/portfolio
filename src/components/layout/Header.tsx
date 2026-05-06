'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  return (
    <header className="sticky top-2 z-50 mb-16 max-w-6xl mx-auto border-4 m-auto p-1 bg-surface border-border-default shadow-large  transition-colors">
      <div className="mx-auto px-3 h-16 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center font-mono text-xl font-black tracking-tighter hover:text-secondary transition-colors" lang="en">
          <Image src="/logo.svg" alt="Sae" width={50} height={50} />
          .Labo
        </Link>
        <nav className="flex items-center gap-2 text-sm font-black text-text">
          <Link href="/snippets" className="hover:text-secondary transition-colors font-mono">
            Snippets
          </Link>
          <ThemeToggle />
          <Button href="/contact">Contact</Button>
        </nav>
      </div>
    </header>
  );
};
