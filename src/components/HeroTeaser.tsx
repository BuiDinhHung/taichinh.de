import { heroSlides } from "@/lib/content";
import { HeroSlider } from "@/components/HeroSlider";

export function HeroTeaser() {
  return <HeroSlider slides={heroSlides} autoPlayInterval={6000} />;
