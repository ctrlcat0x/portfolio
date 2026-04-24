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
    // Hide on small screens to avoid overlap; show at lg and above with fixed width
    <aside className="fixed left-10 top-20 z-10 hidden lg:flex w-56 flex-col gap-4">
      <div className="self-start">
        <Button variant="ghost" className="w-36 justify-start">
          <Link
            href="/playground"
            onClick={() => playClick()}
            className="text-sm flex items-center gap-2"
          >
            <span className="mt-0.5">↩</span> <span>Back to Index</span>
          </Link>
        </Button>
      </div>

      {project.toc.length > 0 && (
        <nav className="flex flex-col gap-2 ml-2 items-start">
          {project.toc.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-block text-sm max-w-56 whitespace-normal break-words leading-tight text-muted-foreground transition-colors hover:text-foreground"
            >
              {section.label}
            </a>
          ))}
        </nav>
      )}
    </aside>
  );
}
