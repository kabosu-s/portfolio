// src/mdx-components.tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ここで h1 や p などのタグをカスタムコンポーネントに差し替えることも可能
    ...components,
  }
}