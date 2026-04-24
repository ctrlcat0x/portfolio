"use client";

import { motion } from "framer-motion";
import { usePreloaderDone } from "@/components/PreloaderProvider";
import Header from "@/components/Header";
import Bio from "@/components/Bio";
import SelectedWorks from "@/components/SelectedWorks";
import Writings from "@/components/Writings";
import Journey from "@/components/Journey";
import Books from "@/components/Books";
import Footer from "@/components/Footer";

const SECTIONS = [
  { id: "header", Component: Header },
  { id: "bio", Component: Bio },
  { id: "selected-works", Component: SelectedWorks },
  { id: "journey", Component: Journey },
  { id: "writings", Component: Writings },
  { id: "books", Component: Books },
  { id: "footer", Component: Footer },
] as const;

export default function PageContent() {
  const done = usePreloaderDone();

  return (
    <>
      {SECTIONS.map(({ id, Component }, i) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 18 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{
            duration: 0.55,
            delay: done ? i * 0.09 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Component />
        </motion.div>
      ))}
    </>
  );
}
