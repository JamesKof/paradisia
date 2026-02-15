import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import cabinLounge from "@/assets/cabin-interior-lounge.jpg";
import cabinLiving from "@/assets/cabin-interior-living.jpg";
import cabinBedroom from "@/assets/cabin-interior-bedroom.jpg";
import cabinWide from "@/assets/cabin-interior-wide.jpg";
import cabinFan from "@/assets/cabin-interior-fan.jpg";
import cabinBed from "@/assets/cabin-interior-bed.jpg";

const cabinImages = [
  { src: cabinBed, alt: "Handcrafted mahogany bed with crisp white linens" },
  { src: cabinBedroom, alt: "Spacious bedroom with full-length mirror" },
  { src: cabinLiving, alt: "Open-plan living area with modern amenities" },
  { src: cabinWide, alt: "Wide view of the cabin interior" },
  { src: cabinFan, alt: "Cabin lounge with ceiling fan and natural light" },
  { src: cabinLounge, alt: "Cosy lounge with flat-screen TV" },
];

interface CabinDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const CabinDetailModal = ({ isOpen, onClose, onBookNow }: CabinDetailModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => setCurrentSlide((prev) => (prev === 0 ? cabinImages.length - 1 : prev - 1));
  const goToNext = () => setCurrentSlide((prev) => (prev === cabinImages.length - 1 ? 0 : prev + 1));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border">
        {/* Image Slider */}
        <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
          {cabinImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === currentSlide ? "opacity-100 animate-panoramic" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Nav Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-brand-orange transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-brand-orange transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Minimal line indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {cabinImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === currentSlide ? "w-6 bg-brand-orange" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-brand-orange transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h2 className="font-display text-2xl text-foreground">Cabin (Standalone)</h2>
          <p className="text-muted-foreground leading-relaxed">
            Retreat to your own private sanctuary — a beautifully appointed standalone cabin set amidst lush tropical
            greenery on Paradasia Island. Featuring warm hardwood floors, a handcrafted mahogany king-size bed dressed
            in crisp white linens, and a stylish open-plan living area with plush seating, flat-screen TV, mini fridge,
            and complimentary refreshment station. Floor-to-ceiling sheer curtains bathe the space in soft natural light,
            while air conditioning and a ceiling fan keep you perfectly comfortable. The ideal escape for couples or solo
            travellers seeking intimacy, peace, and island elegance.
          </p>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {cabinImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === currentSlide ? "border-brand-orange" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <Button variant="orange" className="w-full" onClick={onBookNow}>
            Book This Cabin
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
