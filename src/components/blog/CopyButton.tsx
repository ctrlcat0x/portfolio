"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { globalConfig } from "../../../global.config";

const BUTTON_CLICK_VOLUME = globalConfig.sounds.enabled
  ? globalConfig.sounds.volumes.buttonClick
  : 0;

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [playClick] = useSound(clickSoftSound, { volume: BUTTON_CLICK_VOLUME });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    playClick();
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
