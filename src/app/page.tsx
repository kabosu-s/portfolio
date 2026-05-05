import Link from 'next/link';
import { getSnippets } from '@/lib/mdx';

export default async function Home() {
  const allSnippets = await getSnippets();
  const latestSnippet = allSnippets[0];

  return (
    <>
      <section className="mb-16 relative p-6 md:p-12 bg-primary border-4 border-border-default shadow-neobrutalism-1">
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-13 md:leading-20 text-text" lang="en">
            Crafting  Accessible <br />
            Digital Experiences.
          </h1>

          <p className="text-md text-text leading-relaxed font-bold max-w-2xl">
            デザインの意図を論理的にコードへ翻訳し、
            アクセシビリティと保守性を考慮した「持続可能なWeb」を構築する。
            <br />
            <span className="opacity-70 font-medium text-sm">さえ / Sae — Design Div. & Frontend Engineer.</span>
          </p>
        </div>
      </section>

      <section className="mb-16" aria-labelledby="philosophy-title">
        <h2 id="philosophy-title" className="inline-block px-3 py-1 bg-secondary text-surface text-xs font-black uppercase tracking-widest border-2 border-border-default mb-6">
          ポリシー — <span lang="en">Philosophy & Strength</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: '01. アクセシビリティを前提に実装', desc: '設計段階からアクセシビリティを考慮し、誰にとっても使いやすい、すべてのユーザーに開かれたUI実装を目指します。' },
            { title: '02. 長く運用できるコード', desc: '短期的な実装ではなく、既存コードの改善やリファクタリングも含め、継続的に品質を高めることを意識しています。' },
            { title: '03. デザインと実装の橋渡し', desc: 'デザイナーとエンジニア両方の視点から、デザイン意図の正確な再現、実装上の制約を踏まえた調整。パフォーマンスと保守性を極限まで高めます。' },
            { title: '04. 違和感のないUIを作る', desc: '見た目が整っているだけではなく、「操作したときにストレスを感じないこと」を重視したUI設計を行います。' },
          ].map((item) => (
            <div key={item.title} className="p-6 border-2 border-border-default bg-surface dark:bg-slate-900 shadow-neobrutalism-1">
              <h3 className="text-md font-black mb-3 text-text dark:text-surface">{item.title}</h3>
              <p className="text-sm text-text dark:text-slate-300 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16" aria-labelledby="tech-title">
        <h2 id="tech-title" className="inline-block px-3 py-1 bg-secondary text-surface text-xs font-black uppercase tracking-widest border-2 border-border-default mb-6">
          技術スタック — <span lang="en">Technical Stack</span>
        </h2>
        <div className="flex flex-wrap gap-4">
          {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Semantic HTML', 'a11y', 'Figma', 'Docker', 'Git'].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-surface dark:bg-slate-800 border-2 border-border-default shadow-neobrutalism-2 text-xs font-black text-text dark:text-surface">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-16" aria-labelledby="snippets-title">
        <div className="flex justify-between items-end mb-6">
          <h2 id="snippets-title" className="inline-block px-3 py-1 bg-secondary text-surface text-xs font-black uppercase tracking-widest border-2 border-border-default">
            メモ — <span lang="en">Latest Snippets</span>
          </h2>
          <Link href="/snippets" className="text-xs font-black hover:underline underline-offset-4 decoration-2 decoration-secondary min-h-[44px] flex items-center">
            一覧 →
          </Link>
        </div>
        <div className="grid gap-6">
          {latestSnippet ? (
            <Link href={`/snippets/${latestSnippet.slug}`} className="group p-8 border-4 border-border-default bg-surface dark:bg-slate-900 shadow-neobrutalism-1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neobrutalism-hover transition-all duration-fast">
              <h3 className="font-black text-lg group-hover:text-secondary transition-colors text-text dark:text-surface">{latestSnippet.title}</h3>
              <p className="text-text dark:text-slate-300 font-medium mt-4 text-sm">{latestSnippet.description}</p>
              <div className="mt-6 font-black text-xs uppercase tracking-tighter inline-flex items-center gap-2">
                Read Snippet <span className="text-xl">→</span>
              </div>
            </Link>
          ) : (
            <p className="text-slate-500 italic text-sm">Coming soon...</p>
          )}
        </div>
      </section>
    </>
  );
}
