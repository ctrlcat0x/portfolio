"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePreloaderDone } from "@/components/PreloaderProvider";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { globalConfig } from "../../global.config";

const BUTTON_CLICK_VOLUME = globalConfig.sounds.enabled
  ? globalConfig.sounds.volumes.buttonClick
  : 0;

const PAGE_REVEAL_SETTLE_MS = 700;

// ─── Data ─────────────────────────────────────────────────────────────────────
interface JourneyItem {
  title: string;
  subtitle: string;
  year: string;
}

const journeyItems: JourneyItem[] = [
  {
    title: "Frontend Developer",
    subtitle: "Innovative Application Consultants",
    year: "Present",
  },
  {
    title: "Masters in Information Technology",
    subtitle: "Panjab University",
    year: "Present",
  },
  {
    title: "Frontend Intern",
    subtitle: "Innovative Application Consultants",
    year: "2025",
  },
  {
    title: "Bachelor's in Computer Applications",
    subtitle: "Panjab University",
    year: "2025",
  },
];

// ─── Journey Component ──────────────────────────────────────────────────────
export default function Journey() {
  const preloaderDone = usePreloaderDone();
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [playClick] = useSound(clickSoftSound, { volume: BUTTON_CLICK_VOLUME });

  useEffect(() => {
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

  return (
    <section className="mb-12">
      <p className="mb-3 text-sm tracking-wide text-muted-foreground">
        Journey
      </p>

      <div className="group/journey border-t border-border">
        {journeyItems.map((item, i) => (
          <div
            key={i}
            className="my-0.5 flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-all duration-200 hover:bg-secondary group-hover/journey:opacity-50 hover:opacity-100!"
          >
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-foreground/90 font-medium">
                {item.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.subtitle}
              </span>
            </div>
            <span className="ml-4 shrink-0 text-xs tabular-nums text-muted-foreground">
              {item.year}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
