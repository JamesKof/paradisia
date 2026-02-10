import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import paradasiaWineLagoon from "@/assets/paradasia-wine-lagoon.jpg";
import paradasiaJetski1 from "@/assets/paradasia-jetski-1.jpg";
import paradasiaFloating1 from "@/assets/paradasia-floating-1.jpg";
import paradasiaBonfire from "@/assets/paradasia-bonfire.jpg";
import paradasiaSuiteLounge from "@/assets/paradasia-suite-lounge.jpg";
import paradasiaView from "@/assets/paradasia-view.jpg";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 3.76.92V6.69Z" />
  </svg>
);

// Curated TikTok videos from @paradasia.hideway
const shorts = [
  {
    id: "short1",
    videoId: "7559524720882765067",
    title: "Paradise Awaits at Paradasia Hideway",
    thumbnail: paradasiaWineLagoon,
  },
  {
    id: "short2",
    videoId: "7558025403663682828",
    title: "Panoramic Views of Big Ada",
    thumbnail: paradasiaView,
  },
  {
    id: "short3",
    videoId: "7602648414978886930",
    title: "Luxury Island Living in Ghana",
    thumbnail: paradasiaSuiteLounge,
  },
  {
    id: "short4",
    videoId: "7555418406397250828",
    title: "Thrilling Jetski Adventures",
    thumbnail: paradasiaJetski1,
  },
  {
    id: "short5",
    videoId: "7551715459763031307",
    title: "Serenity on the Water",
    thumbnail: paradasiaFloating1,
  },
  {
    id: "short6",
    videoId: "7559524720882765067",
    title: "Bonfire Nights",
    thumbnail: paradasiaBonfire,
  },
];

// Duplicate for seamless loop
const duplicatedShorts = [...shorts, ...shorts];

export const VideoShortsSlider = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="shorts" className="py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(28 90% 45%), hsl(28 92% 54%), hsl(35 95% 60%))' }}>
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block text-brand-blue-dark text-sm tracking-widest uppercase mb-2 font-semibold">
              Follow Us on TikTok
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-brand-blue-dark">
              Experience <span className="text-white">Paradasia</span>
            </h2>
          </div>
          <a
            href="https://www.tiktok.com/@paradasia.hideway"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-blue-dark hover:text-white transition-colors text-sm font-medium"
          >
            <TikTokIcon className="w-4 h-4" />
            View All →
          </a>
        </div>
      </div>

      {/* Sliding Cards Container */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-6 ${isPaused ? "" : "animate-scroll"}`}
          style={{
            width: "fit-content",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {duplicatedShorts.map((short, index) => (
            <div
              key={`${short.id}-${index}`}
              className="group relative w-[260px] sm:w-[300px] flex-shrink-0 cursor-pointer"
              onClick={() => setSelectedVideo(short.videoId)}
            >
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-elevation-4 transition-all duration-500 group-hover:shadow-elevation-6 group-hover:shadow-orange-glow group-hover:-translate-y-2">
                {/* Thumbnail */}
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/30 to-transparent" />
                
                {/* TikTok Badge */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <TikTokIcon className="w-4 h-4 text-white" />
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white shadow-lg">
                    <Play className="w-7 h-7 text-brand-blue-dark ml-1" fill="currentColor" />
                  </div>
                </div>
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-sm line-clamp-2">
                    {short.title}
                  </h3>
                </div>

                {/* White Border on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white rounded-2xl transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, hsl(28 90% 45%), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, hsl(35 95% 60%), transparent)' }} />
      </div>

      {/* TikTok Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-md p-0 bg-brand-blue-dark border-brand-blue overflow-hidden">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-brand-blue/80 text-brand-sky-light hover:bg-brand-orange hover:text-brand-blue-dark transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedVideo && (
            <div className="aspect-[9/16] w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.tiktok.com/embed/v2/${selectedVideo}`}
                title="Paradasia Hideway TikTok"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
