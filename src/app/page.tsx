import { Header } from "@/components/Header";
import { HeroTeaser } from "@/components/HeroTeaser";
import { FinanzcoachingSection } from "@/components/FinanzcoachingSection";
import { FinancialImageSection } from "@/components/FinancialImageSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { TeaserSlider } from "@/components/TeaserSlider";
import { RatingsSection } from "@/components/RatingsSection";
import { KloppSection } from "@/components/KloppSection";
import { ArticleSlider } from "@/components/ArticleSlider";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <HeroTeaser />
        <FinanzcoachingSection />
        <FinancialImageSection />
        <AdvantagesSection />
        <TeaserSlider />
        <RatingsSection />
        <KloppSection />
        <ArticleSlider />
      </main>
      <Footer />
    </>
  );
}
