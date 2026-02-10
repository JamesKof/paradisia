import { Clock, Wifi, UtensilsCrossed, Car, Waves, MapPin, Info, Gift } from "lucide-react";

interface BookingBenefitsProps {
  roomType: string;
  checkIn: string;
  checkOut: string;
  bookingStatus: string;
}

const ROOM_BENEFITS: Record<string, string[]> = {
  cabin: [
    "Private standalone cabin",
    "Complimentary Wi-Fi",
    "Air conditioning",
    "Daily housekeeping",
    "Access to shared pool & lounge",
  ],
  villa: [
    "2-bedroom private villa",
    "Living room & kitchenette",
    "Complimentary Wi-Fi",
    "Air conditioning in all rooms",
    "Daily housekeeping",
    "Private outdoor seating area",
    "Access to pool & lagoon",
  ],
  full_property: [
    "Exclusive 3-bedroom property buyout",
    "Full kitchen & living spaces",
    "Complimentary Wi-Fi",
    "Air conditioning throughout",
    "Daily housekeeping",
    "Private pool access",
    "Jet ski & boat ride included",
    "Bonfire setup on request",
    "Dedicated concierge service",
  ],
  presidential: [
    "Premium suite with lounge",
    "Complimentary Wi-Fi",
    "Air conditioning",
    "Daily housekeeping",
    "Priority pool access",
  ],
  standard: [
    "Comfortable room with ensuite",
    "Complimentary Wi-Fi",
    "Air conditioning",
    "Daily housekeeping",
  ],
};

const CHECK_IN_INSTRUCTIONS = [
  "Check-in time: 2:00 PM | Check-out time: 12:00 PM",
  "Present your booking confirmation at reception",
  "Valid government-issued ID required for all guests",
  "Early check-in available on request (subject to availability)",
  "Airport/station pickup can be arranged — contact us in advance",
];

export const BookingBenefits = ({ roomType, checkIn, checkOut, bookingStatus }: BookingBenefitsProps) => {
  const benefits = ROOM_BENEFITS[roomType] || ROOM_BENEFITS.standard;
  const nights = Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)));
  const isUpcoming = bookingStatus === "confirmed" || bookingStatus === "pending";

  return (
    <div className="space-y-4 mt-4">
      {/* Duration */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-brand-orange" />
          <h4 className="text-foreground font-medium text-sm">Stay Duration</h4>
        </div>
        <p className="text-foreground text-lg font-bold">{nights} night{nights > 1 ? "s" : ""}</p>
      </div>

      {/* Benefits */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="w-4 h-4 text-brand-orange" />
          <h4 className="text-foreground font-medium text-sm">What's Included</h4>
        </div>
        <ul className="space-y-2">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Check-in Instructions (only for upcoming bookings) */}
      {isUpcoming && (
        <div className="bg-brand-orange/5 rounded-lg p-4 border border-brand-orange/20">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-brand-orange" />
            <h4 className="text-foreground font-medium text-sm">Check-in Instructions</h4>
          </div>
          <ul className="space-y-2">
            {CHECK_IN_INSTRUCTIONS.map((instruction, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-brand-orange font-bold">{i + 1}.</span>
                {instruction}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
