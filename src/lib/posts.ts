import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/posts");

export interface TocItem {
  id: string;
  label: string;
  /** heading level (2 for `##`, 3 for `###`) */
  level?: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface Post extends PostMeta {
  content: string;
  toc: TocItem[];
}

/**
 * Matches github-slugger's output which rehype-slug uses:
 * lowercase, remove non-alphanumeric except spaces/hyphens, collapse spaces to hyphens.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of content.split("\n")) {
    // match headings level 2 and 3, strip leading/trailing whitespace
    const trimmedLine = line.trim();
    const match = trimmedLine.match(/^(#{2})\s+(.+)$/);
    if (match) {
      const hashes = match[1];
      const label = match[2].trim();
      const level = hashes.length;
      items.push({ id: slugify(label), label, level });
    }
  }
  return items;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? "",
        date: (data.date as string) ?? "",
        description: (data.description as string) ?? "",
      };
    });
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? "",
    date: (data.date as string) ?? "",
    description: (data.description as string) ?? "",
    content,
    toc: extractToc(content),
  };
}
