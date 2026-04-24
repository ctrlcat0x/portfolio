"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "../ui/button";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      variant="ghost"
      size="sm"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </Button>
  );
}
