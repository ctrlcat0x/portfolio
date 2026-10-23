"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const projects = [
  {
    name: "Spider UI",
    type: "Animated component library",
    href: "https://spiderui.vercel.app/",
    image: "/projects/spiderui.png",
  },
  {
    name: "Watanuki",
    type: "Docs infrastructure",
    href: "https://watanukidocs.vercel.app/",
    image: "/projects/watanuki.png",
  },
  {
    name: "Cartographer",
    type: "Design utility",
    href: "https://cartographerweb.vercel.app/",
    image: "/projects/cartographer.png",
  },
  {
    name: "Wallzilla",
    type: "macOS application",
    href: "https://getwallzilla.vercel.app/",
    image: "/projects/wallzilla.png",
  },
  {
    name: "Hydra Launcher",
    type: "Open-source product",
    href: "https://github.com/hydralauncher/hydra",
    image: "/projects/hydra.png",
  },
];

export default function ProjectSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef({ x: 0, scrollLeft: 0 });
  const isPointerDraggingRef = useRef(false);
  const stepRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const measure = useCallback(() => {
    stepRef.current = (cardRef.current?.offsetWidth ?? 0) + 16;
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const handleScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport || !stepRef.current) return;
    setActiveIndex(
      Math.min(
        projects.length - 1,
        Math.max(0, Math.round(viewport.scrollLeft / stepRef.current)),
      ),
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      !viewportRef.current
    )
      return;

    event.preventDefault();
    isPointerDraggingRef.current = true;
    pointerStartRef.current = {
      x: event.clientX,
      scrollLeft: viewportRef.current.scrollLeft,
    };
    viewportRef.current.style.scrollSnapType = "none";
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isPointerDraggingRef.current || !viewportRef.current) return;
    event.preventDefault();
    viewportRef.current.scrollLeft =
      pointerStartRef.current.scrollLeft -
      (event.clientX - pointerStartRef.current.x);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!isPointerDraggingRef.current || !viewportRef.current) return;
    isPointerDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const nextIndex = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(viewportRef.current.scrollLeft / stepRef.current)),
    );
    setActiveIndex(nextIndex);
    const viewport = viewportRef.current;
    const targetScrollLeft = nextIndex * stepRef.current;

    if (
      shouldReduceMotion ||
      Math.abs(viewport.scrollLeft - targetScrollLeft) < 1
    ) {
      viewport.scrollLeft = targetScrollLeft;
      viewport.style.scrollSnapType = "x mandatory";
      return;
    }

    const handleScrollEnd = () => {
      viewport.style.scrollSnapType = "x mandatory";
    };

    viewport.addEventListener("scrollend", handleScrollEnd, { once: true });
    viewport.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="projects-title"
      className="bg-[#fdfdfd] pb-24 pt-12 sm:pb-32 sm:pt-16"
    >
      <h2 id="projects-title" className="sr-only">
        Selected projects
      </h2>

      <div
        ref={viewportRef}
        className="project-slider-track flex cursor-grab snap-x snap-mandatory select-none gap-4 overflow-x-auto overscroll-x-contain px-[8vw] active:cursor-grabbing sm:px-[12vw]"
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {projects.map((project, index) => (
          <div
            ref={index === 0 ? cardRef : undefined}
            key={project.name}
            className="relative aspect-[16/10] w-[78vw] max-w-[64rem] shrink-0 snap-center overflow-hidden rounded-3xl bg-white ring-1 ring-black/10"
          >
            <Image
              src={project.image}
              alt={`${project.name} project preview`}
              fill
              sizes="(min-width: 1280px) 1024px, 78vw"
              className="pointer-events-none object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex min-h-14 items-start justify-center px-5 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={projects[activeIndex].name}
            className="flex w-full max-w-[64rem] items-center justify-between gap-6 px-5 sm:px-8"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 8, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -5, filter: "blur(4px)" }
            }
            transition={{
              type: "spring",
              bounce: 0,
              duration: shouldReduceMotion ? 0.12 : 0.3,
            }}
          >
            <div className="text-left">
              <p className="text-lg font-medium tracking-tight">
                {projects[activeIndex].name}
              </p>
              <p className="text-sm text-[#77756c]">
                {projects[activeIndex].type}
              </p>
            </div>
            <a
              href={projects[activeIndex].href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-black px-5 text-sm font-medium text-white transition-transform active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Visit
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
