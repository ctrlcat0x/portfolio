"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { globalConfig } from "../../global.config";

const BUTTON_CLICK_VOLUME = globalConfig.sounds.enabled
  ? globalConfig.sounds.volumes.buttonClick
  : 0;

// ─── Data ─────────────────────────────────────────────────────────────────────
interface BookItem {
  title: string;
  author: string;
  coverSrc: string;
  href: string;
}

const books: BookItem[] = [
  {
    title: "1984",
    author: "George Orwell",
    coverSrc:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1327144697i/3744438.jpg",
    href: "https://www.goodreads.com/book/show/61439040-1984",
  },
  {
    title: "Japanese Design Since 1945",
    author: "Naomi Pollock",
    coverSrc: "https://m.media-amazon.com/images/I/91pN7VLvTDL.jpg",
    href: "https://www.goodreads.com/en/book/show/51075323-japanese-design-since-1945",
  },
  {
    title: "White Nights",
    author: "Fyodor Dostoevsky",
    coverSrc:
      "https://m.media-amazon.com/images/I/41y8H3QmVqL._AC_UF1000,1000_QL80_.jpg",
    href: "https://www.goodreads.com/book/show/1772910.White_Nights",
  },
  {
    title: "Hamlet",
    author: "William Shakespeare",
    coverSrc:
      "https://m.media-amazon.com/images/I/71vZ7kcv-8L._UF1000,1000_QL80_.jpg",
    href: "https://www.goodreads.com/book/show/1420.Hamlet",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Books() {
  const [playClick] = useSound(clickSoftSound, { volume: BUTTON_CLICK_VOLUME });

  const [hovered, setHovered] = useState<number | null>(null);
  const [previewY, setPreviewY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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
      setPreviewY(
        itemRect.top - sectionRect.top + itemRect.height / 2 - 200 / 2,
      );
    }
    setHovered(index);
  };

  return (
    <section ref={sectionRef} className="relative mb-12 overflow-visible">
      <p className="mb-3 text-sm tracking-wide text-muted-foreground">
        Favourite Books
      </p>

      <div className="group/books border-t border-border">
        {books.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            target="_blank"
            onClick={() => playClick()}
            onMouseEnter={(e) => handleMouseEnter(e, i)}
            onMouseLeave={() => setHovered(null)}
            className="my-0.5 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:bg-secondary group-hover/books:opacity-50 hover:opacity-100!"
          >
            {/* ── Title + author ──────────────────────────── */}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="truncate text-foreground/90 font-medium sm:whitespace-normal">
                {item.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.author}
              </span>
            </div>

            {/* ── Small cover thumbnail ─────────────────── */}
            <div className="ml-4 h-9 w-6 shrink-0 overflow-hidden rounded-sm shadow-sm ring-1 ring-border/30">
              {/* biome-ignore lint/performance/noImgElement: small cover thumbnail */}
              <img
                src={item.coverSrc}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Floating larger cover on hover ───────────────────────────────── */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key={hovered}
            className="pointer-events-none absolute right-20 z-50 w-35 h-50 overflow-hidden rounded-sm border border-border/40 bg-background shadow-2xl"
            style={{ top: previewY }}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* biome-ignore lint/performance/noImgElement: hover preview */}
            <img
              src={books[hovered].coverSrc}
              alt={books[hovered].title}
              className="block h-full w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
