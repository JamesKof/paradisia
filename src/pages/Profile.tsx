import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, ArrowLeft, LogOut, Star, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { getRoomDisplayName } from "@/lib/roomTypes";

interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
}

interface Booking {
  id: string;
  room_type: string;
  room_price: number;
  check_in: string;
  check_out: string;
  guests: number;
  booking_status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_status: "pending" | "paid" | "refunded" | "failed";
  special_requests: string | null;
  total_amount: number;
  created_at: string;
}

interface Review {
  id: string;
  booking_id: string;
  rating: number;
  comment: string | null;
}

const Profile = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Record<string, Review>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ first_name: "", last_name: "", phone: "" });
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "", bookingId: "" });
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => { if (!loading && !user) navigate("/auth"); }, [user, loading, navigate]);

  useEffect(() => {
    if (user) { fetchProfile(); fetchBookings(); }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("user_id", user?.id).maybeSingle();
      if (error) throw error;
      if (data) {
        setProfile(data);
        setEditData({ first_name: data.first_name || "", last_name: data.last_name || "", phone: data.phone || "" });
      }
    } catch (error) { console.error("Error fetching profile:", error); }
    finally { setIsLoadingProfile(false); }
  };

  const fetchBookings = async () => {
    try {
      const { data: bookingsData, error } = await supabase.from("bookings").select("*").eq("user_id", user?.id).order("created_at", { ascending: false });
      if (error) throw error;
      setBookings(bookingsData || []);
      if (bookingsData && bookingsData.length > 0) {
        const { data: reviewsData } = await supabase.from("reviews").select("*").in("booking_id", bookingsData.map(b => b.id));
        if (reviewsData) {
          const map: Record<string, Review> = {};
          reviewsData.forEach(r => { map[r.booking_id] = r; });
          setReviews(map);
        }
      }
    } catch (error) { console.error("Error fetching bookings:", error); }
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase.from("profiles").update(editData).eq("user_id", user?.id);
      if (error) throw error;
      setProfile(prev => prev ? { ...prev, ...editData } : null);
      setIsEditing(false);
      toast({ title: "Profile Updated", description: "Your profile has been updated successfully." });
    } catch { toast({ title: "Update Failed", description: "Failed to update profile. Please try again.", variant: "destructive" }); }
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;
    try {
      const bookingToCancel = bookings.find(b => b.id === selectedBookingId);
      const { error } = await supabase.from("bookings").update({ booking_status: "cancelled" }).eq("id", selectedBookingId);
      if (error) throw error;
      if (bookingToCancel) {
        try { await supabase.functions.invoke("send-email", { body: { type: "booking_cancellation", booking: { ...bookingToCancel, email: profile?.email || user?.email } } }); }
        catch (e) { console.error("Email error:", e); }
      }
      setBookings(prev => prev.map(b => b.id === selectedBookingId ? { ...b, booking_status: "cancelled" as const } : b));
      setCancelDialogOpen(false);
      setSelectedBookingId(null);
      toast({ title: "Booking Cancelled", description: "Your booking has been cancelled. Refund will be processed within 5-7 business days." });
    } catch { toast({ title: "Cancellation Failed", description: "Failed to cancel booking. Please try again.", variant: "destructive" }); }
  };

  const handleSubmitReview = async () => {
    try {
      const { error } = await supabase.from("reviews").insert({ booking_id: reviewData.bookingId, user_id: user?.id, rating: reviewData.rating, comment: reviewData.comment || null });
      if (error) throw error;
      setReviews(prev => ({ ...prev, [reviewData.bookingId]: { id: crypto.randomUUID(), booking_id: reviewData.bookingId, rating: reviewData.rating, comment: reviewData.comment || null } }));
      setReviewDialogOpen(false);
      setReviewData({ rating: 5, comment: "", bookingId: "" });
      toast({ title: "Review Submitted", description: "Thank you for your feedback!" });
    } catch { toast({ title: "Review Failed", description: "Failed to submit review. Please try again.", variant: "destructive" }); }
  };

  const handleLogout = async () => { await signOut(); navigate("/"); };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": case "paid": return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400";
      case "pending": return "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "cancelled": case "failed": return "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400";
      case "completed": return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
      case "refunded": return "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (loading || isLoadingProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Paradasia Hideway" className="h-10" />
          </a>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <a href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-orange transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>

        <h1 className="font-display text-3xl text-foreground mb-8">My Profile</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted border border-border">
            <TabsTrigger value="profile" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-elevation-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-foreground">Personal Information</h2>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-4 h-4 mr-2" />Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted-foreground text-sm mb-2">First Name</label>
                      <input type="text" value={editData.first_name} onChange={(e) => setEditData({ ...editData, first_name: e.target.value })} className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-muted-foreground text-sm mb-2">Last Name</label>
                      <input type="text" value={editData.last_name} onChange={(e) => setEditData({ ...editData, last_name: e.target.value })} className={inputClasses} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-muted-foreground text-sm mb-2">Phone</label>
                    <input type="tel" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className={inputClasses} placeholder="+233 XX XXX XXXX" />
                  </div>
                  <div>
                    <label className="block text-muted-foreground text-sm mb-2">Email</label>
                    <input type="email" value={profile?.email || user?.email || ""} disabled className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg text-muted-foreground cursor-not-allowed" />
                    <p className="text-muted-foreground/50 text-xs mt-1">Email cannot be changed</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="orange" onClick={handleUpdateProfile}>Save Changes</Button>
                    <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div><p className="text-muted-foreground text-sm">First Name</p><p className="text-foreground text-lg">{profile?.first_name || "—"}</p></div>
                  <div><p className="text-muted-foreground text-sm">Last Name</p><p className="text-foreground text-lg">{profile?.last_name || "—"}</p></div>
                  <div><p className="text-muted-foreground text-sm">Phone</p><p className="text-foreground text-lg">{profile?.phone || "—"}</p></div>
                  <div><p className="text-muted-foreground text-sm">Email</p><p className="text-foreground text-lg">{profile?.email || user?.email}</p></div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            {bookings.length === 0 ? (
              <div className="bg-card rounded-2xl p-12 border border-border text-center shadow-elevation-2">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">No Bookings Yet</h3>
                <p className="text-muted-foreground mb-6">Start your paradise experience today!</p>
                <Button variant="orange" onClick={() => navigate("/#accommodation")}>Make a Booking</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-card rounded-xl p-6 border border-border shadow-elevation-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display text-lg text-foreground capitalize">
                          {getRoomDisplayName(booking.room_type)}
                        </h3>
                        <p className="text-muted-foreground text-sm">Booked on {formatDate(booking.created_at)}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.booking_status)}`}>{booking.booking_status}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.payment_status)}`}>{booking.payment_status}</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-4 gap-4 mb-4 text-sm">
                      <div><p className="text-muted-foreground">Check-in</p><p className="text-foreground">{formatDate(booking.check_in)}</p></div>
                      <div><p className="text-muted-foreground">Check-out</p><p className="text-foreground">{formatDate(booking.check_out)}</p></div>
                      <div><p className="text-muted-foreground">Guests</p><p className="text-foreground">{booking.guests}</p></div>
                      <div><p className="text-muted-foreground">Total</p><p className="text-brand-orange font-bold">GH₵{booking.total_amount.toLocaleString()}</p></div>
                    </div>

                    {booking.special_requests && (
                      <div className="mb-4"><p className="text-muted-foreground text-sm">Special Requests</p><p className="text-foreground text-sm">{booking.special_requests}</p></div>
                    )}

                    {/* Review */}
                    {reviews[booking.id] ? (
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} className={`w-4 h-4 ${star <= reviews[booking.id].rating ? "text-brand-orange fill-brand-orange" : "text-muted-foreground/30"}`} />
                            ))}
                          </div>
                          <span className="text-muted-foreground text-sm">Your Review</span>
                        </div>
                        {reviews[booking.id].comment && <p className="text-foreground text-sm">{reviews[booking.id].comment}</p>}
                      </div>
                    ) : booking.booking_status === "completed" ? (
                      <Button variant="outline" size="sm" onClick={() => { setReviewData({ rating: 5, comment: "", bookingId: booking.id }); setReviewDialogOpen(true); }}>
                        <Star className="w-4 h-4 mr-2" />Write a Review
                      </Button>
                    ) : null}

                    {(booking.booking_status === "pending" || booking.booking_status === "confirmed") && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-2"
                        onClick={() => { setSelectedBookingId(booking.id); setCancelDialogOpen(true); }}>
                        <X className="w-4 h-4 mr-2" />Cancel Booking
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Cancel Booking</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to cancel this booking? Refund will be processed within 5-7 business days.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCancelDialogOpen(false)}>Keep Booking</Button>
            <Button variant="destructive" onClick={handleCancelBooking}>Yes, Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Write a Review</DialogTitle>
            <DialogDescription className="text-muted-foreground">Share your experience at Paradasia Hideway</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-muted-foreground text-sm mb-2">Rating</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(star => (
                  <button key={star} type="button" onClick={() => setReviewData({ ...reviewData, rating: star })} className="transition-transform hover:scale-110">
                    <Star className={`w-8 h-8 ${star <= reviewData.rating ? "text-brand-orange fill-brand-orange" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-muted-foreground text-sm mb-2">Comment (optional)</label>
              <textarea value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} maxLength={1000} rows={4}
                className={`${inputClasses} resize-none`} placeholder="Tell us about your stay..." />
              <p className="text-muted-foreground/50 text-xs mt-1">{reviewData.comment.length}/1000</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
            <Button variant="orange" onClick={handleSubmitReview}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
