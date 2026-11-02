import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import CardRevealSection from "@/components/CardRevealSection";
import FeaturesSection from "@/components/FeaturesSection";
import InsightsSection from "@/components/InsightsSection";
import FloatingSection from "@/components/FloatingSection";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExperienceSection />
      <CardRevealSection />
      <FeaturesSection />
      <InsightsSection />
      <FloatingSection />
      <PricingSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}