import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PhotoShowcase } from "@/components/PhotoShowcase";
import { AboutSection } from "@/components/AboutSection";
import { AccommodationSection } from "@/components/AccommodationSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { ExploreSection } from "@/components/ExploreSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PhotoShowcase />
      <AboutSection />
      <AccommodationSection />
      <AmenitiesSection />
      <ExploreSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
