"use client";

import {
  type MotionStyle,
  motion,
  type SpringOptions,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";

export interface TiltProps {
  children: ReactNode;
  className?: string;
  style?: MotionStyle;
  rotationFactor?: number;
  isReverse?: boolean;
  springOptions?: SpringOptions;
}

export default function Tilt({
  children,
  className,
  style,
  rotationFactor = 8,
  isReverse = false,
  springOptions = { stiffness: 180, damping: 22, mass: 0.5 },
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, springOptions);
  const ySpring = useSpring(y, springOptions);
  const rotateX = useTransform(
    ySpring,
    [-0.5, 0.5],
    isReverse
      ? [rotationFactor, -rotationFactor]
      : [-rotationFactor, rotationFactor],
  );
  const rotateY = useTransform(
    xSpring,
    [-0.5, 0.5],
    isReverse
      ? [-rotationFactor, rotationFactor]
      : [rotationFactor, -rotationFactor],
  );
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        ...style,
        transform: shouldReduceMotion ? undefined : transform,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
