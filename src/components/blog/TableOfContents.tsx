"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { TocItem } from "@/lib/posts";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const visibleItems = useMemo(
    () => items.filter((item) => item.level === 2),
    [items],
  );
  const [activeId, setActiveId] = useState(visibleItems[0]?.id ?? "");

  useEffect(() => {
    const headings = visibleItems.flatMap((item) => {
      const heading = document.getElementById(item.id);
      return heading ? [heading] : [];
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeading = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          )[0];

        if (visibleHeading) setActiveId(visibleHeading.target.id);
      },
      { rootMargin: "-12% 0px -76%", threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [visibleItems]);

  return (
    <aside className="fixed left-10 top-20 z-10 hidden w-56 flex-col gap-4 xl:flex">
      <Link
        href="/"
        className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm text-foreground transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span aria-hidden="true">↩</span>
        Back
      </Link>

      {visibleItems.length > 0 ? (
        <nav
          aria-label="On this page"
          className="ms-2 mt-1 flex flex-col items-start gap-2.5"
        >
          {visibleItems.map((item) => {
            const isActive = item.id === activeId;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`max-w-[14rem] whitespace-normal break-words text-sm leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.title}
              </a>
            );
          })}
        </nav>
      ) : null}
    </aside>
  );
}
