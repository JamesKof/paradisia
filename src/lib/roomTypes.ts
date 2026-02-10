export type RoomTypeId = "cabin" | "villa" | "full_property" | "presidential" | "standard";

export interface RoomPricing {
  weekday: number;
  weekend: number;
}

export const ROOM_NAMES: Record<string, string> = {
  cabin: "Cabin (Standalone)",
  villa: "Villa – 2 Bedroom",
  full_property: "Full Property Buyout",
  // Legacy mappings
  presidential: "Presidential Suite",
  standard: "Standard Room",
};

export const ROOM_PRICING: Record<string, RoomPricing> = {
  cabin: { weekday: 2200, weekend: 3000 },
  villa: { weekday: 4000, weekend: 5000 },
  full_property: { weekday: 6500, weekend: 7500 },
};

export const getRoomDisplayName = (roomType: string): string => {
  return ROOM_NAMES[roomType] || roomType;
};

/**
 * Check if a given date falls on a weekend (Friday or Saturday night).
 * In hospitality, weekend nights are typically Fri & Sat.
 */
export const isWeekendNight = (date: Date): boolean => {
  const day = date.getDay();
  return day === 5 || day === 6; // Friday = 5, Saturday = 6
};

/**
 * Calculate total price for a stay based on per-night weekday/weekend rates.
 */
export const calculateStayTotal = (
  roomType: string,
  checkIn: string,
  checkOut: string
): { total: number; weekdayNights: number; weekendNights: number; totalNights: number } => {
  const pricing = ROOM_PRICING[roomType];
  if (!pricing || !checkIn || !checkOut) {
    return { total: 0, weekdayNights: 0, weekendNights: 0, totalNights: 0 };
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  let weekdayNights = 0;
  let weekendNights = 0;

  const current = new Date(start);
  while (current < end) {
    if (isWeekendNight(current)) {
      weekendNights++;
    } else {
      weekdayNights++;
    }
    current.setDate(current.getDate() + 1);
  }

  const total = weekdayNights * pricing.weekday + weekendNights * pricing.weekend;
  return { total, weekdayNights, weekendNights, totalNights: weekdayNights + weekendNights };
};
