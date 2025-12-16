
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";

const TestimonialSubmission = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Submit Testimonial | Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="Share your experience working with Dr. Troy Williams and help others understand the value of his expertise." 
        />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Submit Testimonial" />
        
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Share Your Experience</h1>
              <p className="text-xl text-muted-foreground">
                Your feedback helps others understand the value of Dr. Troy Williams' expertise and services.
              </p>
            </div>
            
            <TestimonialForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TestimonialSubmission;
