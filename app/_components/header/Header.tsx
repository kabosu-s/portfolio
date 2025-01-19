'use client';
import React from 'react';
import ScrambleText from '@/app/_hooks/ScrambleText';
import Link from 'next/link';
import styles from '@/app/_components/header/Header.module.scss';
import { Afacad } from 'next/font/google';

const afacad = Afacad({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const menuItems = [
  { text: 'TOP', hoverText: 'Welcome', src: '/' },
  { text: 'WORKS', hoverText: 'Works', src: '/#works'},
  { text: 'ABOUT', hoverText: 'About', src: '/#about' },
  { text: 'CONTACT', hoverText: 'Contact', src: '/#contact' },
];


export const Header = () => {
  return (
    <>
        <div className={styles.nav_area}>
          <nav className={`${styles.nav} ${afacad.className}`}>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.src}>
            <ScrambleText text={item.text} hoverText={item.hoverText} />
            </Link>
              ))}
          </nav>
        </div>
    </>
  );
};
