"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePreloaderDone } from "@/components/PreloaderProvider";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { globalConfig } from "../../global.config";
import { Highlighter } from "./Highlighter";

const BUTTON_CLICK_VOLUME = globalConfig.sounds.enabled
  ? globalConfig.sounds.volumes.buttonClick
  : 0;

const PAGE_REVEAL_SETTLE_MS = 800;

// ─── Highlighter "New" badge ─────────────────────────────────────────────────
function HighlighterBadge({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) {
  return (
    <Highlighter action="circle" color="#f8b304" enabled={enabled} isView>
      <span className="text-[#f8b304] p-2">{children}</span>
    </Highlighter>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface WritingItem {
  title: string;
  category: string;
  /** DD/MM */
  date: string;
  href: string;
  isNew?: boolean;
}

interface WritingGroup {
  year: string;
  items: WritingItem[];
}

const writings: WritingGroup[] = [
  {
    year: "2026",
    items: [
      {
        title: "On writing code with taste",
        category: "Engineering",
        date: "14/01",
        href: "#",
        isNew: true,
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        title: "Notes on building things",
        category: "Process",
        date: "21/06",
        href: "#",
      },
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Writings() {
  const preloaderDone = usePreloaderDone();
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [highlighterReady, setHighlighterReady] = useState(false);
  const [playClick] = useSound(clickSoftSound, { volume: BUTTON_CLICK_VOLUME });

  useEffect(() => {
    // Check if window is already loaded
    if (document.readyState === "complete") {
      setWindowLoaded(true);
      return;
    }

    const handleLoad = () => {
      setWindowLoaded(true);
    };

    window.addEventListener("load", handleLoad, { once: true });

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (!preloaderDone || !windowLoaded) {
      setHighlighterReady(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHighlighterReady(true);
    }, PAGE_REVEAL_SETTLE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [preloaderDone, windowLoaded]);

  return (
    <section className="mb-12">
      <p className="mb-3 text-sm tracking-wide text-muted-foreground">
        Writing
      </p>

      <div className="group/writings border-t border-border">
        {writings.map((group) => (
          <div key={group.year} className="flex">
            {/* ── Year label (10%) ─────────────────────────── */}
            <div className="w-[10%] shrink-0 pt-3 pl-1">
              <span className="text-xs tabular-nums text-muted-foreground/60">
                {group.year}
              </span>
            </div>

            {/* ── Writing rows (90%) ───────────────────────── */}
            <div className="flex-1">
              {group.items.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => playClick()}
                  className="my-0.5 flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-all duration-200 hover:bg-secondary group-hover/writings:opacity-50 hover:opacity-100!"
                >
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="flex items-center gap-2 text-foreground/90 font-medium">
                      <span className="truncate sm:whitespace-normal">
                        {item.title}
                      </span>
                      {item.isNew && (
                        <HighlighterBadge enabled={highlighterReady}>
                          New
                        </HighlighterBadge>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                  <span className="ml-4 shrink-0 text-xs tabular-nums text-muted-foreground">
                    {item.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
