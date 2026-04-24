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
    <aside className="fixed left-10 top-20 z-10 flex flex-col gap-4">
      <Button variant="ghost">
        <Link
          href="/"
          onClick={() => playClick()}
          className="flex items-center gap-2 text-sm"
        >
          <span className="mt-0.5">↩</span>
          <span>Home</span>
        </Link>
      </Button>

      {toc.length > 0 && (
        <nav className="ml-4 flex flex-col gap-2.5">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm transition-colors duration-150 hover:text-foreground ${
                activeId === item.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </aside>
  );
}
