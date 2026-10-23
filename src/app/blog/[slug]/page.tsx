import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isValidElement, type ReactNode } from "react";
import rehypeSlug from "rehype-slug";
import CodeBlock from "@/components/blog/CodeBlock";
import BlurDemo from "@/components/blog/demos/BlurDemo";
import ButtonPulseDemo from "@/components/blog/demos/ButtonPulseDemo";
import EasingDemo from "@/components/blog/demos/EasingDemo";
import PopoverDemo from "@/components/blog/demos/PopoverDemo";
import ScaleDemo from "@/components/blog/demos/ScaleDemo";
import TooltipDemo from "@/components/blog/demos/TooltipDemo";
import PreviewBlock from "@/components/blog/PreviewBlock";
import TableOfContents from "@/components/blog/TableOfContents";
import { getAllPosts, getPost } from "@/lib/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function BlogPre({ children }: { children?: ReactNode }) {
  if (
    isValidElement<{ className?: string; children?: ReactNode }>(children) &&
    children.type === "code"
  ) {
    const language =
      (children.props.className ?? "").replace("language-", "") || "text";
    const code = String(children.props.children ?? "").trimEnd();
    return <CodeBlock code={code} language={language} />;
  }

  return <pre>{children}</pre>;
}

const mdxComponents = {
  pre: BlogPre,
  PreviewBlock,
  BlurDemo,
  ButtonPulseDemo,
  EasingDemo,
  PopoverDemo,
  ScaleDemo,
  TooltipDemo,
};

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Portfolio`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <div className="relative min-h-screen bg-[#fdfdfd]">
      <TableOfContents items={post.toc} />
      <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
        <Link
          className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 xl:hidden"
          href="/"
        >
          ↩ Back
        </Link>

        <header className="mb-12 flex items-center justify-center">
          <Image
            src="/hero.gif"
            alt=""
            width={80}
            height={80}
            unoptimized
            priority
            className="size-20 rounded-full object-cover"
          />
        </header>

        <main className="mt-10">
          <article>
            <header>
              <h1 className="text-xl text-foreground sm:text-[1.75rem]">
                {post.title}
              </h1>
              <time className="mt-1 block text-base text-muted sm:text-lg">
                {post.date}
              </time>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
                {post.description}
              </p>
            </header>
            <div className="prose-blog mt-12">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
              />
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
