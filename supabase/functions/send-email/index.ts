import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import React from 'https://esm.sh/react@18.3.1';
import { Resend } from 'https://esm.sh/resend@4.0.0';
import { renderAsync } from 'https://esm.sh/@react-email/components@0.0.22';
import { BookingConfirmation } from './_templates/booking-confirmation.tsx';
import { BookingCancellation } from './_templates/booking-cancellation.tsx';
import { AdminCancellation } from './_templates/admin-cancellation.tsx';
import { InquiryReceived } from './_templates/inquiry-received.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Booking {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  room_type: string;
  room_price: number;
  check_in: string;
  check_out: string;
  guests: number;
  total_amount: number;
  special_requests?: string;
  payment_reference?: string;
}

interface EmailRequest {
  type: "booking_confirmation" | "booking_cancellation" | "inquiry_received";
  booking?: Booking;
  inquiry?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getRoomName = (roomType: string) => {
  return roomType === "presidential" ? "Presidential Suite" : "Standard Room";
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, booking, inquiry }: EmailRequest = await req.json();
    console.log("Sending email:", type);

    let emailResult;

    switch (type) {
      case "booking_confirmation": {
        if (!booking) throw new Error("Booking data required");
        
        const html = await renderAsync(
          React.createElement(BookingConfirmation, {
            firstName: booking.first_name,
            lastName: booking.last_name,
            roomType: booking.room_type,
            roomName: getRoomName(booking.room_type),
            checkIn: formatDate(booking.check_in),
            checkOut: formatDate(booking.check_out),
            guests: booking.guests,
            totalAmount: booking.total_amount,
            specialRequests: booking.special_requests,
            paymentReference: booking.payment_reference,
            bookingId: booking.id,
          })
        );

        emailResult = await resend.emails.send({
          from: "Paradasia Hideway <bookings@resend.dev>",
          to: [booking.email],
          subject: `🌴 Booking Confirmed - ${getRoomName(booking.room_type)}`,
          html,
        });
        break;
      }

      case "booking_cancellation": {
        if (!booking) throw new Error("Booking data required");
        
        // Guest cancellation email
        const guestHtml = await renderAsync(
          React.createElement(BookingCancellation, {
            firstName: booking.first_name,
            roomName: getRoomName(booking.room_type),
            checkIn: formatDate(booking.check_in),
            checkOut: formatDate(booking.check_out),
            totalAmount: booking.total_amount,
          })
        );

        emailResult = await resend.emails.send({
          from: "Paradasia Hideway <bookings@resend.dev>",
          to: [booking.email],
          subject: "Booking Cancelled - Paradasia Hideway",
          html: guestHtml,
        });

        // Admin cancellation alert
        const adminHtml = await renderAsync(
          React.createElement(AdminCancellation, {
            firstName: booking.first_name,
            lastName: booking.last_name,
            email: booking.email,
            roomName: getRoomName(booking.room_type),
            checkIn: formatDate(booking.check_in),
            checkOut: formatDate(booking.check_out),
            totalAmount: booking.total_amount,
            paymentReference: booking.payment_reference,
            bookingId: booking.id,
          })
        );

        await resend.emails.send({
          from: "Paradasia Hideway <bookings@resend.dev>",
          to: ["admin@paradasiahideway.com"],
          subject: `⚠️ Booking Cancellation - ${booking.first_name} ${booking.last_name}`,
          html: adminHtml,
        });
        break;
      }

      case "inquiry_received": {
        if (!inquiry) throw new Error("Inquiry data required");
        
        const html = await renderAsync(
          React.createElement(InquiryReceived, {
            name: inquiry.name,
            subject: inquiry.subject,
          })
        );

        emailResult = await resend.emails.send({
          from: "Paradasia Hideway <inquiries@resend.dev>",
          to: [inquiry.email],
          subject: "We received your message - Paradasia Hideway",
          html,
        });
        break;
      }

      default:
        throw new Error("Invalid email type");
    }

    console.log("Email sent successfully:", emailResult);
    return new Response(JSON.stringify({ success: true, result: emailResult }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
