import { Afacad } from 'next/font/google';
import styles from '@/app/style/page.module.scss';
import { Header } from '@/app/_components/header/Header';
const afacad = Afacad({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  return (
    <>
      <section className={styles.mv_wrapper}>
        <h1 className={`${afacad.className} ${styles.title}`}>
          WORKS
        </h1>
      </section>
    </>
  );
}
