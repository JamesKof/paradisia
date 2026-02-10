import { useState } from "react";
import { MapPin, Phone, Mail, Instagram, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

const contactInfo = [
  { icon: MapPin, label: "Location", value: "Big Ada Island, near Aqua Safari", subtext: "Greater Accra Region, Ghana" },
  { icon: Phone, label: "Phone", value: "+233 558 391 399", subtext: "+233 503 364 928" },
  { icon: Mail, label: "Email", value: "info@paradasiahideway.com", subtext: "We respond within 24 hours" },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/paradiasiahideway", label: "Instagram" },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
    href: "https://www.tiktok.com/@paradiasiahideway",
    label: "TikTok",
  },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.27 7.28a3.15 3.15 0 0 1 2.5-1.22c.98 0 1.87.46 2.5 1.22L12 13.2l4.73-5.92a3.15 3.15 0 0 1 2.5-1.22c.98 0 1.87.46 2.5 1.22A4.15 4.15 0 0 1 22.7 10v4.5c0 2.9-2.13 5.44-5 5.44a4.93 4.93 0 0 1-3.5-1.5L12 16l-2.2 2.44a4.93 4.93 0 0 1-3.5 1.5c-2.87 0-5-2.54-5-5.44V10c0-1.06.36-2.04.97-2.72z" />
      </svg>
    ),
    href: "https://www.booking.com/hotel/gh/serene-stay-at-paradasia-hideaway.html",
    label: "Booking.com",
  },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "", lastName: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: keyof ContactFormData, value: string) => {
    const partialData = { ...formData, [field]: value };
    const result = contactFormSchema.safeParse(partialData);
    if (!result.success) {
      const fieldError = result.error.errors.find(e => e.path[0] === field);
      if (fieldError) {
        setErrors(prev => ({ ...prev, [field]: fieldError.message }));
      } else {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    validateField(field, formData[field] || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactFormData;
        if (!newErrors[field]) newErrors[field] = err.message;
      });
      setErrors(newErrors);
      toast({ title: "Validation Error", description: "Please fix the errors in the form.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const validatedData = result.data;
      const { error } = await supabase.from("guest_inquiries").insert({
        name: `${validatedData.firstName} ${validatedData.lastName || ""}`.trim(),
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject || "General Inquiry",
        message: validatedData.message,
      });
      if (error) throw error;
      try {
        await supabase.functions.invoke("send-email", {
          body: { type: "inquiry_received", inquiry: { name: `${validatedData.firstName} ${validatedData.lastName || ""}`.trim(), email: validatedData.email, subject: validatedData.subject || "General Inquiry", message: validatedData.message } },
        });
      } catch (emailError) { console.error("Email error:", emailError); }
      toast({ title: "Message Sent!", description: "Thank you for reaching out. We'll get back to you within 24 hours." });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    } catch (error: any) {
      console.error("Error submitting inquiry:", error);
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  const inputClasses = (field: keyof ContactFormData) =>
    `w-full px-4 py-3 bg-[hsl(var(--section-dark-bg))] border rounded-lg text-[hsl(var(--section-dark-text))] placeholder:text-[hsl(var(--section-dark-muted))]/50 focus:outline-none transition-all duration-300 ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-[hsl(var(--section-dark-border))] focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
    }`;

  return (
    <section id="contact" className="section-padding section-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-brand-orange text-sm tracking-widest uppercase mb-4">Contact Us</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[hsl(var(--section-dark-text))] mb-6">
            Begin Your<span className="text-brand-orange block">Journey</span>
          </h2>
          <p className="text-[hsl(var(--section-dark-muted))] text-lg max-w-2xl mx-auto">
            Ready to experience the ultimate island escape? Reach out to us and let us help you plan your perfect getaway.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="section-dark-card rounded-2xl p-8 border shadow-elevation-4">
            <h3 className="font-display text-[hsl(var(--section-dark-text))] text-2xl mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[hsl(var(--section-dark-muted))] text-sm mb-2">First Name *</label>
                  <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} onBlur={() => handleBlur("firstName")} className={inputClasses("firstName")} placeholder="John" />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-[hsl(var(--section-dark-muted))] text-sm mb-2">Last Name</label>
                  <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} onBlur={() => handleBlur("lastName")} className={inputClasses("lastName")} placeholder="Doe" />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-[hsl(var(--section-dark-muted))] text-sm mb-2">Email *</label>
                <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")} className={inputClasses("email")} placeholder="john@example.com" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-[hsl(var(--section-dark-muted))] text-sm mb-2">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} onBlur={() => handleBlur("phone")} className={inputClasses("phone")} placeholder="+233 XX XXX XXXX" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-[hsl(var(--section-dark-muted))] text-sm mb-2">Subject</label>
                <input type="text" value={formData.subject} onChange={(e) => handleChange("subject", e.target.value)} onBlur={() => handleBlur("subject")} className={inputClasses("subject")} placeholder="Booking inquiry, Special request, etc." />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-[hsl(var(--section-dark-muted))] text-sm mb-2">Message *</label>
                <textarea rows={4} value={formData.message} onChange={(e) => handleChange("message", e.target.value)} onBlur={() => handleBlur("message")} className={`${inputClasses("message")} resize-none`} placeholder="Tell us about your dream getaway... (minimum 10 characters)" />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" variant="orange" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</>) : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4 p-5 section-dark-card rounded-xl border hover:border-brand-orange/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-orange-dark to-brand-orange flex items-center justify-center shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[hsl(var(--section-dark-muted))] text-sm mb-1">{info.label}</p>
                    <p className="text-[hsl(var(--section-dark-text))] font-medium">{info.value}</p>
                    <p className="text-[hsl(var(--section-dark-muted))]/70 text-sm">{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-[200px] sm:h-[250px] rounded-xl overflow-hidden border border-[hsl(var(--section-dark-border))]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.279169509523!2d0.6184875744770121!3d5.816192830979528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102103006598cbfb%3A0x313e004a7a702972!2sPARADASIA%20HIDEWAY!5e0!3m2!1sen!2sus!4v1770708764078!5m2!1sen!2sus"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="w-12 h-12 rounded-full bg-brand-orange/10 hover:bg-brand-orange/20 flex items-center justify-center text-brand-orange transition-all duration-300 hover:scale-110" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
