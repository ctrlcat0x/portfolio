"use client";

import Link from "next/link";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { Button } from "@/components/ui/button";
import { globalConfig } from "../../../global.config";
import type { Project } from "@/lib/projects";

interface PlaygroundDetailHeaderProps {
  project: Project;
}

export default function PlaygroundDetailHeader({
  project,
}: PlaygroundDetailHeaderProps) {
  const soundVolume = globalConfig.sounds.enabled
    ? globalConfig.sounds.volumes.buttonClick
    : 0;
  const [playClick] = useSound(clickSoftSound, { volume: soundVolume });

  return (
    <aside className="fixed left-10 top-20 z-10 flex flex-col gap-4">
      <Button variant="ghost">
        <Link
          href="/playground"
          onClick={() => playClick()}
          className="text-sm flex items-center gap-2"
        >
          <span className="mt-0.5">↩</span> <span>Back to Index</span>
        </Link>
      </Button>

      {project.toc.length > 0 && (
        <nav className="flex flex-col gap-2 ml-4">
          {project.toc.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {section.label}
            </a>
          ))}
        </nav>
      )}
    </aside>
  );
}
