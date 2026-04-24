"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ButtonPulseDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onTap={() => {
          setPressed(true);
          setTimeout(() => setPressed(false), 200);
        }}
        className="relative w-full rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 font-medium transition-all active:scale-95"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={pressed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0 flex items-center justify-center text-sm"
        >
          ✓ Pressed!
        </motion.span>
        <span className={pressed ? "opacity-0" : "opacity-100"}>Click Me</span>
      </motion.button>

      <div className="rounded-lg bg-muted/50 p-4 border border-border">
        <p className="text-sm font-medium text-foreground mb-1">
          What's happening:
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The button scales to 0.97 on press — instant feedback that turns a
          dead click into a conversation.
        </p>
      </div>
    </div>
  );
}
