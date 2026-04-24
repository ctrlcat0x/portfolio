import { notFound } from "next/navigation";
import { isValidElement } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { getPost, getAllPosts } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogDetailHeader from "@/components/blog/BlogDetailHeader";
import BlogReveal from "@/components/blog/BlogReveal";
import CodeBlock from "@/components/blog/CodeBlock";
import PreviewBlock from "@/components/blog/PreviewBlock";
import ScaleDemo from "@/components/blog/demos/ScaleDemo";
import ButtonPulseDemo from "@/components/blog/demos/ButtonPulseDemo";
import EasingDemo from "@/components/blog/demos/EasingDemo";
import PopoverDemo from "@/components/blog/demos/PopoverDemo";
import TooltipDemo from "@/components/blog/demos/TooltipDemo";
import BlurDemo from "@/components/blog/demos/BlurDemo";

// ─── Pre override ────────────────────────────────────────────────────────────
// MDX renders fenced code blocks as <pre><code className="language-xxx">…</code></pre>.
// We intercept `pre` to route them through our shiki-powered CodeBlock.
function BlogPre({ children }: { children?: React.ReactNode }) {
  if (
    isValidElement<{ className?: string; children?: string }>(children) &&
    (children as React.ReactElement).type === "code"
  ) {
    const child = children as React.ReactElement<{
      className?: string;
      children?: string;
    }>;
    const lang =
      (child.props.className ?? "").replace("language-", "") || "text";
    const code = String(child.props.children ?? "").trim();
    return <CodeBlock code={code} language={lang} />;
  }
  return <pre>{children}</pre>;
}

// ─── Shared MDX component map ─────────────────────────────────────────────────
const mdxComponents = {
  pre: BlogPre,
  PreviewBlock,
  ScaleDemo,
  ButtonPulseDemo,
  EasingDemo,
  PopoverDemo,
  TooltipDemo,
  BlurDemo,
};

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Left TOC sidebar */}
      <BlogDetailHeader toc={post.toc} />

      {/* Main column — mirrors PlaygroundDetailContent layout */}
      <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
        {/* Nav header */}
        <BlogReveal delay={0}>
          <Header />
        </BlogReveal>

        <main className="mt-10">
          {/* Post heading block */}
          <BlogReveal delay={0.08}>
            <h1 className="text-xl text-foreground sm:text-[1.75rem]">
              {post.title}
            </h1>
            <p className="mt-1 text-base text-muted-foreground sm:text-lg">
              {post.date}
            </p>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.description}
            </p>
          </BlogReveal>

          {/* MDX prose content */}
          <BlogReveal delay={0.14}>
            <div className="prose-blog mt-12">
              <MDXRemote
                source={post.content}
                // biome-ignore lint/suspicious/noExplicitAny: MDX components are untyped
                components={mdxComponents as any}
                options={{
                  mdxOptions: {
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>
          </BlogReveal>
        </main>

        {/* Footer */}
        <BlogReveal delay={0.2}>
          <Footer />
        </BlogReveal>
      </div>
    </div>
  );
}
