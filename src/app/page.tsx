import Link from 'next/link';
import { getSnippets } from '@/lib/mdx';

export default async function Home() {
  const allSnippets = await getSnippets();
  const latestSnippet = allSnippets[0];

  return (
    <>
      <section className="mb-32 relative">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none opacity-50" />

        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]" lang="en">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-500">Accessible</span> <br />
            Digital Experiences.
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            デザインの意図を論理的にコードへ翻訳し、
            <br />
            アクセシビリティと保守性を考慮した「持続可能なWeb」を構築します。
            <br />
            <span className="text-slate-400 dark:text-slate-500 font-normal text-lg">さえ / Sae — Design Div. & Frontend Engineer.</span>
          </p>
        </div>
      </section>

      <section className="mb-24" aria-labelledby="philosophy-title">
        <h2 id="philosophy-title" className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-8">
          私の強み — <span lang="en">Philosophy & Strength</span>
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
        <h2 id="tech-title" className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-8">
          技術スタック — <span lang="en">Technical Stack</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Semantic HTML', 'a11y', 'Figma', 'Docker', 'Git'].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-24" aria-labelledby="snippets-title">
        <div className="flex justify-between items-end mb-8">
          <h2 id="snippets-title" className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            メモ — <span lang="en">Latest Snippets</span>
          </h2>
          <Link href="/snippets" className="text-sm font-bold hover:underline">
            一覧 →
          </Link>
        </div>
        <div className="grid gap-4">
          {latestSnippet ? (
            <Link href={`/snippets/${latestSnippet.slug}`} className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-cyan-600 dark:hover:border-cyan-400 transition-all">
              <h3 className="font-bold text-lg">{latestSnippet.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">{latestSnippet.description} [Read More]</p>
            </Link>
          ) : (
            <p className="text-slate-500 italic">Coming soon...</p>
          )}
        </div>
      </section>
    </>
  );
}
