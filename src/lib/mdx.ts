import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content/snippets");

export interface SnippetMetadata {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export async function getSnippets(): Promise<SnippetMetadata[]> {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR);

  const snippets = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(CONTENT_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");

      const metadata: any = { slug };

      // 1. YAMLフロントマター (---) のパース
      const yamlMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
      if (yamlMatch) {
        const lines = yamlMatch[1].split(/\r?\n/).filter(line => line.trim() !== "");
        lines.forEach((line) => {
          const colonIndex = line.indexOf(":");
          if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim();
            const value = line.slice(colonIndex + 1).trim();
            metadata[key] = value.replace(/^["'](.*)["']$/, "$1");
          }
        });
      } 
      // 2. export const metadata = { ... } の簡易パース (正規表現)
      else {
        const exportMatch = content.match(/export const metadata = \{([\s\S]+?)\}/);
        if (exportMatch) {
          const lines = exportMatch[1].split(/\r?\n|,/).filter(line => line.trim() !== "");
          lines.forEach((line) => {
            const colonIndex = line.indexOf(":");
            if (colonIndex !== -1) {
              const key = line.slice(0, colonIndex).trim();
              const value = line.slice(colonIndex + 1).trim();
              metadata[key] = value.replace(/^["'](.*)["']$/, "$1");
            }
          });
        }
      }

      return metadata as SnippetMetadata;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

  return snippets;
}

export async function getSnippetBySlug(slug: string): Promise<SnippetMetadata | null> {
  const all = await getSnippets();
  return all.find((s) => s.slug === slug) || null;
}
