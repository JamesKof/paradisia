import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, CreditCard, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { bookingFormSchema, type BookingFormData } from "@/lib/validations";
import { calculateStayTotal, ROOM_PRICING } from "@/lib/roomTypes";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomType: "cabin" | "villa" | "full_property";
  roomName: string;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: Record<string, any>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

export const BookingModal = ({ isOpen, onClose, roomType, roomName }: BookingModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "", lastName: "", email: "", phone: "", checkIn: "", checkOut: "", guests: 2, specialRequests: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  useEffect(() => {
    if (window.PaystackPop) { setPaystackLoaded(true); return; }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);
  }, []);

  const pricing = ROOM_PRICING[roomType];
  const stayCalc = calculateStayTotal(roomType, formData.checkIn, formData.checkOut);
  const { total: totalAmount, weekdayNights, weekendNights, totalNights } = stayCalc;

  const handleChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const result = bookingFormSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
      result.error.errors.forEach(err => { const field = err.path[0] as keyof BookingFormData; if (!newErrors[field]) newErrors[field] = err.message; });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const createBooking = async (paymentRef: string, status: "confirmed" | "pending" = "confirmed", paymentStatus: "paid" | "pending" = "paid") => {
    const { data: booking, error } = await supabase.from("bookings").insert({
      user_id: user!.id, email: formData.email, first_name: formData.firstName, last_name: formData.lastName,
      phone: formData.phone || null, room_type: roomType as any, room_price: pricing.weekday, check_in: formData.checkIn,
      check_out: formData.checkOut, guests: formData.guests, special_requests: formData.specialRequests || null,
      booking_status: status, payment_status: paymentStatus, payment_reference: paymentRef, total_amount: totalAmount,
    }).select().single();
    if (error) throw error;
    try { await supabase.functions.invoke("send-email", { body: { type: "booking_confirmation", booking } }); }
    catch (e) { console.error("Email error:", e); }
    return booking;
  };

  const handlePaystackPopup = async () => {
    if (!user) { toast({ title: "Login Required", description: "Please login to make a booking.", variant: "destructive" }); navigate("/auth"); return; }
    if (!validateForm()) { toast({ title: "Validation Error", description: "Please fix the errors in the form.", variant: "destructive" }); return; }
    if (totalNights <= 0) { toast({ title: "Invalid Dates", description: "Please select valid check-in and check-out dates.", variant: "destructive" }); return; }
    if (!paystackLoaded || !window.PaystackPop) { toast({ title: "Payment Loading", description: "Payment system is loading. Please try again.", variant: "destructive" }); return; }

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!paystackKey) { toast({ title: "Configuration Error", description: "Payment is not configured. Please use Demo Booking.", variant: "destructive" }); return; }

    setIsProcessing(true);
    const paymentRef = `PH-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const handler = window.PaystackPop.setup({
      key: paystackKey, email: formData.email, amount: totalAmount * 100, currency: "GHS", ref: paymentRef,
      metadata: { custom_fields: [
        { display_name: "Guest Name", variable_name: "guest_name", value: `${formData.firstName} ${formData.lastName}` },
        { display_name: "Room Type", variable_name: "room_type", value: roomName },
        { display_name: "Check-in", variable_name: "check_in", value: formData.checkIn },
        { display_name: "Check-out", variable_name: "check_out", value: formData.checkOut },
      ]},
      callback: async (response) => {
        try {
          await createBooking(response.reference);
          toast({ title: "Payment Successful!", description: "Your booking has been confirmed. Check your email for details." });
          onClose(); navigate("/profile");
        } catch (error: any) {
          console.error("Error creating booking:", error);
          toast({ title: "Booking Error", description: "Payment successful but booking failed. Please contact support with reference: " + response.reference, variant: "destructive" });
        }
        setIsProcessing(false);
      },
      onClose: () => { setIsProcessing(false); toast({ title: "Payment Cancelled", description: "You closed the payment window. Your booking was not completed." }); },
    });
    handler.openIframe();
  };

  const handleDemoBooking = async () => {
    if (!user) { toast({ title: "Login Required", description: "Please login to make a booking.", variant: "destructive" }); navigate("/auth"); return; }
    if (!validateForm()) { toast({ title: "Validation Error", description: "Please fix the errors in the form.", variant: "destructive" }); return; }
    if (totalNights <= 0) { toast({ title: "Invalid Dates", description: "Please select valid check-in and check-out dates.", variant: "destructive" }); return; }

    setIsProcessing(true);
    try {
      const paymentRef = `PH-DEMO-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      await createBooking(paymentRef);
      toast({ title: "Booking Confirmed!", description: "Your reservation has been confirmed. Check your email for details." });
      onClose(); navigate("/profile");
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast({ title: "Booking Error", description: error.message || "Failed to create booking. Please try again.", variant: "destructive" });
    } finally { setIsProcessing(false); }
  };

  const today = new Date().toISOString().split("T")[0];

  const inputClasses = (field: keyof BookingFormData) =>
    `w-full px-4 py-3 bg-muted/50 border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all ${
      errors[field] ? "border-red-500" : "border-border focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
    }`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground">Book {roomName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Room Info & Pricing */}
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-foreground font-medium mb-2">{roomName}</p>
            <div className="flex gap-3 text-sm">
              <div className="flex-1 text-center">
                <p className="text-brand-orange font-bold">GH₵{pricing.weekday.toLocaleString()}</p>
                <p className="text-muted-foreground text-xs">Weekday/night</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-brand-orange font-bold">GH₵{pricing.weekend.toLocaleString()}</p>
                <p className="text-muted-foreground text-xs">Weekend/night</p>
              </div>
            </div>
            {totalNights > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                  <Info className="w-3 h-3" />
                  {weekdayNights > 0 && <span>{weekdayNights} weekday night{weekdayNights > 1 ? "s" : ""}</span>}
                  {weekdayNights > 0 && weekendNights > 0 && <span>+</span>}
                  {weekendNights > 0 && <span>{weekendNights} weekend night{weekendNights > 1 ? "s" : ""}</span>}
                </div>
                <p className="text-brand-orange font-bold text-lg">Total: GH₵{totalAmount.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground text-sm mb-2"><Calendar className="w-4 h-4 inline mr-1" />Check-in *</label>
              <input type="date" value={formData.checkIn} onChange={(e) => handleChange("checkIn", e.target.value)} min={today} className={inputClasses("checkIn")} />
              {errors.checkIn && <p className="text-red-400 text-xs mt-1">{errors.checkIn}</p>}
            </div>
            <div>
              <label className="block text-muted-foreground text-sm mb-2"><Calendar className="w-4 h-4 inline mr-1" />Check-out *</label>
              <input type="date" value={formData.checkOut} onChange={(e) => handleChange("checkOut", e.target.value)} min={formData.checkIn || today} className={inputClasses("checkOut")} />
              {errors.checkOut && <p className="text-red-400 text-xs mt-1">{errors.checkOut}</p>}
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-muted-foreground text-sm mb-2"><Users className="w-4 h-4 inline mr-1" />Number of Guests</label>
            <select value={formData.guests} onChange={(e) => handleChange("guests", Number(e.target.value))}
              className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:border-brand-orange">
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>

          {/* Guest Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground text-sm mb-2">First Name *</label>
              <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={inputClasses("firstName")} placeholder="John" />
              {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-muted-foreground text-sm mb-2">Last Name *</label>
              <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={inputClasses("lastName")} placeholder="Doe" />
              {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground text-sm mb-2">Email *</label>
            <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClasses("email")} placeholder="you@example.com" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-muted-foreground text-sm mb-2">Phone</label>
            <input type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className={inputClasses("phone")} placeholder="+233 XX XXX XXXX" />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-muted-foreground text-sm mb-2">Special Requests</label>
            <textarea value={formData.specialRequests} onChange={(e) => handleChange("specialRequests", e.target.value)} rows={3}
              className={`${inputClasses("specialRequests")} resize-none`} placeholder="Any special requirements..." />
            {errors.specialRequests && <p className="text-red-400 text-xs mt-1">{errors.specialRequests}</p>}
          </div>

          {/* Payment Buttons */}
          <div className="space-y-3">
            <Button variant="orange" size="lg" className="w-full" onClick={handlePaystackPopup} disabled={isProcessing || totalNights <= 0}>
              <CreditCard className="w-5 h-5 mr-2" />
              {isProcessing ? "Processing..." : `Pay Now - GH₵${totalAmount.toLocaleString()}`}
            </Button>
            <Button variant="outline" size="lg" className="w-full" onClick={handleDemoBooking} disabled={isProcessing || totalNights <= 0}>
              Demo Booking (No Payment)
            </Button>
          </div>

          <p className="text-muted-foreground/50 text-xs text-center">Secure payment powered by Paystack</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
