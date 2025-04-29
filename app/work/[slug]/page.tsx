import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from '@/app/style/workspage.module.scss';

type Props = {
  params: Promise<{ slug: string }>;
};

//kurocoのAPI読み込み
export async function generateStaticParams() {
  const contents = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/3/works').then((res) => res.json());
  return contents.list.map((content: { topics_id: string }) => ({
    slug: `${content.topics_id}`,
  }));
}

async function getData(slug: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/3/work/${slug}`);
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function Page({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;
  const data = await getData(slug);
  return (
    <div className={`${styles.articlewrap}`}>
      <figure className={`${styles.mainvisual}`}>
        <Image src={`${data.details.icon.url}`} width={980} height={500} alt="" decoding="async" loading="lazy" />
      </figure>

      <h1 className={`${styles.title}`}>{data.details.subject}</h1>
      <div className={`${styles.main}`}>
        <span>Date</span>
        {new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(data.details.update_ymdhi))}
      </div>
    </div>
  );
}
