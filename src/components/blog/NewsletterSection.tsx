
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useNewsletter } from "@/hooks/useNewsletter";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { subscribe, isSubmitting } = useNewsletter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscribe(email, name);
    if (!isSubmitting) {
      setEmail("");
      setName("");
    }
  };

  return (
    <section className="bg-slate-100 py-16" aria-labelledby="newsletter-heading">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="h-6 w-6 text-[#3C3B6E]" aria-hidden="true" />
          <h2 id="newsletter-heading" className="text-3xl font-bold">Subscribe to Our Newsletter</h2>
        </div>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Stay updated on the latest in AI, cybersecurity, and defense technology with insights from Dr. Troy Williams.
        </p>
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="newsletter-name" className="sr-only">Your name (optional)</label>
              <input 
                id="newsletter-name"
                type="text" 
                placeholder="Your name (optional)" 
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C3B6E]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C3B6E]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-[#B22234] hover:bg-[#9B0000] min-h-[44px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
