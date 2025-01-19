import { Afacad } from 'next/font/google';
import styles from '@/app/style/page.module.scss';

import ContactForm from '@/app/_components/form/ContactForm';
import EmblaCarousel from '@/app/_components/cards/Cards';

const afacad = Afacad({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

async function getData(contents: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/3/' + contents);
  return res.json()
}

export default async function Home() {

const works = await getData('news');
  return (
    <>
      <section className={styles.mv_wrapper}>
        <h1 className={`${afacad.className} ${styles.title}`}>
          PORT
          <br />F<span>O</span>LIO
        </h1>
      </section>
      <section id="works" className={styles.contents_wrapper}>
        <h2 className={`${afacad.className} ${styles.title}`}>
          W<span>O</span>RKS
        </h2>
        <div className={`${styles.card_wrap}`}>
            {works.list.length ? <EmblaCarousel works={works} /> : ''}
        </div>
      </section>
      <section id="about" className={styles.contents_wrapper}>
        <h2 className={`${afacad.className} ${styles.title}`}>
          AB<span>O</span>UT
        </h2>
        <div className={styles.about_warp}>
        <div className={styles.about_column}>
        <hgroup>
          <h3>Name Sae</h3>
          <span>ふりがな</span>
          </hgroup>
          <p>Webデザイナーおよびフロントエンドエンジニア。デザインと技術の両面から、直感的で使いやすいWebサイトやアプリケーションの提供を心がけています。最近では、アクセシビリティに配慮したコーディングにも力を入れています。</p>
        </div>
        <div className={styles.about_column}>
          <h3>略歴</h3>
          <p>2007年アミューズメント企業（ネットカフェ・パーラー・飲食店経営）に入社<br/>デザイン事業部にて、店舗内装、広告物や販促物制作を担当<br/>2015年にWebデザイナーに転身（現職）デザインからコーディング、フロントエンド側の開発などを担当</p>
        </div>
        <div className={styles.about_column}>
          <h3>Skill</h3>
          <p>Figma / Adobe XD / Adobe Photoshop / Adobe Illustrator / Adobe After Effects</p>
          <p>HTML / CSS / JavaScript / TypeScript / React / Next.js / Three.js</p>
          <p>Git / Docker</p>
          <p>WordPress / Kuroco / microCMS</p>
          <p>SEO / Google Analytics / Google Tag Manager</p>
        </div>
        </div>
      </section>
      <section id="contact" className={styles.contents_wrapper}>
        <h2 className={`${afacad.className} ${styles.title}`}>
          C<span>O</span>NTACT
        </h2>
        <ContactForm />
      </section>
    </>
  );
}
