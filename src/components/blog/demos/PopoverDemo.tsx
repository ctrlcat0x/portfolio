"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PopoverDemo() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <button
          ref={btnRef}
          onClick={() => setOpen((s) => !s)}
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-all active:scale-95"
        >
          Menu
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left top" }}
              className="absolute left-0 top-12 w-48 rounded-lg border border-border bg-card shadow-lg overflow-hidden z-50"
            >
              {[
                { icon: "📊", label: "Dashboard" },
                { icon: "⚙️", label: "Settings" },
                { icon: "🔔", label: "Notifications" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setOpen(false)}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3 border-b border-border/50 last:border-b-0"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-foreground">
                    {item.label}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="rounded-lg bg-muted/50 p-4 border border-border">
        <p className="text-sm font-medium text-foreground mb-1">
          transform-origin matters:
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This menu grows from the button it came from. Without
          transform-origin, popovers expand from the center—which looks wrong.
        </p>
      </div>
    </div>
  );
}
