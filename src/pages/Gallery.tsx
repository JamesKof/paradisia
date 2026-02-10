import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Import all Paradasia images
import paradasiaCover from "@/assets/paradasia-cover.jpg";
import paradasiaAerial1 from "@/assets/paradasia-aerial-1.jpg";
import paradasiaAerial2 from "@/assets/paradasia-aerial-2.jpg";
import paradasiaAerial3 from "@/assets/paradasia-aerial-3.jpg";
import paradasiaPool from "@/assets/paradasia-pool.jpg";
import paradasiaNight1 from "@/assets/paradasia-night-1.jpg";
import paradasiaNight2 from "@/assets/paradasia-night-2.jpg";
import paradasiaSunset1 from "@/assets/paradasia-sunset-1.jpg";
import paradasiaSunset2 from "@/assets/paradasia-sunset-2.jpg";
import paradasiaView from "@/assets/paradasia-view.jpg";
import paradasiaProperty1 from "@/assets/paradasia-property-1.jpg";
import paradasiaProperty2 from "@/assets/paradasia-property-2.jpg";
import paradasiaAerialNight from "@/assets/paradasia-aerial-night.jpg";
import paradasiaBoatRide from "@/assets/paradasia-boat-ride.jpg";
import paradasiaWineLagoon from "@/assets/paradasia-wine-lagoon.jpg";
import paradasiaBonfire from "@/assets/paradasia-bonfire.jpg";
import paradasiaDawnCruise from "@/assets/paradasia-dawn-cruise.jpg";
import paradasiaJetski1 from "@/assets/paradasia-jetski-1.jpg";
import paradasiaJetski2 from "@/assets/paradasia-jetski-2.jpg";
import paradasiaJetski3 from "@/assets/paradasia-jetski-3.jpg";
import paradasiaFloating1 from "@/assets/paradasia-floating-1.jpg";
import paradasiaFloating2 from "@/assets/paradasia-floating-2.jpg";

const galleryImages = [
  {
    id: 1,
    src: paradasiaAerialNight,
    title: "Where the night whispers luxury — Paradasia from above",
    category: "Night Views",
  },
  {
    id: 2,
    src: paradasiaBoatRide,
    title: "Race through paradise — the estuary is your playground",
    category: "Adventures",
  },
  {
    id: 3,
    src: paradasiaWineLagoon,
    title: "Sip, breathe, and let the lagoon tell its story",
    category: "Lifestyle",
  },
  {
    id: 4,
    src: paradasiaBonfire,
    title: "Let the bonfire light your soul under swaying palms",
    category: "Night Views",
  },
  {
    id: 5,
    src: paradasiaDawnCruise,
    title: "First light on golden waters — mornings made for explorers",
    category: "Adventures",
  },
  {
    id: 6,
    src: paradasiaJetski1,
    title: "Unleash your wild side on Big Ada's waters",
    category: "Adventures",
  },
  {
    id: 7,
    src: paradasiaJetski2,
    title: "Sun-kissed and fearless — this is island living",
    category: "Adventures",
  },
  {
    id: 8,
    src: paradasiaJetski3,
    title: "Feel the breeze, own the moment",
    category: "Adventures",
  },
  {
    id: 9,
    src: paradasiaFloating1,
    title: "Drift into serenity — the water holds you here",
    category: "Lifestyle",
  },
  {
    id: 10,
    src: paradasiaFloating2,
    title: "Surrender to nature's embrace at Paradasia",
    category: "Lifestyle",
  },
  {
    id: 11,
    src: paradasiaCover,
    title: "Paradasia Hideway — your island sanctuary",
    category: "Night Views",
  },
  {
    id: 12,
    src: paradasiaAerial1,
    title: "Aerial View of Big Ada",
    category: "Aerial",
  },
  {
    id: 13,
    src: paradasiaAerial2,
    title: "Resort from Above",
    category: "Aerial",
  },
  {
    id: 14,
    src: paradasiaAerial3,
    title: "Island Paradise",
    category: "Aerial",
  },
  {
    id: 15,
    src: paradasiaPool,
    title: "Luxury Pool Area",
    category: "Amenities",
  },
  {
    id: 16,
    src: paradasiaNight1,
    title: "Evening Ambiance",
    category: "Night Views",
  },
  {
    id: 17,
    src: paradasiaNight2,
    title: "Nighttime Serenity",
    category: "Night Views",
  },
  {
    id: 18,
    src: paradasiaSunset1,
    title: "Golden Hour at Paradasia",
    category: "Sunset",
  },
  {
    id: 19,
    src: paradasiaSunset2,
    title: "Sunset over Big Ada",
    category: "Sunset",
  },
  {
    id: 20,
    src: paradasiaView,
    title: "Panoramic Vista",
    category: "Views",
  },
  {
    id: 21,
    src: paradasiaProperty1,
    title: "Property Grounds",
    category: "Property",
  },
  {
    id: 22,
    src: paradasiaProperty2,
    title: "Resort Landscape",
    category: "Property",
  },
];

const categories = ["All", "Adventures", "Lifestyle", "Night Views", "Aerial", "Sunset", "Views", "Property", "Amenities"];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-brand-blue-dark">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block text-brand-orange text-sm tracking-widest uppercase mb-4">
            Visual Journey
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-sky-light mb-6">
            Photo <span className="text-brand-orange">Gallery</span>
          </h1>
          <p className="text-brand-sky/80 text-lg max-w-2xl mx-auto">
            Explore the breathtaking beauty of Paradasia Hideway through our collection
            of stunning photographs capturing every magical moment.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-brand-orange text-brand-blue-dark shadow-orange-glow"
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
              <div
                key={image.id}
                className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-2xl shadow-elevation-3 hover:shadow-elevation-5 transition-all duration-500"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-brand-orange text-xs tracking-wider uppercase mb-1">
                    {image.category}
                  </span>
                  <h3 className="text-white font-display text-lg">{image.title}</h3>
                </div>
                
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ZoomIn className="w-5 h-5 text-brand-blue-dark" />
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
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0 bg-brand-blue-dark/95 backdrop-blur-xl border-brand-blue overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          {selectedImage !== null && (
            <div className="relative flex items-center justify-center min-h-[60vh]">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-brand-blue/80 text-brand-sky-light hover:bg-brand-orange hover:text-brand-blue-dark transition-colors flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 z-50 w-12 h-12 rounded-full bg-brand-blue/80 text-brand-sky-light hover:bg-brand-orange hover:text-brand-blue-dark transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="max-w-full max-h-[80vh] p-4">
                <img
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-elevation-6"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 z-50 w-12 h-12 rounded-full bg-brand-blue/80 text-brand-sky-light hover:bg-brand-orange hover:text-brand-blue-dark transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-blue-dark to-transparent">
                <div className="text-center">
                  <span className="text-brand-orange text-sm tracking-wider uppercase">
                    {filteredImages[selectedImage].category}
                  </span>
                  <h3 className="text-white font-display text-xl mt-1">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <p className="text-brand-sky/60 text-sm mt-2">
                    {selectedImage + 1} / {filteredImages.length}
                  </p>
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
