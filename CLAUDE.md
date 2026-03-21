
# Portfolio Coding Rules & Guidelines

フロントエンド・デザインエンジニアとしての品質（アクセシビリティ、保守性、デザイン再現性）を担保するためのコーディングルールです。

## 1. テックスタック
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19 (Server Components 活用)
- **Styling**: Tailwind CSS 4 (PostCSSベース)
- **Content**: MDX (@next/mdx)
- **Language**: TypeScript (Strict Mode)

## 2. デザイン・実装哲学 (Philosophy)
- **Accessibility (a11y) First**: 
    - セマンティックHTML（`<main>`, `<header>`, `<nav>`, `<section>`等）を正しく使う。
    - インタラクティブ要素には適切な `aria-label` やフォーカス管理を行う。
- **Maintainability**: 
    - 意味のあるコンポーネント分割を行い、UIパーツは `src/components/ui/` に集約する。
- **Performance**: 
    - Next.js の最適化機能を活用（Images, Fonts, Server Components）。
- **Visual Polish**: 
    - ダークモード、レスポンシブ対応を標準とする。

## 3. ディレクトリ構成
- `src/app/`: ページ・ルーティング。Next.js 15+ の `Promise` ベースの `params` を使用。
- `src/components/ui/`: 汎用的なUIコンポーネント。基本は `PascalCase.tsx`。
- `src/content/`: コンテンツ（MDX）の保管場所。
    - `snippets/`: 技術知見。
    - `achievements/`: 制作実績（今後追加予定）。
- `public/`: 静的資産（画像、ロゴ等）。

## 4. コーディング規約
### 4.1 TypeScript / React
- **コンポーネント定義**: 
    - `export const ComponentName = ({ props }: Props) => { ... }` 形式を推奨。
    - `interface` を用いた型定義をコンポーネントと同じファイルに記述。
- **Client Components**: 
    - ブラウザAPI（`window`, `localStorage`等）や `useState` 等を使う場合のみ `"use client";` を冒頭に記述。
- **Next.js API**:
    - `params` や `searchParams` は `Promise` として扱い、`await` して使用する。

### 4.2 Styling (Tailwind CSS 4)
- **Utility First**: 
    - 基本はクラス名で記述するが、読みやすさのために適宜改行を加える。
- **Theming**: 
    - `src/app/globals.css` の `@theme inline` で定義した変数を使用する。
    - ダークモードは `dark:` プレフィックスで対応。
- **Typography**: 
    - MDXコンテンツには `prose prose-slate dark:prose-invert` クラスを適用し、コンテンツの読みやすさを確保する。

## 5. コンテンツ追加手順
### 5.1 スニペット (Snippets)
1. `src/content/snippets/[slug].mdx` を作成。
2. フロントマター（`title`, `date`, `description`）を記述。
3. `src/app/snippets/page.tsx` のリストを更新（将来的に自動取得へ移行予定）。

### 5.2 実績 (Achievements)
1. `src/content/achievements/` ディレクトリを作成。
2. 画像等は `public/images/achievements/` に配置。
3. コンポーネントでラップして視覚的に豊かに表現する。

## 6. ESLint & 品質管理
- `npm run lint` が通る状態を維持する。
- アクセシビリティ上の警告（alt属性の欠如など）は無視せず修正する。
