"use client";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface Greeting {
  text: string;
  language: string;
}

interface DynamicTextProps {
  onComplete?: () => void;
  greetingList?: Greeting[];
  intervalMs?: number;
}

const defaultGreetings: Greeting[] = [
  { text: "Hello", language: "English" },
  { text: "Bonjour", language: "French" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Hola", language: "Spanish" },
  { text: "Ciao", language: "Italian" },
  { text: "Hallo", language: "German" },
  { text: "नमस्ते", language: "Hindi" },
  { text: "こんにちは", language: "Japanese" },
];

function DynamicText({
  onComplete,
  greetingList,
  intervalMs = 300,
}: DynamicTextProps) {
  const greetings =
    greetingList && greetingList.length > 0 ? greetingList : defaultGreetings;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          if (onComplete) onComplete();
          return prevIndex;
        }
        return nextIndex;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isAnimating, greetings, onComplete, intervalMs]);

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  return (
    <section
      className="flex min-h-50 items-center justify-center gap-1 p-4"
      aria-label="Rapid greetings in different languages"
    >
      <div className="relative flex h-16 w-[min(90vw,28rem)] items-center justify-center overflow-visible">
        {isAnimating ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              className="absolute flex items-center gap-2 whitespace-nowrap text-foreground"
              aria-live="off"
              initial={textVariants.hidden}
              animate={textVariants.visible}
              exit={textVariants.exit}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div
                className="h-2 w-2 rounded-full bg-foreground shrink-0"
                aria-hidden="true"
              />
              <span
                style={{ fontFamily: "'Autography', cursive" }}
                className="whitespace-nowrap text-4xl xl:text-5xl"
              >
                {greetings[currentIndex].text}
              </span>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center gap-2 whitespace-nowrap text-foreground">
            <div
              className="h-2 w-2 rounded-full bg-foreground shrink-0"
              aria-hidden="true"
            />
            <span
              style={{ fontFamily: "'Autography', cursive" }}
              className="whitespace-nowrap text-4xl xl:text-5xl"
            >
              {greetings[currentIndex].text}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default function GreetingPreloader({
  greetings,
  intervalMs = 300,
  fullPage = true,
  onComplete: onExternalComplete,
}: {
  greetings?: Greeting[];
  intervalMs?: number;
  fullPage?: boolean;
  onComplete?: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.set(overlay, { y: 0 });

    if (!fullPage) return;

    overlay.style.zIndex = "11000";
    gsap.set(overlay, { zIndex: 11000 });
  }, [fullPage]);

  const handleComplete = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Signal page content to start fading in as the overlay begins lifting
    onExternalComplete?.();

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.8 },
      onComplete: () => setDone(true),
    });

    tl.to(overlay, { yPercent: -110, duration: 1 });
  };

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className={
        fullPage
          ? "fixed inset-0 z-9999 flex items-center justify-center bg-background"
          : "absolute inset-0 z-20 flex items-center justify-center bg-background"
      }
    >
      <div className="text-center">
        <DynamicText
          onComplete={handleComplete}
          greetingList={greetings}
          intervalMs={intervalMs}
        />
      </div>
    </div>
  );
}
