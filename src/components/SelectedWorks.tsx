"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePreloaderDone } from "@/components/PreloaderProvider";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { globalConfig } from "../../global.config";
import { Highlighter } from "./Highlighter";

const BUTTON_CLICK_VOLUME = globalConfig.sounds.enabled
  ? globalConfig.sounds.volumes.buttonClick
  : 0;

const PAGE_REVEAL_SETTLE_MS = 700;

// ─── Highlighter badge ────────────────────────────────────────────────────────
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
interface WorkItem {
  title: string;
  subtitle: string;
  year: string;
  href: string;
  previewSrc: string;
  badge?: string;
}

const works: WorkItem[] = [
  {
    title: "Dashboard",
    subtitle: "Atlar · AI Treasury Platform",
    year: "2024",
    href: "#",
    previewSrc: "/placeholder.png",
    badge: "Featured",
  },
  {
    title: "Branding",
    subtitle: "Atlar · AI Treasury Platform",
    year: "2024",
    href: "#",
    previewSrc: "/placeholder.png",
  },
  {
    title: "Insight Portal",
    subtitle: "Epidemic Sound · Soundtracking",
    year: "2023",
    href: "#",
    previewSrc: "/placeholder.png",
  },
  {
    title: "Platform Rework",
    subtitle: "SAVR · Investment Platform",
    year: "2023",
    href: "#",
    previewSrc: "/placeholder.png",
  },
  {
    title: "Autoplay Previews",
    subtitle: "Viaplay · Streaming Service",
    year: "2022",
    href: "#",
    previewSrc: "/placeholder.png",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function SelectedWorks() {
  const preloaderDone = usePreloaderDone();
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [highlighterReady, setHighlighterReady] = useState(false);
  const [playClick] = useSound(clickSoftSound, { volume: BUTTON_CLICK_VOLUME });

  const [hovered, setHovered] = useState<number | null>(null);
  const [previewY, setPreviewY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      setWindowLoaded(true);
      return;
    }
    const handleLoad = () => setWindowLoaded(true);
    window.addEventListener("load", handleLoad, { once: true });
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (!preloaderDone || !windowLoaded) {
      setHighlighterReady(false);
      return;
    }
    const id = window.setTimeout(
      () => setHighlighterReady(true),
      PAGE_REVEAL_SETTLE_MS,
    );
    return () => window.clearTimeout(id);
  }, [preloaderDone, windowLoaded]);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    const el = e.currentTarget;
    const section = sectionRef.current;
    if (section) {
      const itemRect = el.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      // Center the preview vertically on the hovered item
      setPreviewY(itemRect.top - sectionRect.top + itemRect.height / 2 - 90);
    }
    setHovered(index);
  };

  return (
    <section ref={sectionRef} className="relative mb-12 overflow-visible">
      <p className="mb-3 text-sm tracking-wide text-muted-foreground">
        Selected work
      </p>

      <div className="group/works border-t border-border">
        {works.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            onClick={() => playClick()}
            onMouseEnter={(e) => handleMouseEnter(e, i)}
            onMouseLeave={() => setHovered(null)}
            className="my-0.5 flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-all duration-200 hover:bg-secondary group-hover/works:opacity-50 hover:opacity-100!"
          >
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="flex items-center gap-2 text-foreground/90 font-medium">
                <span className="truncate sm:whitespace-normal">
                  {item.title}
                </span>
                {item.badge && (
                  <HighlighterBadge enabled={highlighterReady}>
                    {item.badge}
                  </HighlighterBadge>
                )}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.subtitle}
              </span>
            </div>
            <span className="ml-4 shrink-0 text-xs tabular-nums text-muted-foreground">
              {item.year}
            </span>
          </Link>
        ))}
      </div>

      {/* ── Floating preview card ─────────────────────────────────────────── */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key={hovered}
            className="pointer-events-none absolute right-20 z-50 w-64 overflow-hidden rounded-xl border border-border/40 bg-background shadow-2xl"
            style={{ top: previewY }}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* biome-ignore lint/performance/noImgElement: preview thumbnail */}
            <img
              src={works[hovered].previewSrc}
              alt={works[hovered].title}
              className="block h-auto w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
