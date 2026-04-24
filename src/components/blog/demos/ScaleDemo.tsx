"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ScaleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setOpen((s) => !s)}
          className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-all active:scale-95"
        >
          {open ? "Close" : "Open"}
        </button>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.93, opacity: 0 }}
          animate={
            open ? { scale: 1, opacity: 1 } : { scale: 0.93, opacity: 0 }
          }
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <p className="text-sm font-medium text-foreground">
              Scale 0.93 → 1 creates natural unfold motion
            </p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Elements emerge from a slightly smaller state, mimicking real-world
            physics.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
