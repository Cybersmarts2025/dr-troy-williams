
import React from 'react';
import BlogHeroContent from './BlogHeroContent';

const BlogHero = () => {
  const scrollToNewsletter = () => {
    // Smooth scroll to newsletter section
    const newsletterSection = document.querySelector('section.bg-slate-100');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#3C3B6E] to-[#1a1a3a] text-white py-16 mt-4">
      <BlogHeroContent onNewsletterClick={scrollToNewsletter} />
    </div>
  );
};

export default BlogHero;
