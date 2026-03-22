import type { Metadata } from 'next';
import { Noto_Sans_JP, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sae | Frontend Engineer & Designer',
  description: 'ポートフォリオ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground bg-grid">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-300">
            <Header />
            <main
              className="max-w-4xl mx-auto px-6 py-12 font-sans 
                     text-slate-900 dark:text-slate-100 
                     selection:bg-cyan-100 dark:selection:bg-cyan-900/50"
            >
              {children}
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
