
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
      // Check if subscriber already exists
      const { data: existingSubscriber } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', email)
        .single();

      if (existingSubscriber) {
        toast({
          title: "Already subscribed!",
          description: "This email is already subscribed to our newsletter.",
          duration: 5000,
        });
        return;
      }

      const subscriberData = {
        email,
        name: name || null,
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
