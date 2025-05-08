
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionTitle } from './social/SectionTitle';
import { useContainerAnimation } from '@/hooks/useContainerAnimation';

interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
  organization?: string;
  rating?: number;
}

const Testimonial = ({ quote, author, title, organization, rating }: TestimonialProps) => {
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
        
        {rating && (
          <div className="flex gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        )}
      </div>
      
      <blockquote className="mb-4 text-gray-700 italic text-lg">"{quote}"</blockquote>
      
      <div className="flex flex-col">
        <span className="font-bold text-[#3C3B6E]">{author}</span>
        <span className="text-sm text-gray-600">
          {title}
          {organization && `, ${organization}`}
        </span>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const { container } = useContainerAnimation();

  const testimonials: TestimonialProps[] = [
    {
      quote: "Dr. Williams' insights on AI security frameworks are groundbreaking. His work is defining the future of safe AI for critical infrastructure.",
      author: "Dr. Sarah Chen",
      title: "Director of AI Research",
      organization: "National Security Institute",
      rating: 5
    },
    {
      quote: "Stolen Nation is a wake-up call that every American should read. Troy Williams illuminates threats to our digital sovereignty with clarity and urgency.",
      author: "Robert Keller",
      title: "Former Intelligence Officer",
      organization: "U.S. Department of Defense",
      rating: 5
    },
    {
      quote: "Troy's approach to cybersecurity doesn't just solve today's problems—it anticipates tomorrow's threats. His Proactive Prevention Platform has revolutionized how we think about digital defense.",
      author: "Michelle Dawson",
      title: "Chief Information Security Officer",
      organization: "AmeriTech Solutions",
      rating: 5
    },
    {
      quote: "Few people truly understand the intersection of AI and national security like Dr. Williams. His work bridges the gap between theoretical advancement and practical defense strategies.",
      author: "James Harrison",
      title: "Technology Policy Advisor",
      organization: "Senate Commerce Committee",
      rating: 5
    }
  ];

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
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
