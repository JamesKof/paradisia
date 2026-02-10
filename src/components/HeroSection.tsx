import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/paradasia-cover.jpg";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full scale-110">
        <img
          src={heroBg}
          alt="Paradasia Hideway aerial view"
          className="w-full h-full object-cover blur-[2px]"
        />
      </div>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      
      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 0% / 0.5) 100%)'
      }} />

      {/* Floating panels */}
      <div className="absolute top-[15%] left-[5%] w-48 h-48 md:w-72 md:h-72 rounded-3xl bg-brand-orange/5 backdrop-blur-md border border-brand-orange/10 rotate-12 animate-float hidden sm:block" />
      <div className="absolute bottom-[20%] right-[8%] w-40 h-40 md:w-56 md:h-56 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 -rotate-6 animate-float animation-delay-300 hidden sm:block" />
      
      {/* Lens flare */}
      <div className="absolute top-0 right-[20%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-20" style={{
        background: 'radial-gradient(circle, hsl(28 92% 54% / 0.4), transparent 70%)',
        filter: 'blur(60px)',
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 mb-6 sm:mb-8 text-brand-orange border border-brand-orange/30 rounded-full text-xs sm:text-sm tracking-[0.2em] uppercase bg-black/30 backdrop-blur-xl shadow-[0_4px_30px_hsl(28_92%_54%/0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            Big Ada, Ghana
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 sm:mb-6 animate-fade-in-up animation-delay-100 leading-[0.9] tracking-tight">
          <span className="text-white drop-shadow-[0_2px_20px_hsl(0_0%_100%/0.2)]">Paradasia</span>
          <span className="block text-orange-gradient drop-shadow-[0_2px_30px_hsl(28_92%_54%/0.4)] mt-1 sm:mt-2">Hideway</span>
        </h1>

        <div className="animate-fade-in-up animation-delay-200">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-3 sm:mb-4 font-light max-w-3xl mx-auto leading-relaxed px-2">
            Culture blended in tour, good food, good music, clean beaches.
          </p>
        </div>

        <div className="animate-fade-in-up animation-delay-300">
          <div className="inline-block px-4 sm:px-8 py-3 sm:py-4 rounded-2xl bg-black/25 backdrop-blur-lg border border-white/10 mb-8 sm:mb-10">
            <p className="text-sm sm:text-base lg:text-lg text-white/60 max-w-2xl mx-auto">
              Your exclusive island sanctuary near Aqua Safari — where Pan-African luxury meets aquatic serenity.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up animation-delay-400">
          <a href="#accommodation">
            <Button variant="hero" size="xl" className="w-full sm:w-auto min-w-[200px] shadow-[0_8px_30px_hsl(28_92%_54%/0.3)]">
              Book Your Escape
            </Button>
          </a>
          <a href="#about">
            <Button variant="hero-outline" size="xl" className="w-full sm:w-auto min-w-[200px] backdrop-blur-sm">
              Explore Paradasia
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-float z-10">
        <a
          href="#showcase"
          className="flex flex-col items-center gap-2 text-white/50 hover:text-brand-orange transition-colors"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase">Discover</span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>
    </section>
  );
};
