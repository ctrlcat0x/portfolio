"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  draggable?: boolean;
  className?: string;
  trackClassName?: string;
}

export default function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  draggable = false,
  className,
  trackClassName,
}: InfiniteSliderProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const translation = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const [groupSize, setGroupSize] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [loopKey, setLoopKey] = useState(0);
  const currentSpeed = isHovering && speedOnHover ? speedOnHover : speed;

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const measure = () => {
      setGroupSize(
        direction === "horizontal" ? group.offsetWidth : group.offsetHeight,
      );
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(group);
    return () => observer.disconnect();
  }, [direction]);

  useEffect(() => {
    void loopKey;
    animationRef.current?.stop();
    if (shouldReduceMotion || isDragging || groupSize <= 0) return;

    const cycleSize = groupSize + gap;
    const from = reverse ? -cycleSize : 0;
    const to = reverse ? 0 : -cycleSize;
    let current = translation.get();

    if (reverse) {
      if (current === 0) current = -cycleSize;
      while (current < -cycleSize) current += cycleSize;
      while (current > 0) current -= cycleSize;
    } else {
      while (current > 0) current -= cycleSize;
      while (current <= -cycleSize) current += cycleSize;
    }

    translation.set(current);
    const duration = Math.abs(to - current) / currentSpeed;

    animationRef.current = animate(translation, [current, to], {
      ease: "linear",
      duration,
      onComplete: () => {
        translation.set(from);
        setLoopKey((value) => value + 1);
      },
    });

    return () => animationRef.current?.stop();
  }, [
    currentSpeed,
    gap,
    groupSize,
    isDragging,
    loopKey,
    reverse,
    shouldReduceMotion,
    translation,
  ]);

  const axis = direction === "horizontal" ? "x" : "y";
  const groupClassName = cn(
    "flex shrink-0",
    direction === "horizontal" ? "flex-row" : "w-full flex-col",
    trackClassName,
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        drag={draggable ? axis : false}
        dragConstraints={false}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => {
          animationRef.current?.stop();
          setIsDragging(true);
        }}
        onDragEnd={() => setIsDragging(false)}
        onHoverStart={speedOnHover ? () => setIsHovering(true) : undefined}
        onHoverEnd={speedOnHover ? () => setIsHovering(false) : undefined}
        className={cn(
          "flex",
          direction === "horizontal" ? "w-max flex-row" : "w-full flex-col",
          draggable && "cursor-grab active:cursor-grabbing",
        )}
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap,
        }}
      >
        <div ref={groupRef} className={groupClassName} style={{ gap }}>
          {children}
        </div>
        <div aria-hidden="true" className={groupClassName} style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
