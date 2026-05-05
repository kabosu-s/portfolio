import Link from "next/link";
import { getSnippets } from "@/lib/mdx";

export default async function SnippetsIndex() {
  const snippets = await getSnippets();

  return (
    <main className="max-w-4xl mx-auto py-12">
      <header className="mb-16 p-8 bg-primary border-4 border-text shadow-[8px_8px_0px_0px_rgba(28,41,60,1)] dark:shadow-[8px_8px_0px_0px_rgba(251,251,249,0.2)]">
        <h1 className="text-5xl font-black tracking-tight text-text uppercase leading-none">Snippets & Insights</h1>
        <p className="mt-6 text-text font-bold text-lg max-w-2xl leading-relaxed">
          実務で得たフロントエンドの知見を、アクセシビリティと保守性の観点から整理。
        </p>
      </header>

      <div className="grid gap-8">
        {snippets.length === 0 ? (
          <p className="text-slate-500 font-bold italic">No snippets found.</p>
        ) : (
          snippets.map((post) => (
            <Link key={post.slug} href={`/snippets/${post.slug}`} className="group block">
              <article className="p-8 border-4 border-text bg-surface dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(28,41,60,1)] dark:shadow-[6px_6px_0px_0px_rgba(251,251,249,0.1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[4px_4px_0px_0px_rgba(28,41,60,1)] transition-all">
                <time dateTime={post.date} className="inline-block px-3 py-1 bg-secondary text-surface text-xs font-black uppercase tracking-widest border-2 border-text mb-4">
                  {post.date}
                </time>
                <h2 className="text-3xl font-black mt-2 text-text dark:text-surface group-hover:text-secondary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-4 text-text dark:text-slate-300 font-medium leading-relaxed text-lg">
                  {post.description}
                </p>
                <div className="mt-8 font-black text-sm uppercase tracking-tighter inline-flex items-center gap-2">
                  Read More <span className="text-xl">→</span>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
