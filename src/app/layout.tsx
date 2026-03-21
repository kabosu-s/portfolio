import type { Metadata } from 'next';
import { Noto_Sans_JP, Geist_Mono } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'], // 基本はlatinだがNext.jsが賢く日本語サブセット化してくれる
  variable: '--font-noto-sans-jp',
  display: 'swap', // 読み込み待ちによる空白を防ぐ
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
    <html lang="ja" className={`${notoSansJP.variable} ${geistMono.variable} h-full bg-white dark:bg-slate-950 antialiased`}>
      <body className="font-sans text-foreground bg-background dark:bg-transparent">
      {children}
      </body>
    </html>
  );
}
