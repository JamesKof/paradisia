import { useState } from "react";
import { Home, Building2, Castle, Users, Wifi, Wind, Coffee, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import { CabinDetailModal } from "@/components/CabinDetailModal";
import { VillaDetailModal } from "@/components/VillaDetailModal";
import { ROOM_PRICING } from "@/lib/roomTypes";
import cabinBed from "@/assets/cabin-interior-bed.jpg";
import villaLiving from "@/assets/villa-living-room.jpg";
import roomBed from "@/assets/paradasia-room-bed.jpg";

const rooms = [
  {
    id: "cabin" as const,
    name: "Cabin (Standalone)",
    pricing: ROOM_PRICING.cabin,
    image: cabinBed,
    description: "A beautifully appointed private cabin with handcrafted mahogany bed, open-plan living area, flat-screen TV, and warm hardwood floors — your intimate island sanctuary.",
    features: ["King-Size Bed", "Living Area", "Mini Fridge", "Air Conditioning"],
    hasDetailView: true,
    guests: "2 Guests",
    icon: Home,
  },
  {
    id: "villa" as const,
    name: "Villa – 2 Bedroom",
    pricing: ROOM_PRICING.villa,
    image: villaLiving,
    description: "A luxurious 2-bedroom villa with open-plan living, original African artwork, en-suite bathrooms, and plush interiors — ideal for families or groups seeking space and elegance.",
    features: ["2 Bedrooms", "Full Kitchen", "Living Hall", "Private Balcony"],
    guests: "2-6 Guests",
    icon: Building2,
    hasDetailView: true,
  },
  {
    id: "full_property" as const,
    name: "Full Property Buyout",
    pricing: ROOM_PRICING.full_property,
    image: roomBed,
    description: "Exclusive access to the entire 3-bedroom property — the ultimate private island experience for larger groups and events.",
    features: ["3 Bedrooms", "Entire Property", "Private Chef Option", "Event Space"],
    guests: "2-10 Guests",
    icon: Castle,
    hasDetailView: false,
  },
] as const;

const commonAmenities = [
  { icon: Wifi, name: "Free Wi-Fi" },
  { icon: Wind, name: "Air Conditioning" },
  { icon: Coffee, name: "Breakfast" },
];

export const AccommodationSection = () => {
  const [cabinDetailOpen, setCabinDetailOpen] = useState(false);
  const [villaDetailOpen, setVillaDetailOpen] = useState(false);
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    roomType: "cabin" | "villa" | "full_property";
    roomName: string;
  }>({
    isOpen: false,
    roomType: "cabin",
    roomName: "",
  });

  const openBookingModal = (room: typeof rooms[number]) => {
    setBookingModal({
      isOpen: true,
      roomType: room.id,
      roomName: room.name,
    });
  };

  return (
    <section id="accommodation" className="section-padding section-dark">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-orange text-sm tracking-widest uppercase mb-4">
            Accommodation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[hsl(var(--section-dark-text))] mb-6">
            Luxurious Island
            <span className="text-brand-orange block">Sanctuaries</span>
          </h2>
          <p className="text-[hsl(var(--section-dark-muted))] text-lg max-w-2xl mx-auto">
            Choose from our carefully curated accommodations, each designed to provide 
            the ultimate in comfort and Pan-African elegance.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group relative section-dark-card rounded-2xl overflow-hidden border transition-all duration-500 shadow-elevation-4 hover:shadow-elevation-6 hover:border-brand-orange/30"
            >
              {/* Image */}
              <div className="relative h-52 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-brand-orange-dark via-brand-orange to-brand-orange-light text-white px-3 py-2 rounded-full font-bold shadow-elevation-3 text-sm">
                  <span className="block">GH₵{room.pricing.weekday.toLocaleString()}</span>
                  <span className="text-[10px] font-normal opacity-80">weekday/night</span>
                </div>
                
                {/* Room Type Icon */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-brand-orange/30">
                  <room.icon className="w-6 h-6 text-brand-orange" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-[hsl(var(--section-dark-text))] text-xl">{room.name}</h3>
                  <div className="flex items-center gap-1 text-[hsl(var(--section-dark-muted))] text-xs">
                    <Users className="w-3.5 h-3.5" />
                    {room.guests}
                  </div>
                </div>
                
                <p className="text-[hsl(var(--section-dark-muted))] mb-4 leading-relaxed text-sm">
                  {room.description}
                </p>

                {/* Pricing breakdown */}
                <div className="flex gap-3 mb-4 text-xs">
                  <div className="flex-1 bg-brand-orange/10 rounded-lg p-2 text-center border border-brand-orange/20">
                    <p className="text-brand-orange font-bold">GH₵{room.pricing.weekday.toLocaleString()}</p>
                    <p className="text-[hsl(var(--section-dark-muted))]">Weekday</p>
                  </div>
                  <div className="flex-1 bg-brand-orange/10 rounded-lg p-2 text-center border border-brand-orange/20">
                    <p className="text-brand-orange font-bold">GH₵{room.pricing.weekend.toLocaleString()}</p>
                    <p className="text-[hsl(var(--section-dark-muted))]">Weekend</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 bg-brand-orange/10 text-brand-orange text-xs rounded-full border border-brand-orange/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Common Amenities */}
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[hsl(var(--section-dark-border))]">
                  {commonAmenities.map((amenity) => (
                    <div
                      key={amenity.name}
                      className="flex items-center gap-1.5 text-[hsl(var(--section-dark-muted))] text-xs"
                    >
                      <amenity.icon className="w-3.5 h-3.5" />
                      {amenity.name}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-2">
                  {room.hasDetailView && (
                    <Button
                      variant="outline"
                      className="flex-1 border-brand-orange/30 text-brand-orange hover:bg-brand-orange/10"
                      onClick={() => {
                        if (room.id === "cabin") setCabinDetailOpen(true);
                        else if (room.id === "villa") setVillaDetailOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      View Interior
                    </Button>
                  )}
                  <Button variant="orange" className={room.hasDetailView ? "flex-1" : "w-full"} onClick={() => openBookingModal(room)}>
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cabin Detail Modal */}
      <CabinDetailModal
        isOpen={cabinDetailOpen}
        onClose={() => setCabinDetailOpen(false)}
        onBookNow={() => {
          setCabinDetailOpen(false);
          openBookingModal(rooms[0]);
        }}
      />

      {/* Villa Detail Modal */}
      <VillaDetailModal
        isOpen={villaDetailOpen}
        onClose={() => setVillaDetailOpen(false)}
        onBookNow={() => {
          setVillaDetailOpen(false);
          openBookingModal(rooms[1]);
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal((prev) => ({ ...prev, isOpen: false }))}
        roomType={bookingModal.roomType}
        roomName={bookingModal.roomName}
      />
    </section>
  );
};
