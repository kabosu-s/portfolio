// src/app/snippets/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getSnippetBySlug } from "@/lib/mdx";

// 1. 型定義：paramsはPromiseとして扱う（Next.js 15以降の標準）
interface Props {
  params: Promise<{ slug: string }>;
}

// 2. メタデータの動的生成（SEO対策）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const snippet = await getSnippetBySlug(slug);

  if (!snippet) {
    return { title: "Snippet Not Found" };
  }

  return {
    title: `${snippet.title} | Snippets - Sae`,
    description: snippet.description,
  };
}

export default async function SnippetDetailPage({ params }: Props) {
  const { slug } = await params;
  const snippet = await getSnippetBySlug(slug);

  if (!snippet) {
    notFound();
  }

  try {
    // 3. MDXファイルを動的にインポート
    const { default: PostContent } = await import(`@/content/snippets/${slug}.mdx`);

    return (
      <main className="max-w-4xl mx-auto py-12">
        <header className="mb-12">
          <Link 
            href="/snippets" 
            className="inline-flex items-center gap-2 text-sm font-black text-text hover:text-secondary transition-colors group mb-8"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span> Back to Snippets
          </Link>

          <div className="p-8 bg-primary border-4 border-text shadow-[8px_8px_0px_0px_rgba(28,41,60,1)] dark:shadow-[8px_8px_0px_0px_rgba(251,251,249,0.2)]">
            <time className="inline-block px-3 py-1 bg-secondary text-surface text-xs font-black uppercase tracking-widest border-2 border-text mb-4">
              {snippet.date}
            </time>
            <h1 className="text-4xl md:text-5xl font-black mt-2 text-text uppercase leading-tight">
              {snippet.title}
            </h1>
          </div>
        </header>

        {/* 記事本文：proseクラスを当ててスタイリングを制御 */}
        <article className="p-8 md:p-12 border-4 border-text bg-surface dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(28,41,60,1)] dark:shadow-[8px_8px_0px_0px_rgba(251,251,249,0.1)] prose prose-slate dark:prose-invert max-w-none
          prose-h2:border-b-4 prose-h2:border-text prose-h2:pb-2 prose-h2:font-black prose-h2:uppercase
          prose-a:text-secondary prose-a:font-black prose-a:no-underline hover:prose-a:underline
          prose-pre:border-2 prose-pre:border-text prose-pre:rounded-none prose-pre:shadow-[4px_4px_0px_0px_rgba(28,41,60,1)]
        ">
          <PostContent />
        </article>

        {/* フッター代わりの連絡導線 */}
        <footer className="mt-16 flex justify-center">
          <Link 
            href="/contact" 
            className="px-8 py-4 bg-primary text-text border-4 border-text shadow-[6px_6px_0px_0px_rgba(28,41,60,1)] font-black text-xl uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(28,41,60,1)] transition-all"
          >
            Discuss this Snippet →
          </Link>
        </footer>
      </main>
    );
  } catch (error) {
    // 4. ファイルが見つからない（slugが不正）場合は404を表示
    console.error("MDX import error:", error);
    notFound();
  }
}
