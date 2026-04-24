"use client";

import { useState } from "react";

export default function TooltipDemo() {
  const [instant, setInstant] = useState(true);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);

  const groups = [
    { id: 1, label: "First", icon: "📝" },
    { id: 2, label: "Second", icon: "💾" },
    { id: 3, label: "Third", icon: "🔍" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-3">
          Hover over the buttons in sequence:
        </p>
        <div className="flex gap-2">
          {groups.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setHoveredGroup(item.id)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <button className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-all">
                {item.icon}
              </button>

              {hoveredGroup === item.id && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-card border border-border text-xs text-foreground whitespace-nowrap shadow-md"
                  style={{
                    transition: instant ? "none" : "all 0.2s ease-out",
                  }}
                >
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={instant}
          onChange={() => setInstant((s) => !s)}
          className="rounded"
        />
        <span className="text-sm text-muted-foreground">
          Instant tooltips on hover (no delay)
        </span>
      </label>

      <div className="rounded-lg bg-muted/50 p-4 border border-border">
        <p className="text-sm font-medium text-foreground mb-1">
          Context awareness:
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Once a tooltip appears, subsequent hovers should skip the delay. This
          makes rapid interactions feel instant, not sluggish.
        </p>
      </div>
    </div>
  );
}
