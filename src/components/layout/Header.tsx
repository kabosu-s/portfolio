"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const Header = () => {
  return (
      <header className="sticky top-0 z-50 w-full border-b-4 border-text bg-surface dark:bg-slate-900 transition-colors">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tighter hover:text-secondary transition-colors" lang="en">
            SharpTree.Labo
          </Link>
          <nav className="flex items-center gap-6 text-sm font-black text-text dark:text-surface">
            <Link href="/snippets" className="hover:text-secondary transition-colors">Snippets</Link>
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-4 py-2 bg-primary text-text border-2 border-text shadow-[2px_2px_0px_0px_rgba(28,41,60,1)] dark:shadow-[2px_2px_0px_0px_rgba(251,251,249,1)] font-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              Contact
            </Link>          </nav>
        </div>
      </header>
  );
};