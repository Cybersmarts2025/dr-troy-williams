import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { validateContactForm, sanitizeFormData } from "@/utils/formValidation";
import { useRateLimit } from "@/hooks/useRateLimit";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    // Honeypot field – must remain empty
    website: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();
  const { checkRateLimit, isBlocked, remainingAttempts } = useRateLimit({
    maxAttempts: 5,
    windowMs: 60_000,
    identifier: 'contact-form'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Honeypot check
    if (formData.website) {
      // Silently succeed to avoid tipping off bots
      toast({ title: "Message sent successfully!", description: "Thank you for your message. We'll get back to you soon.", duration: 4000 });
      return;
    }

    // Require a signed-in user to prevent anonymous abuse
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      toast({
        title: "Please sign in",
        description: "You must be signed in to send a message.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    // Client-side rate limit
    if (!checkRateLimit()) {
      toast({
        title: "Too many attempts",
        description: "Please wait a minute before trying again.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast({
        title: "Validation Error",
        description: validation.errors[0],
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Sanitize form data
      const { name, email, subject, message } = sanitizeFormData(formData);

      // Send via secure Edge Function (server-side rate limit + origin checks)
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, subject, message }
      });

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
        duration: 5000,
      });

      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Clear relevant error when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-16 bg-white" aria-labelledby="contact-form-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="h-6 w-6 text-[#3C3B6E]" aria-hidden="true" />
              <h2 id="contact-form-heading" className="text-3xl font-bold">Get in Touch</h2>
            </div>
            <p className="text-lg text-gray-600">
              Have questions or want to collaborate? Send us a message and we'll get back to you soon.
            </p>
          </div>

          {/* Screen reader announcements for form errors */}
          <div 
            role="alert" 
            aria-live="assertive" 
            aria-atomic="true"
            className="sr-only"
          >
            {errors.length > 0 && (
              <span>Form has {errors.length} error{errors.length > 1 ? 's' : ''}: {errors.join('. ')}</span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg" noValidate>
            {/* Visible error summary */}
            {errors.length > 0 && (
              <div 
                className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md"
                role="alert"
              >
                <p className="font-medium mb-2">Please fix the following errors:</p>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Honeypot field (hidden) */}
            <div className="hidden" aria-hidden="true">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="text"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.some(e => e.toLowerCase().includes('name'))}
                  className="mt-1 min-h-[44px]"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.some(e => e.toLowerCase().includes('email'))}
                  className="mt-1 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={errors.some(e => e.toLowerCase().includes('subject'))}
                className="mt-1 min-h-[44px]"
              />
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={errors.some(e => e.toLowerCase().includes('message'))}
                rows={6}
                className="mt-1"
                placeholder="Tell us about your project, question, or how we can help..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isBlocked}
              className="w-full bg-[#B22234] hover:bg-[#9B0000] text-lg py-3 min-h-[44px]"
            >
              {isSubmitting ? (
                "Sending Message..."
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" aria-hidden="true" />
                  {isBlocked ? `Try again soon (${remainingAttempts} left)` : "Send Message"}
                </>
              )}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              You can also reach us directly at{" "}
              <a 
                href="mailto:verifiedsafe8@gmail.com" 
                className="text-[#B22234] hover:underline min-h-[44px] inline-flex items-center"
              >
                verifiedsafe8@gmail.com
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;