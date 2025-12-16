
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { isValidEmail, sanitizeInput } from "@/utils/security";

interface NewsletterPreferences {
  topics: string[];
  frequency: string;
}

export const useNewsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const subscribe = async (email: string, name?: string, preferences?: NewsletterPreferences) => {
    setIsSubmitting(true);
    
    try {
      // Validate email format
      const trimmedEmail = email.trim().toLowerCase();
      if (!isValidEmail(trimmedEmail)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Validate email length
      if (trimmedEmail.length > 255) {
        toast({
          title: "Email too long",
          description: "Email address must be less than 255 characters.",
          variant: "destructive",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Check if subscriber already exists
      const { data: existingSubscriber } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', trimmedEmail)
        .single();

      if (existingSubscriber) {
        toast({
          title: "Already subscribed!",
          description: "This email is already subscribed to our newsletter.",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Sanitize name input
      const sanitizedName = name ? sanitizeInput(name).slice(0, 100) : null;

      const subscriberData = {
        email: trimmedEmail,
        name: sanitizedName,
        preferences: preferences ? JSON.stringify(preferences) : null
      };

      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert(subscriberData);

      if (error) throw error;

      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our intelligence briefings.",
        duration: 5000,
      });

      // Track analytics event
      if (window.gtag) {
        window.gtag('event', 'newsletter_subscription', {
          event_category: 'engagement',
          event_label: preferences?.topics.join(',') || 'general'
        });
      }

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { subscribe, isSubmitting };
};
