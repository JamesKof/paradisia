import paradasiaFloating1 from "@/assets/paradasia-floating-1.jpg";
import paradasiaJetski1 from "@/assets/paradasia-jetski-1.jpg";
import paradasiaBonfire from "@/assets/paradasia-bonfire.jpg";
import paradasiaSuiteLounge from "@/assets/paradasia-suite-lounge.jpg";
import paradasiaPresidentialArt from "@/assets/paradasia-presidential-art.jpg";
import paradasiaWineLagoon from "@/assets/paradasia-wine-lagoon.jpg";

const photos = [
  { src: paradasiaWineLagoon, title: "Sip, breathe, and let the lagoon tell its story", span: "col-span-2 row-span-2" },
  { src: paradasiaSuiteLounge, title: "Luxury interiors crafted for island living", span: "" },
  { src: paradasiaBonfire, title: "Nights lit by fire and African sky", span: "" },
  { src: paradasiaJetski1, title: "Unleash your wild side on Big Ada's estuary", span: "" },
  { src: paradasiaPresidentialArt, title: "Pan-African art meets modern elegance", span: "" },
  { src: paradasiaFloating1, title: "Drift into serenity — nature holds you here", span: "col-span-2" },
];

export const PhotoShowcase = () => {
  return (
    <section id="showcase" className="py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(28 90% 45%), hsl(28 92% 54%), hsl(35 95% 60%))' }}>
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block text-white/80 text-sm tracking-widest uppercase mb-2 font-semibold">
              Captured Moments
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-white">
              Experience <span className="text-white/90">Paradasia</span>
            </h2>
          </div>
          <a href="/gallery" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            View Gallery →
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[220px]">
          {photos.map((photo, index) => (
            <div key={index} className={`group relative rounded-2xl overflow-hidden shadow-elevation-4 hover:shadow-elevation-6 transition-all duration-500 hover:-translate-y-1 ${photo.span}`}>
              <img src={photo.src} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-white font-medium text-sm">{photo.title}</h3>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/50 rounded-2xl transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
