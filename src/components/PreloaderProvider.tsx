"use client";

import { createContext, useContext, useState } from "react";
import GreetingPreloader from "@/components/odysseyui/greetings-preloader";
import { globalConfig } from "../../global.config";

interface PreloaderContextValue {
  done: boolean;
}

const PreloaderContext = createContext<PreloaderContextValue>({ done: false });

export function usePreloaderDone() {
  return useContext(PreloaderContext).done;
}

const GREETINGS = [
  { text: "Hello", language: "English" },
  { text: "Bonjour", language: "French" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Hola", language: "Spanish" },
  { text: "Ciao", language: "Italian" },
  { text: "Hallo", language: "German" },
  { text: "नमस्ते", language: "Hindi" },
  { text: "こんにちは", language: "Japanese" },
];

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const preloaderEnabled = globalConfig.features.preloader;
  const [done, setDone] = useState(() => !preloaderEnabled);

  return (
    <PreloaderContext.Provider value={{ done }}>
      {preloaderEnabled ? (
        <GreetingPreloader
          greetings={GREETINGS}
          onComplete={() => queueMicrotask(() => setDone(true))}
        />
      ) : null}
      {children}
    </PreloaderContext.Provider>
  );
}
