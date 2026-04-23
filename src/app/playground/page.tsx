"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import CardStroke from "@/components/odysseyui/card-stroke";
import { projects } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { usePreloaderDone } from "@/components/PreloaderProvider";
import Footer from "@/components/Footer";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { globalConfig } from "../../../global.config";

const BUTTON_CLICK_VOLUME = globalConfig.sounds.enabled
  ? globalConfig.sounds.volumes.buttonClick
  : 0;

export default function Playground() {
  const done = usePreloaderDone();
  const [playClick] = useSound(clickSoftSound, { volume: BUTTON_CLICK_VOLUME });

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Header />
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 18 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{
            duration: 0.55,
            delay: done ? 0.08 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="mb-10 text-base tracking-wide text-muted-foreground">
            Playground
          </p>

          <div className="space-y-14">
            {projects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.55,
                  delay: done ? 0.16 + index * 0.08 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* ── Header row ──────────────────────────────── */}
                <div className="mb-2 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="leading-none text-foreground/90 text-xl">
                      {project.title}
                    </span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-base text-muted-foreground sm:text-lg">
                      {project.date}
                    </span>
                  </div>
                  <Link
                    href={`/playground/${project.slug}`}
                    aria-label={`View ${project.title}`}
                    onClick={() => playClick()}
                  >
                    <Button variant="secondary" size="sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#000000"
                        viewBox="0 0 256 256"
                      >
                        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                      </svg>
                    </Button>
                  </Link>
                </div>

                {/* ── Description ─────────────────────────────── */}
                <p className="mb-5 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* ── Card preview ─────────────────────────────── */}
                <Link
                  href={`/playground/${project.slug}`}
                  className="block"
                  onClick={() => playClick()}
                >
                  <CardStroke
                    title={project.title}
                    description={project.description}
                    imageSrc={project.imageSrc}
                    accentStrokeColor={project.accentStrokeColor}
                    baseStrokeColor={project.baseStrokeColor}
                  />
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
        <Footer />
      </div>
    </main>
  );
}
