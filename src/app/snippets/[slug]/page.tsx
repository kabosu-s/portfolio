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
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* ナビゲーション */}
        <nav className="mb-12">
          <Link 
            href="/snippets" 
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2"
          >
            <span>←</span> Back to Snippets
          </Link>
        </nav>

        <header className="mb-12">
          <time className="text-sm text-slate-500">{snippet.date}</time>
          <h1 className="text-4xl font-bold mt-2 text-slate-900 dark:text-slate-100">{snippet.title}</h1>
        </header>

        {/* 記事本文：proseクラスを当ててスタイリングを制御 */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <PostContent />
        </article>

        {/* フッター代わりの連絡導線 */}
        <footer className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            この記事に関する質問や、実装のご相談はこちらまで。
          </p>
          <Link 
            href="/" 
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            Topに戻って相談する →
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