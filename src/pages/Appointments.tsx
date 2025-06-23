
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EnhancedAppointmentForm from "@/components/appointments/EnhancedAppointmentForm";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";

const Appointments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Book Appointment | Dr. Troy Williams - Schedule Your Consultation</title>
        <meta 
          name="description" 
          content="Schedule a consultation with Dr. Troy Williams for cybersecurity, AI strategy, technical advisory, or mentoring sessions." 
        />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Book Appointment" />
        
        <div className="container mx-auto px-4 py-16">
          <EnhancedAppointmentForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Appointments;
