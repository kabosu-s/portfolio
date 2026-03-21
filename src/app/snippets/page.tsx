
import Link from "next/link";
import { getSnippets } from "@/lib/mdx";

export default async function SnippetsIndex() {
  const snippets = await getSnippets();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-slate-900 dark:text-slate-100">
      <header className="mb-12">
        <Link href="/" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold">Snippets & Insights</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          実務で得たフロントエンドの知見を、アクセシビリティと保守性の観点から整理。
        </p>
      </header>

      <div className="grid gap-8">
        {snippets.length === 0 ? (
          <p className="text-slate-500 italic">No snippets found.</p>
        ) : (
          snippets.map((post) => (
            <Link key={post.slug} href={`/snippets/${post.slug}`} className="group">
              <article className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <time className="text-sm text-slate-500">{post.date}</time>
                <h2 className="text-2xl font-bold mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {post.description}
                </p>
              </article>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
