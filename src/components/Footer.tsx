import { Heart } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-dark border-t border-[hsl(var(--section-dark-border))]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Paradasia Hideway" className="h-16 w-auto" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="/#about" className="text-[hsl(var(--section-dark-muted))] hover:text-brand-orange transition-colors">About</a>
            <a href="/#accommodation" className="text-[hsl(var(--section-dark-muted))] hover:text-brand-orange transition-colors">Rooms</a>
            <a href="/#amenities" className="text-[hsl(var(--section-dark-muted))] hover:text-brand-orange transition-colors">Amenities</a>
            <a href="/#contact" className="text-[hsl(var(--section-dark-muted))] hover:text-brand-orange transition-colors">Contact</a>
            <a href="/gallery" className="text-[hsl(var(--section-dark-muted))] hover:text-brand-orange transition-colors">Gallery</a>
          </div>

          <div className="flex items-center gap-2 text-[hsl(var(--section-dark-muted))] text-sm">
            <span>© {currentYear} Paradasia Hideway</span>
            <Heart className="w-4 h-4 text-brand-orange fill-brand-orange" />
          </div>
        </div>
      </div>
    </footer>
  );
};
