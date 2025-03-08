'use client';
import React, { useState } from 'react';
import ScrambleText from '@/hooks/ScrambleText';
import Link from 'next/link';
import styles from '@/components/header/Header.module.scss';
import { Afacad } from 'next/font/google';

const afacad = Afacad({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const menuItems = [
  { text: 'TOP', hoverText: 'Welcome', src: '/' },
  { text: 'WORKS', hoverText: 'Works', src: '/#works' },
  { text: 'ABOUT', hoverText: 'About', src: '/#about' },
  { text: 'CONTACT', hoverText: 'Contact', src: '/#contact' },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    // スマホならリンククリック後にメニューを閉じて、無駄に表示し続けることを防ぐ
    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header>
        <div className={`${styles.nav_area}  ${menuOpen ? styles.active : ''}`}>

          <button 
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className={styles.hamburger}
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>

          <nav className={`${styles.nav} ${afacad.className}`}>
            {menuItems.map((item, index) => (
              <Link key={index} href={item.src} onClick={handleLinkClick}>
                <ScrambleText text={item.text} hoverText={item.hoverText} />
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};
