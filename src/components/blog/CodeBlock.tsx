import { codeToHtml } from "shiki";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default async function CodeBlock({
  code,
  language = "text",
}: CodeBlockProps) {
  let html = "";
  try {
    html = await codeToHtml(code, {
      lang: language,
      themes: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
    });
  } catch {
    // Fallback: escape and wrap in pre/code
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    html = `<pre class="shiki"><code>${escaped}</code></pre>`;
  }

  return (
    <div className="group my-6 overflow-hidden rounded-xl border border-border">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="font-mono text-sm text-muted-foreground">
          {language}
        </span>
        <CopyButton code={code} />
      </div>

      {/* Highlighted code */}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is sanitized */}
      <div
        className="overflow-x-auto [&>pre]:bg-transparent! [&>pre]:p-5 [&>pre]:font-mono [&>pre]:text-[13px] [&>pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
