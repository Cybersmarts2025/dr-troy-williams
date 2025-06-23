
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionTitle } from './social/SectionTitle';
import { useContainerAnimation } from '@/hooks/useContainerAnimation';
import { useTestimonials, Testimonial } from '@/hooks/useTestimonials';

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <Quote className="text-[#B22234] h-8 w-8 flex-shrink-0" />
        
        <div className="flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      
      <blockquote className="mb-4 text-gray-700 italic text-lg">"{testimonial.testimonial}"</blockquote>
      
      <div className="flex flex-col">
        <span className="font-bold text-[#3C3B6E]">{testimonial.name}</span>
        <span className="text-sm text-gray-600">
          {testimonial.title}
          {testimonial.organization && `, ${testimonial.organization}`}
        </span>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const { container } = useContainerAnimation();
  const { data: testimonials, isLoading, error } = useTestimonials(4);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle icon={Quote} title="What Industry Leaders Are Saying" />
          <div className="flex justify-center items-center py-16">
            <div className="w-16 h-16 border-4 border-[#3C3B6E] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading testimonials:", error);
    return (
      <section id="testimonials" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle icon={Quote} title="What Industry Leaders Are Saying" />
          <div className="text-center py-8">
            <p className="text-gray-600">Unable to load testimonials at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle icon={Quote} title="What Industry Leaders Are Saying" />
          <div className="text-center py-8">
            <p className="text-gray-600">No testimonials available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle icon={Quote} title="What Industry Leaders Are Saying" />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
