import { Afacad } from 'next/font/google';
import styles from '@/app/style/page.module.scss';
const afacad = Afacad({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  return (
    <>
      <section className={styles.mv_wrapper}>
        <h2 className={`${afacad.className} ${styles.title}`}>
          AB<span>O</span>UT
        </h2>
        <div className="container mx-auto py-10 px-4">
        <div className="mr-0 ml-auto space-y-8 max-w-2xl">
          <div className={styles.about_column}>
            <hgroup className="mb-10">
              <h3 className="text-4xl font-bold mb-2">Nao Saki</h3>
              <span className="text-sm">なお さき</span>
            </hgroup>
            <p>
              Webデザイナーおよびフロントエンドエンジニア。デザインと技術の両面から、直感的で使いやすいWebサイトやアプリケーションの提供を心がけています。最近では、アクセシビリティに配慮したコーディングにも力を入れています。
            </p>
          </div>
          <div className={styles.about_column}>
            <h3 className="font-bold">略歴</h3>
            <p>
            2007年アミューズメント企業のデザイン事業部、店舗内装、広告物や販促物制作担当。2015年にWebデザイナーに転身（現職）デザインからコーディング、フロントエンド側の開発などを担当
            </p>
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

    </>
  );
}
