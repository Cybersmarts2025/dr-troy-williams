
import React from 'react';
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section className="bg-slate-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Stay updated on the latest in AI, cybersecurity, and defense technology with insights from Dr. Troy Williams.
        </p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C3B6E]"
          />
          <Button className="bg-[#B22234] hover:bg-[#9B0000] whitespace-nowrap">
            Subscribe
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
