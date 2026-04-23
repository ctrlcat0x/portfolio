"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSound } from "@/hooks/use-sound";
import { switchOnSound } from "@/lib/switch-on";
import { switchOffSound } from "@/lib/switch-off";
import { clickSoftSound } from "@/lib/click-soft";
import { SlidingNumber } from "@/components/SlidingNumber";
import { Button } from "@/components/ui/button";
import { globalConfig } from "../../global.config";
import { Kbd } from "./ui/kbd";

const THEME_TOGGLE_VOLUME = globalConfig.sounds.enabled
  ? globalConfig.sounds.volumes.themeToggle
  : 0;

const BUTTON_CLICK_VOLUME = globalConfig.sounds.enabled
  ? globalConfig.sounds.volumes.buttonClick
  : 0;

// ─── Cloud shape ─────────────────────────────────────────────────────────────
function CloudShape({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 80 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
      fill="currentColor"
    >
      <rect x="8" y="14" width="32" height="8" rx="2" fill="currentColor" />
      <rect x="12" y="9" width="12" height="7" rx="2" fill="currentColor" />
      <rect x="20" y="5" width="14" height="10" rx="2" fill="currentColor" />
      <rect x="30" y="9" width="8" height="7" rx="2" fill="currentColor" />
    </svg>
  );
}

// ─── Airplane SVG ───────────────────────────────────────────────────────────
function AirplaneSVG() {
  return (
    <svg
      width="200"
      height="120"
      viewBox="0 0 430 293"
      fill="none"
      className="w-50 h-30"
    >
      <path
        d="M27.9095 3.89433C19.3294 17.9124 15.2207 33.2598 15.2207 52.4742C15.2207 69.755 17.1542 78.2142 24.4049 92.9574C28.5137 101.417 31.414 105.284 41.3233 115.193C52.6828 126.552 53.4078 127.519 54.6163 133.924C59.0876 158.818 85.4318 185.646 122.048 202.806C155.16 218.274 208.936 230.842 243.86 231.204C255.824 231.325 258.845 230.963 259.812 229.513C261.504 226.733 259.449 226.25 241.081 224.679C198.06 221.295 155.16 210.661 123.74 195.676C99.5708 184.316 79.6313 168.244 69.1177 151.809C65.009 145.163 59.9335 132.957 60.9002 131.87C61.2628 131.507 65.4924 132.474 70.3262 133.924C80.7189 136.945 86.7611 137.066 94.9786 134.649C103.559 132.111 108.876 126.311 109.722 118.456C110.447 110.48 109.48 107.217 105.009 102.142C99.9333 96.341 92.6826 93.8033 83.1358 94.4075C70.447 95.2534 61.5045 101.296 57.154 111.809C55.9456 114.71 54.2537 117.126 53.287 117.126C50.8701 117.126 38.0605 103.35 33.3475 95.4951C19.4503 72.7762 18.0001 40.6313 29.4805 12.4743C31.8974 6.67378 33.4684 1.47743 33.1058 0.994049C31.8974 -0.939484 30.4472 -0.0935669 27.9095 3.89433ZM92.0783 101.417C97.7581 103.108 103.921 109.997 103.921 114.83C103.921 124.256 96.4288 129.815 83.3775 129.694C72.5014 129.694 61.6253 124.861 61.6253 120.027C61.6253 113.984 67.305 106.371 74.0724 103.108C80.9606 99.9664 85.1902 99.6038 92.0783 101.417Z"
        fill="#f8b304"
      ></path>
      <path
        d="M1.68618 47.6402C-2.54341 57.9121 1.80703 82.6854 7.84929 82.6854C10.7496 82.6854 10.7496 81.1144 8.45352 58.758C6.76168 42.2022 5.06985 39.5436 1.68618 47.6402Z"
        fill="#f8b304"
      ></path>
      <path
        d="M113.589 166.431C113.589 169.573 123.619 179.362 133.166 185.646C145.855 193.863 157.939 197.851 178.604 200.389C188.03 201.597 192.138 201.114 192.138 198.697C192.138 196.763 188.15 195.192 175.22 192.05C152.259 186.371 136.429 179.603 123.619 169.573C116.247 163.773 113.589 163.048 113.589 166.431Z"
        fill="#f8b304"
      ></path>
      <path
        d="M339.812 180.208C338.361 182.02 335.944 189.634 332.319 203.652L329.661 213.561L310.204 221.053C287.848 229.633 285.189 231.084 285.189 234.346C285.189 238.213 290.265 240.389 306.821 243.41C315.522 244.981 323.135 246.552 323.86 247.035C325.431 248.002 325.431 258.032 323.739 275.071C322.168 291.023 322.652 292.352 330.265 292.352C332.923 292.352 351.534 287.76 371.473 282.08C391.533 276.521 411.594 271.083 416.307 269.996C426.337 267.7 430.446 265.283 429.962 262.141C429.72 260.812 424.524 255.373 418.24 249.815C411.956 244.256 398.663 231.084 388.754 220.449C358.422 188.063 355.884 185.525 351.775 182.02C347.666 178.516 341.987 177.67 339.812 180.208ZM362.168 202.564C370.023 211.023 381.624 223.349 387.908 229.875C394.192 236.401 399.509 242.322 399.751 242.926C400.234 244.014 394.192 241.355 357.938 224.437C341.987 216.945 337.153 214.165 337.515 212.715C342.228 195.918 345.25 187.217 346.458 187.217C347.183 187.217 354.192 194.105 362.168 202.564ZM373.286 238.818C404.343 254.407 409.177 257.307 402.168 256.461C378.724 253.561 340.778 245.706 328.694 241.235C324.343 239.664 317.093 237.609 312.38 236.763C307.788 235.797 303.437 234.709 302.833 234.226C302.229 233.742 306.337 231.204 311.896 228.788C317.334 226.25 324.102 222.987 326.76 221.537L331.594 218.999L337.636 221.416C341.02 222.866 357.092 230.6 373.286 238.818ZM344.283 252.473C352.863 254.648 398.18 263.349 401.564 263.349C404.706 263.47 398.784 265.645 385.491 269.392C377.878 271.446 362.772 276.159 351.896 279.784C341.141 283.41 331.715 286.31 330.99 286.31C329.661 286.31 329.781 282.08 331.836 258.153C332.198 253.682 333.044 250.056 333.769 250.056C334.374 250.056 339.207 251.144 344.283 252.473Z"
        fill="#f8b304"
      ></path>
    </svg>
  );
}

interface LinkItem {
  label: string;
  href: string;
  icon?: string;
}

const links: LinkItem[] = [
  { label: "Resume", href: "/Sahil Rana Resume.pdf", icon: "↗" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/developer-sahil-rana",
    icon: "↗",
  },
  { label: "x.com", href: "https://www.x.com/ctrlcat0x", icon: "↗" },
];

type IndiaTime = {
  hour: number;
  minute: number;
  period: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getIndiaTimeParts(): IndiaTime {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date());

  const hour = Number.parseInt(
    parts.find((part) => part.type === "hour")?.value ?? "0",
    10,
  );
  const minute = Number.parseInt(
    parts.find((part) => part.type === "minute")?.value ?? "0",
    10,
  );
  const period = (
    parts.find((part) => part.type === "dayPeriod")?.value ?? "am"
  ).toLowerCase();

  return { hour, minute, period };
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [useSoundOn, setUseSoundOn] = useState(true);
  const [time, setTime] = useState<IndiaTime>({
    hour: 0,
    minute: 0,
    period: "am",
  });
  const [playSoundOn] = useSound(switchOnSound, {
    volume: THEME_TOGGLE_VOLUME,
  });
  const [playSoundOff] = useSound(switchOffSound, {
    volume: THEME_TOGGLE_VOLUME,
  });
  const [playClick] = useSound(clickSoftSound, { volume: BUTTON_CLICK_VOLUME });

  useEffect(() => {
    setMounted(true);
    setTime(getIndiaTimeParts());
    // Keep updating while user stays on-page so transitions happen exactly on tick.
    const id = setInterval(() => setTime(getIndiaTimeParts()), 1000);
    return () => clearInterval(id);
  }, []);

  // D key toggles theme
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "d" || e.ctrlKey || e.metaKey || e.altKey)
        return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted, resolvedTheme, setTheme]);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    if (useSoundOn) {
      playSoundOn();
    } else {
      playSoundOff();
    }
    setUseSoundOn(!useSoundOn);
  };

  const showNyanCat = globalConfig.playfulUi.footerNyanCat;

  return (
    <>
      {/* ─── Airplane + Links Section ──────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-8 mb-6">
        {/* Left: Airplane SVG */}
        <div className="shrink-0 hidden sm:block -rotate-5">
          <AirplaneSVG />
        </div>

        {/* Right: Links and Status */}
        <div className="flex-1 flex flex-col items-end justify-center gap-2">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={() => playClick()}
              target="_blank"
              className="flex items-center gap-2 text-sm text-foreground/80 transition-colors duration-150 hover:text-foreground"
            >
              <span>{link.label}</span>
              <span className="text-xs">{link.icon}</span>
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Available for work</span>
            <span className="size-3 bg-[#f8b304] rounded-none"></span>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between pt-6">
        <div className="flex flex-wrap items-end gap-1 text-xs leading-none text-muted-foreground">
          {mounted ? (
            <>
              <span className="inline-flex items-end leading-none tabular-nums">
                <SlidingNumber value={time.hour} padStart />
                <span className="mx-[0.08em]">:</span>
                <SlidingNumber value={time.minute} padStart />
                <span className="ml-1 lowercase">{time.period}</span>
              </span>
              <span>in Chandigarh, India</span>
            </>
          ) : (
            <span>Chandigarh, India</span>
          )}
        </div>

        {showNyanCat ? (
          <button
            onClick={toggleTheme}
            title="Toggle theme (D)"
            aria-label="Toggle light / dark theme"
            className="mb-4 shrink-0 cursor-pointer"
            type="button"
          >
            <div className="flex items-end gap-3">
              {/* cloud cluster at trail origin */}
              <div className="relative h-16 w-24 self-center">
                {/* back cloud – top right */}
                <CloudShape
                  className="absolute top-6 -right-17 h-8 w-20 text-muted-foreground"
                  style={{ filter: "drop-shadow(0 2px 4px rgb(0 0 0 / 0.3))" }}
                />
                {/* middle cloud */}
                <CloudShape
                  className="absolute top-8 -right-19 h-8 w-20 text-muted-foreground"
                  style={{ filter: "drop-shadow(0 3px 5px rgb(0 0 0 / 0.3))" }}
                />
                {/* front cloud – bottom right */}
                <CloudShape
                  className="absolute top-8 -right-12 h-7 w-16 text-muted-foreground"
                  style={{ filter: "drop-shadow(0 2px 3px rgb(0 0 0 / 0.3))" }}
                />
              </div>
              {/* nyan cat */}
              <Image
                src="/nyan-cat.gif"
                alt="nyan cat"
                width={68}
                height={52}
                className="h-14 w-auto"
                style={{ imageRendering: "pixelated" }}
                unoptimized
              />
            </div>
          </button>
        ) : (
          <Button
            className="mb-0.5 shrink-0 text-muted-foreground opacity-90"
            onClick={toggleTheme}
            title="Toggle theme (D)"
            aria-label="Toggle light / dark theme"
            type="button"
            size="sm"
            variant="ghost"
          >
            Toggle Theme <Kbd className="border">D</Kbd>
          </Button>
        )}
      </footer>
    </>
  );
}
