"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const Header = () => {
  return (
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md transition-colors">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tighter hover:opacity-70 transition-opacity" lang="en">
            SharpTree.Labo
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link href="/snippets" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Snippets</Link>
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full text-xs font-bold hover:scale-105 transition-transform active:scale-95"
            >
              Contact
            </Link>          </nav>
        </div>
      </header>
  );
};