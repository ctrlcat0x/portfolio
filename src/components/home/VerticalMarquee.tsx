import Image from "next/image";
import InfiniteSlider from "./InfiniteSlider";
import ProgressiveBlur from "./ProgressiveBlur";

const marqueeItems = [
  { src: "/projects/spiderui.png", alt: "Spider UI component library" },
  { src: "/projects/watanuki.png", alt: "Watanuki docs infrastructure" },
  { src: "/projects/cartographer.png", alt: "Cartographer design utility" },
  { src: "/projects/wallzilla.png", alt: "Wallzilla live wallpaper app" },
  { src: "/projects/hydra.png", alt: "Hydra game launcher" },
];

export default function VerticalMarquee() {
  return (
    <div className="hero-marquee relative h-[56svh] min-h-[30rem] overflow-hidden lg:h-svh">
      <InfiniteSlider
        direction="vertical"
        speed={44}
        speedOnHover={22}
        gap={16}
        draggable
        className="h-full touch-none select-none"
        trackClassName="px-4 sm:px-6 lg:px-4"
      >
        {marqueeItems.map((item) => (
          <div
            key={item.src}
            className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl bg-[#202020]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="pointer-events-none object-cover"
              priority
            />
          </div>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        position="both"
        height="18%"
        backgroundColor="#111111"
        className="hero-progressive-blur"
      />
    </div>
  );
}
