import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import villaLiving from "@/assets/villa-living-room.jpg";
import villaLounge from "@/assets/villa-lounge.jpg";
import villaBedroom1 from "@/assets/villa-bedroom-1.jpg";
import villaBedroom2 from "@/assets/villa-bedroom-2.jpg";
import villaBedroom3 from "@/assets/villa-bedroom-3.jpg";
import villaEnsuite from "@/assets/villa-ensuite.jpg";

const villaImages = [
  { src: villaLiving, alt: "Elegant living room with African art and plush seating" },
  { src: villaLounge, alt: "Cosy lounge with flat-screen TV and chevron rug" },
  { src: villaBedroom1, alt: "Master bedroom with recessed ceiling lighting" },
  { src: villaBedroom2, alt: "Spacious second bedroom with natural light" },
  { src: villaBedroom3, alt: "Bedroom with en-suite bathroom access and wardrobe" },
  { src: villaEnsuite, alt: "En-suite bathroom with artisan mirror and wooden accents" },
];

interface VillaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const VillaDetailModal = ({ isOpen, onClose, onBookNow }: VillaDetailModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => setCurrentSlide((prev) => (prev === 0 ? villaImages.length - 1 : prev - 1));
  const goToNext = () => setCurrentSlide((prev) => (prev === villaImages.length - 1 ? 0 : prev + 1));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border">
        {/* Image Slider */}
        <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
          {villaImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === currentSlide ? "opacity-100" : "opacity-0"
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

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {villaImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentSlide ? "bg-brand-orange scale-125" : "bg-white/50"
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
        <div className="p-6 space-y-4">
          <h2 className="font-display text-2xl text-foreground">Villa – 2 Bedroom</h2>
          <p className="text-muted-foreground leading-relaxed">
            Step into a world of refined island living — the Paradasia 2-Bedroom Villa is a masterfully designed retreat
            where contemporary luxury meets warm Pan-African artistry. Two generously appointed bedrooms feature king-size
            beds dressed in premium linens, recessed ambient lighting, built-in wardrobes, and private en-suite bathrooms
            with artisan-crafted mirrors and stone-finish basins. The heart of the villa is a stunning open-plan living
            hall adorned with original African artwork, plush velvet seating, a chevron-patterned rug, and a
            flat-screen entertainment centre — perfect for unwinding after a day of island adventures. Floor-to-ceiling
            curtains frame tropical garden views, while air conditioning and ceiling fans ensure effortless comfort. Ideal
            for families, couples travelling together, or small groups seeking space, privacy, and an unforgettable stay.
          </p>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {villaImages.map((img, i) => (
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
            Book This Villa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
