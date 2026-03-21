import { Mailto } from '@/components/ui/Mailto';
import Link from 'next/link';
import { getSnippets } from '@/lib/mdx';

export default async function Home() {
  const allSnippets = await getSnippets();
  const latestSnippet = allSnippets[0];

  return (
    <main
      className="max-w-4xl mx-auto px-6 py-12 font-sans 
                     text-slate-900 dark:text-slate-100 
                     selection:bg-indigo-100 dark:selection:bg-indigo-900/50"
    >
      {/* ... (header and values remain the same) ... */}
      <header className="mb-24">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Sae</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">Design Div / Frontend Engineer / UI Designer</p>
        <p className="max-w-2xl leading-relaxed text-lg">
          「違和感のないUIを、設計から実装まで」
          <br />
          アクセシビリティと実装品質を両立するフロントエンド
        </p>
      </header>

      <section className="mb-24" aria-labelledby="philosophy-title">
        <h2 id="philosophy-title" className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-8">
          Philosophy & Strength
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {[
            { title: '01. アクセシビリティを前提に実装', desc: '設計段階からアクセシビリティを考慮し、誰にとっても使いやすい、すべてのユーザーに開かれたUIを実装します。' },
            { title: '02. 長く運用できるコード', desc: '短期的な実装ではなく、既存コードの改善やリファクタリングも含め、継続的に品質を高めることを意識しています。' },
            { title: '03. デザインと実装の橋渡し', desc: 'デザイナーとエンジニア両方の視点から、デザイン意図の正確な再現、実装上の制約を踏まえた調整。パフォーマンスと保守性を極限まで高めます。' },
            { title: '04. 違和感のないUIを作る', desc: '見た目が整っているだけではなく、「操作したときにストレスを感じないこと」を重視したUI設計を行います。' },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24" aria-labelledby="tech-title">
        <h2 id="tech-title" className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-8">
          Technical Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            'Next.js',
            'React',
            'TypeScript',
            'Tailwind CSS',
            'Semantic HTML',
            'a11y',
            'Figma',
            'Docker',
            'Git',
            'MDX',
          ].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-24" aria-labelledby="snippets-title">
        <div className="flex justify-between items-end mb-8">
          <h2 id="snippets-title" className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Latest Snippets
          </h2>
          <Link href="/snippets" className="text-sm font-bold hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid gap-4">
          {latestSnippet ? (
            <Link href={`/snippets/${latestSnippet.slug}`} className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-600 dark:hover:border-indigo-400 transition-all">
              <h3 className="font-bold text-lg">{latestSnippet.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">{latestSnippet.description} [Read More]</p>
            </Link>
          ) : (
            <p className="text-slate-500 italic">Coming soon...</p>
          )}
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 dark:text-slate-500 text-sm">© 2026 Sae.</p>
        <Mailto
          user="h_kakurega"
          domain="yahoo.co.jp"
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg 
                     hover:bg-indigo-700 transition-colors 
                     focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 
                     outline-none"
        >
          仕事の相談をする
        </Mailto>
      </footer>
    </main>
  );
}
