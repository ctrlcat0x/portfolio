import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/posts");

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface Post extends PostMetadata {
  content: string;
  toc: TocItem[];
}

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getTableOfContents(content: string): TocItem[] {
  return content.split("\n").flatMap((line) => {
    const match = line.trim().match(/^(#{2,3})\s+(.+)$/);
    if (!match) return [];

    const title = match[2].replace(/[*_`]/g, "").trim();
    return [
      {
        id: slugifyHeading(title),
        title,
        level: match[1].length as 2 | 3,
      },
    ];
  });
}

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
  const { content, data } = matter(source);

  return {
    slug,
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    content,
    toc: getTableOfContents(content),
  };
}

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readPostFile)
    .sort((firstPost, secondPost) =>
      secondPost.date.localeCompare(firstPost.date),
    )
    .map(({ content: _content, toc: _toc, ...metadata }) => metadata);
}

export function getPost(slug: string): Post | null {
  const fileName = `${slug}.mdx`;
  const filePath = path.join(postsDirectory, fileName);

  if (!fs.existsSync(filePath)) return null;

  return readPostFile(fileName);
}
