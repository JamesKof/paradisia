import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Import Paradasia images
import paradasiaView from "@/assets/paradasia-view.jpg";
import paradasiaWineLagoon from "@/assets/paradasia-wine-lagoon.jpg";
import paradasiaBonfire from "@/assets/paradasia-bonfire.jpg";
import paradasiaJetski1 from "@/assets/paradasia-jetski-1.jpg";
import paradasiaJetski2 from "@/assets/paradasia-jetski-2.jpg";
import paradasiaJetski3 from "@/assets/paradasia-jetski-3.jpg";
import paradasiaFloating1 from "@/assets/paradasia-floating-1.jpg";
import paradasiaFloating2 from "@/assets/paradasia-floating-2.jpg";
import presidentialSuite from "@/assets/presidential-suite.jpg";
import standardRoom from "@/assets/standard-room.jpg";
import suiteLounge from "@/assets/paradasia-suite-lounge.jpg";
import suiteBed from "@/assets/paradasia-suite-bed.jpg";
import suiteLiving from "@/assets/paradasia-suite-living.jpg";
import roomBed from "@/assets/paradasia-room-bed.jpg";
import roomEnsuite from "@/assets/paradasia-room-ensuite.jpg";
import presidentialLounge from "@/assets/paradasia-presidential-lounge.jpg";
import presidentialArt from "@/assets/paradasia-presidential-art.jpg";
import beachFashion from "@/assets/paradasia-beach-fashion.jpg";
import boatRide from "@/assets/paradasia-boat-ride.jpg";
import loungeTV from "@/assets/paradasia-lounge-tv.jpg";
import night1 from "@/assets/paradasia-night-1.jpg";
import night2 from "@/assets/paradasia-night-2.jpg";
import sunset1 from "@/assets/paradasia-sunset-1.jpg";
import sunset2 from "@/assets/paradasia-sunset-2.jpg";
import property1 from "@/assets/paradasia-property-1.jpg";
import pool from "@/assets/paradasia-pool.jpg";
import dawnCruise from "@/assets/paradasia-dawn-cruise.jpg";

const galleryImages = [
  { id: 3, src: paradasiaWineLagoon, title: "Sip, breathe, and let the lagoon tell its story", category: "Lifestyle" },
  { id: 4, src: paradasiaBonfire, title: "Let the bonfire light your soul under swaying palms", category: "Night Views" },
  { id: 6, src: paradasiaJetski1, title: "Unleash your wild side on Big Ada's waters", category: "Adventures" },
  { id: 7, src: paradasiaJetski2, title: "Sun-kissed and fearless — this is island living", category: "Adventures" },
  { id: 8, src: paradasiaJetski3, title: "Feel the breeze, own the moment", category: "Adventures" },
  { id: 9, src: paradasiaFloating1, title: "Drift into serenity — the water holds you here", category: "Lifestyle" },
  { id: 10, src: paradasiaFloating2, title: "Surrender to nature's embrace at Paradasia", category: "Lifestyle" },
  { id: 20, src: paradasiaView, title: "Panoramic Vista", category: "Views" },
  { id: 23, src: presidentialSuite, title: "The Presidential Suite — where African royalty rests", category: "Rooms" },
  { id: 24, src: standardRoom, title: "Warm elegance in every corner of your island room", category: "Rooms" },
  { id: 25, src: suiteLounge, title: "Sink into comfort — your private island lounge awaits", category: "Rooms" },
  { id: 26, src: suiteBed, title: "Handcrafted mahogany beds for nights of pure bliss", category: "Rooms" },
  { id: 27, src: suiteLiving, title: "Island breezes through sheer curtains — suite life", category: "Rooms" },
  { id: 28, src: roomBed, title: "Rest easy — nature's lullaby is just outside your window", category: "Rooms" },
  { id: 29, src: roomEnsuite, title: "Thoughtful details make every stay unforgettable", category: "Rooms" },
  { id: 30, src: presidentialLounge, title: "Golden evenings in the Presidential lounge", category: "Rooms" },
  { id: 31, src: presidentialArt, title: "Pan-African art adorns your sanctuary", category: "Rooms" },
  { id: 32, src: beachFashion, title: "Golden hour glamour on Paradasia's shores", category: "Lifestyle" },
  { id: 33, src: boatRide, title: "Cruise the estuary with our expert guides", category: "Adventures" },
  { id: 34, src: loungeTV, title: "Modern comfort meets island warmth", category: "Rooms" },
  { id: 35, src: night1, title: "Firelit elegance under the African night sky", category: "Night Views" },
  { id: 36, src: night2, title: "Evening whispers in a hammock by the palms", category: "Night Views" },
  { id: 37, src: sunset1, title: "Golden sun melting into Big Ada's waters", category: "Views" },
  { id: 38, src: sunset2, title: "Silhouette of serenity at sunset", category: "Views" },
  { id: 39, src: property1, title: "Lush island pathways to your sanctuary", category: "Views" },
  { id: 40, src: pool, title: "Dream deeply in cloud-white comfort", category: "Rooms" },
  { id: 41, src: dawnCruise, title: "Your private speedboat awaits on the shore", category: "Adventures" },
];

const categories = ["All", "Rooms", "Adventures", "Lifestyle", "Night Views", "Views"];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredImages = activeCategory === "All" ? galleryImages : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const goToPrevious = () => { if (selectedImage !== null) setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1); };
  const goToNext = () => { if (selectedImage !== null) setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1); };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 section-dark">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block text-brand-orange text-sm tracking-widest uppercase mb-4">Visual Journey</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--section-dark-text))] mb-6">
            Photo <span className="text-brand-orange">Gallery</span>
          </h1>
          <p className="text-[hsl(var(--section-dark-muted))] text-lg max-w-2xl mx-auto">
            Explore the breathtaking beauty of Paradasia Hideway through our collection of stunning photographs capturing every magical moment.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-brand-orange text-white shadow-orange-glow"
                    : "bg-card text-muted-foreground hover:text-brand-orange border border-border hover:border-brand-orange/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image, index) => (
              <div key={image.id} className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-2xl shadow-elevation-3 hover:shadow-elevation-5 transition-all duration-500" onClick={() => openLightbox(index)}>
                <img src={image.src} alt={image.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-brand-orange text-xs tracking-wider uppercase mb-1">{image.category}</span>
                  <h3 className="text-white font-display text-lg">{image.title}</h3>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ZoomIn className="w-5 h-5 text-foreground" />
                </div>
              </div>
            ))}
          </div>
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 backdrop-blur-xl border-border overflow-hidden" onKeyDown={handleKeyDown}>
          {selectedImage !== null && (
            <div className="relative flex items-center justify-center min-h-[60vh]">
              <button onClick={closeLightbox} className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center">
                <X className="w-6 h-6" />
              </button>
              <button onClick={goToPrevious} className="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="max-w-full max-h-[80vh] p-4">
                <img src={filteredImages[selectedImage].src} alt={filteredImages[selectedImage].title} className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-elevation-6" />
              </div>
              <button onClick={goToNext} className="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center">
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <div className="text-center">
                  <span className="text-brand-orange text-sm tracking-wider uppercase">{filteredImages[selectedImage].category}</span>
                  <h3 className="text-white font-display text-xl mt-1">{filteredImages[selectedImage].title}</h3>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
};

export default Gallery;
