import { Navbar } from "@/components/Navbar";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { HeroSection } from "@/components/HeroSection";
import { PhotoShowcase } from "@/components/PhotoShowcase";
import { AboutSection } from "@/components/AboutSection";
import { AccommodationSection } from "@/components/AccommodationSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { ExploreSection } from "@/components/ExploreSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { VideoShortsSlider } from "@/components/VideoShortsSlider";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <RevealSection><PhotoShowcase /></RevealSection>
      <RevealSection><AboutSection /></RevealSection>
      <RevealSection><AccommodationSection /></RevealSection>
      <RevealSection><AmenitiesSection /></RevealSection>
      <RevealSection><ExploreSection /></RevealSection>
      <RevealSection><VideoShortsSlider /></RevealSection>
      <RevealSection><ContactSection /></RevealSection>
      <Footer />
      <WhatsAppChat />
    </main>
  );
};

export default Index;
