"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { globalConfig } from "../../global.config";

const BUTTON_CLICK_VOLUME = globalConfig.sounds.enabled
  ? globalConfig.sounds.volumes.buttonClick
  : 0;

export default function Header() {
  const pathname = usePathname();
  const [playClick] = useSound(clickSoftSound, { volume: BUTTON_CLICK_VOLUME });

  const navItem = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => playClick()}
        className={`px-3 py-2 rounded-full text-sm transition-colors duration-150 ${
          active
            ? "bg-background text-foreground"
            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="flex items-center justify-between mb-12">
      <nav className="flex items-center gap-0.5 bg-accent p-1 rounded-full">
        {navItem("/", "Home")}
        {navItem("/playground", "Playground")}
      </nav>
      <Image
        src="/hero.gif"
        alt="Hero Image"
        width={80}
        height={80}
        className="rounded-full object-cover size-20 transition duration-200 hover:rotate-10"
        unoptimized
        priority
      />
    </header>
  );
}
