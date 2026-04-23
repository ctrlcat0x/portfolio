"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePreloaderDone } from "@/components/PreloaderProvider";
import type { Project } from "@/lib/projects";

type PlaygroundDetailContentProps = {
  project: Project;
};

const revealTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function PlaygroundDetailContent({
  project,
}: PlaygroundDetailContentProps) {
  const done = usePreloaderDone();

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={revealTransition}
      >
        <Header />
      </motion.div>

      <main className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ ...revealTransition, delay: done ? 0.08 : 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageSrc}
            alt={project.title}
            className="aspect-video w-full rounded-2xl object-cover"
          />
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 18 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ ...revealTransition, delay: done ? 0.14 : 0 }}
        >
          <h1 className="text-xl text-foreground sm:text-[1.75rem]">
            {project.title}
          </h1>
          <p className="mt-1 text-base text-muted-foreground sm:text-lg">
            {project.date}
          </p>

          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.description}
          </p>
        </motion.div>

        <motion.div
          className="mt-12 space-y-10"
          initial={{ opacity: 0, y: 18 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ ...revealTransition, delay: done ? 0.2 : 0 }}
        >
          {project.toc.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              className="scroll-mt-10"
              initial={{ opacity: 0, y: 18 }}
              animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{
                ...revealTransition,
                delay: done ? 0.24 + index * 0.06 : 0,
              }}
            >
              <h2 className="mb-3 text-sm text-foreground sm:text-base">
                {section.label}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {section.content}
              </p>
            </motion.section>
          ))}
        </motion.div>
      </main>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 18 }}
        animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ ...revealTransition, delay: done ? 0.34 : 0 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
