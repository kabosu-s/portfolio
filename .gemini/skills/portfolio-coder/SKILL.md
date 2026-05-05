---
name: portfolio-coder
description: Expert guide for developing the portfolio website using Next.js 16 (App Router), Tailwind CSS 4, and TypeScript. Use when implementing new components, pages, or features to ensure alignment with project-specific coding rules, accessibility standards, and directory structures.
---

# Portfolio Coder

## Overview
This skill provides the necessary context and rules for developing this specific portfolio project. It ensures that all code follows the "Next.js 16 breaking changes" awareness and adheres to the project's accessibility and performance standards.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: React (Server Components by default)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS 4

## Key Coding Rules
- **Accessibility First**: Use semantic HTML (`<main>`, `<nav>`, etc.). Ensure `aria-label` and focus management are handled.
- **Promise-based Params**: `params` and `searchParams` in Next.js 16 are Promises. Always `await` them.
- **Component Definition**: Use `export const ComponentName = ({ props }: Props) => { ... }`.
- **Client Components**: Use `"use client";` only when browser APIs or state are required.
- **Tailwind CSS 4**: Use utility-first classes. Add line breaks for readability in long class strings. Use `@theme inline` variables from `globals.css`.

## Directory Structure
- `src/app/`: Routing and Pages.
- `src/components/ui/`: Reusable, atomic UI components.
- `src/content/`: MDX content (snippets, achievements).
- `src/lib/`: Shared utilities and data fetching.

## Procedures
- **Adding Snippets**: Create `.mdx` in `src/content/snippets/`, add frontmatter, and update the list in `src/app/snippets/page.tsx`.
- **Adding Achievements**: Create in `src/content/achievements/`, assets in `public/images/achievements/`.

## Quality Gates
- Run `npm run lint` and ensure no accessibility warnings remain.
