"use client";

import { useEffect, useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeoutId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Code copied" : "Copy code"}
      className="min-h-10 rounded-lg px-3 text-xs text-muted transition-colors hover:bg-black/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.96]"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
