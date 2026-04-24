"use client";

import { motion } from "framer-motion";

const transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

interface BlogRevealProps {
  children: React.ReactNode;
  delay?: number;
}

/**
 * Client-side reveal wrapper used to animate server-rendered blog content
 * (including RSC MDXRemote output) into view on page load.
 */
export default function BlogReveal({ children, delay = 0 }: BlogRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}
