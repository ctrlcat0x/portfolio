"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react"
import {
  PauseIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"

export type Carousel003Slide = {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
}

export const DEFAULT_CAROUSEL_003_SLIDES: Carousel003Slide[] = [
  {
    id: "product-design",
    title: "Product design",
    description: "Turn complex product challenges into clear, useful experiences.",
    imageSrc: "/services/product-design.png",
    imageAlt: "A designer carrying an oversized key across a blue field",
  },
  {
    id: "web-design",
    title: "Web design",
    description: "Blueprint-led structure and expressive visuals give every page purpose.",
    imageSrc: "/services/web-design.png",
    imageAlt: "A cobalt blueprint grid arranged as a web layout",
  },
  {
    id: "app-design",
    title: "App design",
    description: "Thoughtful product flows help people move through complex tasks together.",
    imageSrc: "/services/collaboration.jpg",
    imageAlt: "Pixel-art hands reaching toward each other over a blue burst",
  },
  {
    id: "brand-identity",
    title: "Brand identity",
    description: "A coherent visual language makes your business recognizable and memorable.",
    imageSrc: "/services/brand-identity.png",
    imageAlt: "Cobalt puzzle pieces fitting together into a cohesive system",
  },
  {
    id: "web-development",
    title: "Web development",
    description: "Fast, accessible websites bring your business confidently online.",
    imageSrc: "/services/web-development.jpg",
    imageAlt: "A blue pixel-art dinosaur walking toward a cactus",
  },
  {
    id: "content-design",
    title: "Content design",
    description: "Clear content systems bring social, brand, layout, and illustration work together.",
    imageSrc: "/services/content-design.png",
    imageAlt: "A content planning board with notes for social media, branding, layout, and illustration",
  },
]

const SLIDE_TRANSITION = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1] as const,
}

const SPRING = { type: "spring" as const, stiffness: 520, damping: 24 }

export type Carousel003Props = {
  title: string
  slides?: Carousel003Slide[]
  interval?: number
  className?: string
}

function CarouselPagination({
  count,
  activeIndex,
  progress,
  onSelect,
}: {
  count: number
  activeIndex: number
  progress: number
  onSelect: (index: number) => void
}) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="tablist"
      aria-label="Carousel slides"
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => onSelect(index)}
            className="relative flex h-2 items-center justify-center focus-visible:outline-none"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className={cn(
                "block h-2 overflow-hidden rounded-full bg-foreground/20",
                isActive ? "w-10" : "w-2",
              )}
            >
              {isActive ? (
                <motion.span
                  className="block h-full rounded-full bg-foreground/80"
                  initial={false}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.08, ease: "linear" }}
                />
              ) : null}
            </motion.span>
          </button>
        )
      })}
    </div>
  )
}

const PILL_HEIGHT = "h-11"

function ControlPill({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-border/50 bg-background/70 px-4 shadow-sm backdrop-blur-md",
        PILL_HEIGHT,
        className,
      )}
    >
      {children}
    </div>
  )
}

function IconControlButton({
  label,
  onClick,
  children,
  className,
  ...props
}: {
  label: string
  onClick: () => void
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<typeof motion.button>, "children" | "onClick">) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={SPRING}
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground/80",
        "hover:bg-foreground/5 hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

function CarouselSlideImage({
  slide,
  direction,
}: {
  slide: Carousel003Slide
  direction: number
}) {
  const reducedMotion = useReducedMotion()
  const enterX = direction >= 0 ? "100%" : "-100%"
  const exitX = direction >= 0 ? "-100%" : "100%"

  return (
    <motion.div
      key={slide.id}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { x: enterX, opacity: 0, filter: "blur(12px)" }
      }
      animate={
        reducedMotion
          ? { opacity: 1 }
          : { x: 0, opacity: 1, filter: "blur(0px)" }
      }
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { x: exitX, opacity: 0, filter: "blur(12px)" }
      }
      transition={SLIDE_TRANSITION}
      className="absolute inset-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.imageSrc}
        alt={slide.imageAlt ?? "Carousel slide"}
        className="size-full object-cover"
        draggable={false}
      />
    </motion.div>
  )
}

export function Carousel003({
  title,
  slides = DEFAULT_CAROUSEL_003_SLIDES,
  interval = 4000,
  className,
}: Carousel003Props) {
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const progressRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(performance.now())

  const slideCount = slides.length

  const goTo = useCallback(
    (index: number, nextDirection = 1) => {
      if (slideCount === 0) return
      const clamped = Math.max(0, Math.min(index, slideCount - 1))
      setDirection(nextDirection)
      setActiveIndex(clamped)
      setProgress(0)
      progressRef.current = 0
      startRef.current = performance.now()
    },
    [slideCount],
  )

  const goNext = useCallback(() => {
    if (activeIndex >= slideCount - 1) {
      goTo(0, 1)
      return
    }
    goTo(activeIndex + 1, 1)
  }, [activeIndex, goTo, slideCount])

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((playing) => {
      if (playing) {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      } else {
        startRef.current =
          performance.now() - progressRef.current * interval
      }
      return !playing
    })
  }, [interval])

  const controlLabel = isPlaying ? "Pause slideshow" : "Play slideshow"
  const controlIcon = isPlaying ? PauseIcon : PlayIcon

  useEffect(() => {
    if (slideCount <= 1 || reducedMotion || !isPlaying) return

    startRef.current = performance.now() - progressRef.current * interval

    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const nextProgress = Math.min(elapsed / interval, 1)
      progressRef.current = nextProgress
      setProgress(nextProgress)

      if (nextProgress >= 1) {
        goNext()
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [
    activeIndex,
    goNext,
    interval,
    isPlaying,
    reducedMotion,
    slideCount,
  ])

  const activeSlide = slides[activeIndex]
  if (!activeSlide) return null

  return (
    <section
      className={cn(
        "mx-auto w-full max-w-5xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8",
        className,
      )}
      aria-roledescription="carousel"
      aria-label={title}
    >
      <header className="mb-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
              {activeSlide.title}
            </h2>
            <p className="mt-3 w-full whitespace-normal text-sm leading-relaxed text-neutral-600 md:whitespace-nowrap md:text-base lg:text-lg">
              {activeSlide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </header>

      <div>
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-[16/10] sm:rounded-3xl">
          <AnimatePresence initial={false} custom={direction}>
            <CarouselSlideImage
              key={activeSlide.id}
              slide={activeSlide}
              direction={direction}
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center px-3 sm:bottom-4 sm:px-4">
            <div className="flex max-w-full items-center gap-1.5 rounded-full sm:gap-2">
              <ControlPill className="max-w-[calc(100vw-6rem)] overflow-x-auto px-3 sm:px-4">
                <CarouselPagination
                  count={slideCount}
                  activeIndex={activeIndex}
                  progress={progress}
                  onSelect={(index) =>
                    goTo(index, index > activeIndex ? 1 : -1)
                  }
                />
              </ControlPill>

              <ControlPill className="w-11 shrink-0 px-0">
                <IconControlButton
                  label={controlLabel}
                  onClick={handleTogglePlay}
                >
                  <HugeiconsIcon
                    icon={controlIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </IconControlButton>
              </ControlPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
