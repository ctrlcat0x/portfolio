"use client";

import { useLayoutEffect, useRef } from "react";
import type React from "react";
import { useInView } from "motion/react";
import { annotate } from "rough-notation";
import { type RoughAnnotation } from "rough-notation/lib/model";

interface RectSnapshot {
  top: number;
  left: number;
  width: number;
  height: number;
}

const RECT_EPSILON = 0.5;
const REQUIRED_STABLE_FRAMES = 4;

function getRectSnapshot(element: HTMLElement): RectSnapshot {
  const { top, left, width, height } = element.getBoundingClientRect();

  return { top, left, width, height };
}

function hasRectChanged(previous: RectSnapshot, next: RectSnapshot) {
  return (
    Math.abs(previous.top - next.top) > RECT_EPSILON ||
    Math.abs(previous.left - next.left) > RECT_EPSILON ||
    Math.abs(previous.width - next.width) > RECT_EPSILON ||
    Math.abs(previous.height - next.height) > RECT_EPSILON
  );
}

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  enabled?: boolean;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  enabled = true,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  });

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = enabled && (!isView || isInView);

  useLayoutEffect(() => {
    const element = elementRef.current;
    let annotation: RoughAnnotation | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let frameId = 0;
    let lastRect: RectSnapshot | null = null;
    let stableFrameCount = 0;
    let resyncAnnotation: (() => void) | null = null;

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      };

      const currentAnnotation = annotate(element, annotationConfig);
      annotation = currentAnnotation;

      const syncAnnotation = () => {
        const nextRect = getRectSnapshot(element);

        if (!lastRect || hasRectChanged(lastRect, nextRect)) {
          lastRect = nextRect;
          stableFrameCount = 0;
          frameId = requestAnimationFrame(syncAnnotation);
          return;
        }

        stableFrameCount += 1;

        if (stableFrameCount < REQUIRED_STABLE_FRAMES) {
          frameId = requestAnimationFrame(syncAnnotation);
          return;
        }

        currentAnnotation.show();
      };

      resyncAnnotation = () => {
        currentAnnotation.hide();
        lastRect = null;
        stableFrameCount = 0;
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(syncAnnotation);
      };

      resizeObserver = new ResizeObserver(() => {
        resyncAnnotation?.();
      });

      resizeObserver.observe(element);
      window.addEventListener("resize", resyncAnnotation);
      frameId = requestAnimationFrame(syncAnnotation);
    }

    return () => {
      cancelAnimationFrame(frameId);
      annotation?.remove();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      if (resyncAnnotation) {
        window.removeEventListener("resize", resyncAnnotation);
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}
