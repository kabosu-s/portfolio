import { Metadata } from 'next';
import Link from 'next/link';
import { Afacad } from 'next/font/google';
import styles from '@/app/style/page.module.scss';
const afacad = Afacad({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
import { notFound } from 'next/navigation';
import { Articles } from '@/types/types';

import Pagination from '@/components/pagination/Pagination';

interface PageProps {
  params: Promise<{
    page: string;
  }>;
}

//kurocoのAPI読み込み
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/blogs?pageID=1`);
  const data: Articles = await res.json();

  return Array.from({ length: data.pageInfo.totalPageCnt }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function BlogListPage({ params }: PageProps) {
  const resolvedParams = await params;
  const currentPage = Number(resolvedParams.page);

  if (isNaN(currentPage) || currentPage < 1) notFound();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/blogs?pageID=${currentPage}`, { next: { revalidate: 60 } });

  if (!res.ok) notFound();

  const data: Articles = await res.json();

  return (
    <>
      <section className={styles.mv_wrapper}>
        <h2 className={`${afacad.className} ${styles.title}`}>
          BL<span>O</span>G
        </h2>
        <div className="container mx-auto py-10 px-4">
          <div className={`${styles.card_wrap}`}>
            {data.list.map((item) => (
              <div className={`${styles.embla__slide}`} key={item.topics_id}>
                <article className={`${styles.card}`}>
                <Link href={`/blog/${item.topics_id}`}> 
                    <div className={`${afacad.className} ${styles.embla__slide__number}`}>Case {item.topics_id}</div>
                    <h3>{item.subject}</h3>
                    <div>
                      <p className={`${styles.row}`}>
                        <span>Date</span>
                        {new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(item.update_ymdhi))}
                      </p>
                      <p className={`${styles.row}`}>
                        <span>Category</span> {item.contents_type_nm}
                      </p>
                    </div>
                  </Link>
                </article>
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={data.pageInfo.totalPageCnt} basePath="/blog/page" />
        </div>
      </section>
    </>
  );
}
