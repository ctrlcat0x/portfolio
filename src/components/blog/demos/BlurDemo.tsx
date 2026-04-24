"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BlurDemo() {
  const [state, setState] = useState(0);
  const states = ["Initial", "Changing", "Complete"];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-border bg-muted/20 p-6 min-h-40 flex items-center justify-center overflow-hidden">
        <motion.div
          key={state}
          initial={
            state > 0
              ? { filter: "blur(0px)", opacity: 0 }
              : { filter: "blur(0px)", opacity: 1 }
          }
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-primary mb-2">
            {states[state]}
          </div>
          <p className="text-sm text-muted-foreground">
            State transition #{state}
          </p>
        </motion.div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setState((s) => Math.max(0, s - 1))}
          disabled={state === 0}
          className="flex-1 rounded-lg bg-muted px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-muted/80 transition-all active:scale-95"
        >
          Previous
        </button>
        <button
          onClick={() => setState((s) => Math.min(2, s + 1))}
          disabled={state === 2}
          className="flex-1 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-all active:scale-95"
        >
          Next
        </button>
      </div>

      <div className="rounded-lg bg-muted/50 p-4 border border-border">
        <p className="text-sm font-medium text-foreground mb-1">
          When nothing else works:
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Blur bridges visual gaps during state changes. It tricks the brain
          into perceiving smooth motion instead of two states swapping. Use
          sparingly.
        </p>
      </div>
    </div>
  );
}
