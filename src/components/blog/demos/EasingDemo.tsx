"use client";

import { useState } from "react";

export default function EasingDemo() {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-xs font-semibold text-foreground">
              ease-in
            </span>
            <span className="text-xs text-muted-foreground">
              (feels sluggish)
            </span>
          </div>
          <div className="h-12 rounded-lg bg-muted/50 border border-border overflow-hidden">
            <div
              className="h-full w-4 rounded-md bg-red-500/60"
              style={{
                transform: active ? "translateX(210px)" : "translateX(0)",
                transition: "transform 0.4s ease-in",
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-xs font-semibold text-foreground">
              cubic-bezier(0.16, 1, 0.3, 1)
            </span>
            <span className="text-xs text-muted-foreground">(responsive)</span>
          </div>
          <div className="h-12 rounded-lg bg-muted/50 border border-primary/30 overflow-hidden">
            <div
              className="h-full w-4 rounded-md bg-primary"
              style={{
                transform: active ? "translateX(210px)" : "translateX(0)",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => setActive((s) => !s)}
        className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-all active:scale-95"
      >
        {active ? "Reset" : "Start"}
      </button>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Notice the red box with ease-in vs the primary box with a custom curve.
        The easing function determines whether motion feels sluggish or
        energetic.
      </p>
    </div>
  );
}
