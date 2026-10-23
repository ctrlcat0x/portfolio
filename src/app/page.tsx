import BlogGrid from "@/components/home/BlogGrid";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import ProjectSlider from "@/components/home/ProjectSlider";
import { Carousel003 } from "@/components/home/Carousel003";
import TornTransition from "@/components/home/TornTransition";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <TornTransition direction="top" />
      <Carousel003 title="Services" />
      <ProjectSlider />
      <BlogGrid />
      <TornTransition direction="bottom" />
      <Footer />
    </main>
  );
}
