import type { Metadata } from 'next';
import { Noto_Sans_JP, Afacad } from 'next/font/google';
import '@/app/style/sanitize.css';
import '@/app/style/globals.scss';
import CustomCursor from '@/app/_components/cursor/CustomCursor';
import { Header } from '@/app/_components/header/Header';

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
        <Header />
        <main>
          {children}
        </main>
        <footer>
          <small>@Since 2024.</small>
        </footer>
        <CustomCursor />
      </body>
    </html>
  );
}
