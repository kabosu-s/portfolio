

import ContactForm from '@/components/form/ContactForm';
import EmblaCarousel from '@/components/cards/Cards';
import { Articles } from '@/types/types';

import styles from '@/app/style/page.module.scss';
import { Afacad } from 'next/font/google';
const afacad = Afacad({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

//kurocoのAPI読み込み
async function fetchData(endpoint: string): Promise<Articles> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/${endpoint}`, {
      next: { revalidate: 6000 }, // ISR的なキャッシュ設定（任意）
    });
    if (!res.ok) {
      throw new Error(`fetchはできた/APIrequestが失敗: ${res.status} ${res.statusText}`);
    }
    const data: Articles = await res.json();
    return data;
  } catch (error) {
    console.error('fetchが失敗しました', error);
    return { list: [] };
  }
}

export default async function Home() {
  //kurocoAPIのパス
  const [blogs, works] = await Promise.all([
    fetchData('blogs'),
    fetchData('works'),
  ]);
  return (
    <>
      <section className={styles.mv_wrapper}>
        <h1 className={`${afacad.className} ${styles.title}`}>
          PORT
          <br />F<span>O</span>LIO
        </h1>
      </section>
      <section id="blog" className={styles.contents_wrapper}>
        <h2 className={`${afacad.className} ${styles.title}`}>BL<span>O</span>G</h2>
        <div className={styles.card_wrap}>
          {blogs.list.length > 0 ? (
            <EmblaCarousel items={{ list: blogs.list.slice(0, 5) }} type="blog" />
          ) : (
            <p className={styles.empty_message}>ブログ記事はまだありません。</p>
          )}
        </div>
      </section>
      <section id="works" className={styles.contents_wrapper}>
        <h2 className={`${afacad.className} ${styles.title}`}>
          W<span>O</span>RKS
        </h2>
        <div className={`${styles.card_wrap}`}>
        {works.list.length > 0 ? (
          <EmblaCarousel items={{ list: works.list.slice(0, 5) }} type="works" />
        ) : ( 
          <p className={styles.empty_message}>制作実績はまだありません。</p>
        )}</div>
      </section>
      <section id="about" className={styles.contents_wrapper}>
        <h2 className={`${afacad.className} ${styles.title}`}>
          AB<span>O</span>UT
        </h2>
        <div className="container mx-auto py-10 px-4">
        <div className="mr-0 ml-auto space-y-8 max-w-2xl">
          <div className={styles.about_column}>
            <hgroup className="mb-10">
              <h3 className="text-4xl font-bold mb-2">Sae</h3>
              <span className="text-sm">さえ</span>
            </hgroup>
            <p>
              Webデザイナーおよびフロントエンドエンジニア。デザインと技術の両面から、直感的で使いやすいWebサイトやアプリケーションの提供を心がけています。最近では、アクセシビリティに配慮したコーディングにも力を入れています。
            </p>
          </div>
          <div className={styles.about_column}>
            <h3 className="font-bold">略歴</h3>
            <p>2007年、店舗内装、広告物や販促物の制作を行う。2015年にWeb業界に転身し、デザインからコーディング、フロントエンド側の開発などを担当</p>
          </div>
          <div className={styles.about_column}>
            <h3 className="font-bold">Skill</h3>
            <p>Figma / Adobe XD / Adobe Photoshop / Adobe Illustrator / Adobe After Effects</p>
            <p>HTML / CSS / JavaScript / TypeScript / React / Next.js / Three.js</p>
            <p>Git / Docker</p>
            <p>WordPress / Kuroco / microCMS</p>
            <p>SEO / Google Analytics / Google Tag Manager</p>
          </div>
        </div>
        </div>
      </section>
      <section id="contact" className={styles.contents_wrapper}>
        <h2 className={`${afacad.className} ${styles.title}`}>
          C<span>O</span>NTACT
        </h2>
        <div className="container mx-auto py-10 px-4">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
