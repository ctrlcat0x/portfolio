"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { Button } from "@/components/ui/button";
import { globalConfig } from "../../../global.config";
import type { TocItem } from "@/lib/posts";

interface BlogDetailHeaderProps {
  toc: TocItem[];
}

export default function BlogDetailHeader({ toc }: BlogDetailHeaderProps) {
  const [activeId, setActiveId] = useState("");

  const soundVolume = globalConfig.sounds.enabled
    ? globalConfig.sounds.volumes.buttonClick
    : 0;
  const [playClick] = useSound(clickSoftSound, { volume: soundVolume });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-10% 0% -80% 0%" },
    );

    for (const item of toc) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [toc]);

  return (
    // Hidden on small screens to avoid overlap; visible at `lg` and up.
    <aside className="fixed left-10 top-20 z-10 hidden xl:flex w-56 flex-col gap-4">
      {/* Home button: keep it left-aligned and a fixed width so it doesn't stretch to the nav width */}
      <div className="self-start">
        <Button variant="ghost" className="justify-start">
          <Link
            href="/"
            onClick={() => playClick()}
            className="flex items-center gap-2 text-sm"
          >
            <span className="mt-0.5">↩</span>
            <span>Home</span>
          </Link>
        </Button>
      </div>

      {toc.length > 0 && (
        <nav className="ml-2 flex flex-col gap-2.5 items-start">
          {toc.map((item) => {
            const indent = item.level === 3 ? "pl-3" : "";
            const active = activeId === item.id;

            const handleClick = (e: React.MouseEvent) => {
              e.preventDefault();
              const el = document.getElementById(item.id);
              if (!el) return;

              // account for fixed header offset
              const offset = 96;
              const targetY =
                el.getBoundingClientRect().top + window.scrollY - offset;

              // If Lenis is available, ask it to scroll; otherwise fallback to native smooth
              const lenis = (window as any).__lenis;
              if (lenis && typeof lenis.scrollTo === "function") {
                try {
                  lenis.scrollTo(targetY);
                } catch {
                  window.scrollTo({ top: targetY, behavior: "smooth" });
                }
              } else {
                window.scrollTo({ top: targetY, behavior: "smooth" });
              }

              // update URL hash without jumping
              history.replaceState(null, "", `#${item.id}`);
              playClick();
            };

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleClick}
                // inline-block + max width + normal whitespace allows wrapping
                className={`inline-block text-sm ${indent} max-w-[14rem] whitespace-normal break-words leading-tight transition-colors duration-150 hover:text-foreground ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </aside>
  );
}
