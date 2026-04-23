export interface TocSection {
  id: string;
  label: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  description: string;
  imageSrc: string;
  accentStrokeColor: string;
  baseStrokeColor: string;
  toc: TocSection[];
}

export const projects: Project[] = [
  {
    slug: "sliding-numbers",
    title: "Sliding Numbers",
    date: "March 2026",
    description: "Spring-based animated digit counter",
    imageSrc: "/placeholder.png",
    accentStrokeColor: "#E0E0E0",
    baseStrokeColor: "#6366f1",
    toc: [
      {
        id: "overview",
        label: "Overview",
        content:
          "SlidingNumber animates each digit independently using Framer Motion springs. The component tracks numeric changes and animates digits through a clipped column, so transitions look physically natural.",
      },
      {
        id: "usage",
        label: "Usage",
        content:
          "Import the component and pass a numeric value. Set padStart to true to left-pad single-digit values with a zero — useful for clock displays. <SlidingNumber value={42} padStart />",
      },
      {
        id: "props",
        label: "Props",
        content:
          "value: number — the number to display. padStart?: boolean — pad single digits with a leading zero. The spring config (stiffness 280, damping 18, mass 0.3) is tuned for a snappy but smooth feel.",
      },
    ],
  },
  {
    slug: "card-stroke",
    title: "Card Stroke",
    date: "February 2026",
    description: "Hover-reveal card with animated SVG stroke paths",
    imageSrc: "/placeholder.png",
    accentStrokeColor: "#F9A8D4",
    baseStrokeColor: "#ec4899",
    toc: [
      {
        id: "overview",
        label: "Overview",
        content:
          "CardStroke renders an image card with two SVG path overlays. On mouseenter, GSAP animates the stroke dashoffset to draw the paths, then reveals the title and description word by word.",
      },
      {
        id: "animation",
        label: "Animation",
        content:
          "The stroke paths use strokeDasharray/strokeDashoffset technique — each path is measured at mount and its offset set to its full length. On hover the offset animates to zero, drawing the stroke across the card.",
      },
      {
        id: "props",
        label: "Props",
        content:
          "title, description, imageSrc, imageAlt, accentStrokeColor, baseStrokeColor, textColor, className. The two stroke colors map to the two separate SVG overlays.",
      },
    ],
  },
  {
    slug: "greeting-preloader",
    title: "Greeting Preloader",
    date: "January 2026",
    description: "Full-screen loader cycling through multilingual greetings",
    imageSrc: "/placeholder.png",
    accentStrokeColor: "#86EFAC",
    baseStrokeColor: "#22c55e",
    toc: [
      {
        id: "overview",
        label: "Overview",
        content:
          "GreetingPreloader renders a fixed full-screen overlay with a DynamicText component cycling through greetings. Once all greetings have played, the overlay slides up with GSAP revealing the page beneath.",
      },
      {
        id: "sequence",
        label: "Sequence",
        content:
          "Each greeting appears with a fade-up enter and exits with a fade-up exit via Framer Motion AnimatePresence. After the last greeting the handleComplete callback fires a GSAP timeline that slides the whole overlay off-screen.",
      },
      {
        id: "props",
        label: "Props",
        content:
          "greetings: array of { text, language }, intervalMs: delay between greetings (default 300ms), fullPage: whether to cover the viewport (default true), onComplete: callback fired after the slide-away animation.",
      },
    ],
  },
];
