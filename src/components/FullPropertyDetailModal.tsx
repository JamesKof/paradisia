import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Property shots (remaining)
import property1 from "@/assets/paradasia-property-1.jpg";
import pool from "@/assets/paradasia-pool.jpg";
import nightView from "@/assets/paradasia-night-1.jpg";
import sunset from "@/assets/paradasia-sunset-1.jpg";

// Interior highlights from cabin & villa
import cabinBed from "@/assets/cabin-interior-bed.jpg";
import cabinLiving from "@/assets/cabin-interior-living.jpg";
import villaLiving from "@/assets/villa-living-room.jpg";
import villaBedroom1 from "@/assets/villa-bedroom-1.jpg";
import villaLounge from "@/assets/villa-lounge.jpg";
import roomBed from "@/assets/paradasia-room-bed.jpg";

const propertyImages = [
  { src: property1, alt: "Paradasia property exterior with tropical gardens" },
  { src: pool, alt: "Resort pool surrounded by lush greenery" },
  { src: sunset, alt: "Stunning sunset over the island retreat" },
  { src: nightView, alt: "Paradasia at night with ambient lighting" },
  { src: villaLiving, alt: "Villa living room — included in full buyout" },
  { src: villaBedroom1, alt: "Villa master bedroom — included in full buyout" },
  { src: villaLounge, alt: "Villa lounge area — included in full buyout" },
  { src: cabinBed, alt: "Cabin bedroom — included in full buyout" },
  { src: cabinLiving, alt: "Cabin living area — included in full buyout" },
  { src: roomBed, alt: "Standard room — included in full buyout" },
];

interface FullPropertyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const FullPropertyDetailModal = ({ isOpen, onClose, onBookNow }: FullPropertyDetailModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => setCurrentSlide((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1));
  const goToNext = () => setCurrentSlide((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-y-auto bg-card border-border">
        {/* Image Slider */}
        <div className="relative h-[250px] sm:h-[320px] overflow-hidden flex-shrink-0">
          {propertyImages.map((img, i) => (
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

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {propertyImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === currentSlide ? "w-6 bg-brand-orange" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-brand-orange transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h2 className="font-display text-2xl text-foreground">Full Property Buyout</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Take over the entire Paradasia Hideaway for the ultimate private experience. This exclusive buyout includes 
            the standalone cabin, the luxurious 2-bedroom villa, and the elegant standard room — a total of three distinct 
            accommodations sleeping up to 10 guests. Enjoy unrestricted access to the private pool, waterfront lounge, 
            bonfire pit, and all resort amenities. Perfect for destination weddings, milestone celebrations, corporate 
            retreats, or simply claiming an entire island paradise as your own.
          </p>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {propertyImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === currentSlide ? "border-brand-orange" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <Button variant="orange" className="w-full" onClick={onBookNow}>
            Book Full Property
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
