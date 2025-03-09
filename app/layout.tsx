import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './style/globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import CustomCursor from '@/components/cursor/CustomCursor';
import { Header } from '@/components/header/Header';

const notosans = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PORT FOLIO',
  description: 'my portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notosans.className}>
        <GoogleTagManager gtmId="GTM-WMH56QF2" />
        <Header />
        <main>{children}</main>
        <footer>
          <small>@Since 2024.</small>
        </footer>
        <CustomCursor />
      </body>
    </html>
  );
}
