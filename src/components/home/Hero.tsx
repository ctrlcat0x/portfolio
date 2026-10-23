import TimeGreeting from "./TimeGreeting";
import VerticalMarquee from "./VerticalMarquee";

const socialLinks = [
  { label: "Email", href: "mailto:developer.sahilrana@gmail.com" },
  { label: "GitHub", href: "https://github.com/ctrlcat0x" },
  { label: "Twitter", href: "https://x.com/ctrlcat0x" },
];

export default function Hero() {
  return (
    <section className="hero-grid min-h-svh overflow-hidden bg-[#111] text-[#f4f2eb]">
      <div className="flex min-h-[72svh] flex-col justify-between px-5 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10 lg:min-h-svh lg:px-10 lg:py-12 xl:px-14">
        <div className="max-w-[31rem]">
          <p className="text-[clamp(1.25rem,1.8vw,2rem)] leading-[1.12] tracking-[-0.035em] text-[#827f78]">
            <TimeGreeting />
          </p>
          <h1 className="text-[clamp(1.25rem,1.8vw,2rem)] font-medium leading-[1.12] tracking-[-0.035em]">
            I&apos;m Sahil Rana.
          </h1>
          <p className="mt-6 max-w-[24ch] text-[clamp(1.25rem,1.8vw,2rem)] leading-[1.12] tracking-[-0.035em] text-[#d4d1ca]">
            I design products and build them too. Currently creating animated
            components at{" "}
            <a
              href="https://spiderui.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-accent/50 underline-offset-4"
            >
              Spider UI
            </a>
            .
          </p>

          <div className="mt-12 max-w-[30rem] space-y-6 text-base leading-relaxed text-[#918e87] sm:text-lg">
            <p>
              Based in Chandigarh, India, I work where product design and
              engineering meet. I care about thoughtful systems, expressive
              interaction, and software that feels good to use.
            </p>
            <p>
              Previously, I contributed to Hydra Launcher. On the side, I build
              tools for designers and developers.
            </p>
          </div>
        </div>

        <nav
          aria-label="Social links"
          className="mt-20 flex flex-wrap items-center gap-x-3 text-base text-[#aaa79f]"
        >
          {socialLinks.map((link, index) => (
            <span key={link.label} className="inline-flex items-center gap-x-3">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>
      </div>

      <div aria-hidden="true" className="hidden lg:block" />

      <div>
        <VerticalMarquee />
      </div>
    </section>
  );
}
