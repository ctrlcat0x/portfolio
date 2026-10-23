import { codeToHtml } from "shiki";
import CopyButton from "./CopyButton";

function escapeHtml(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function CodeBlock({
  code,
  language = "text",
}: {
  code: string;
  language?: string;
}) {
  let html: string;

  try {
    html = await codeToHtml(code, {
      lang: language,
      theme: "github-light",
    });
  } catch {
    html = `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }

  return (
    <figure className="code-block my-7 overflow-hidden rounded-xl border border-border">
      <figcaption className="flex min-h-12 items-center justify-between border-b border-border bg-zinc-50 px-3 ps-4">
        <span className="font-mono text-xs text-muted">{language}</span>
        <CopyButton code={code} />
      </figcaption>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki returns escaped highlighted HTML. */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
