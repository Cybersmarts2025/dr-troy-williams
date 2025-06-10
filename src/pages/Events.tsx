
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EventsCalendar from "@/components/events/EventsCalendar";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Events & Speaking | Dr. Troy Williams - AI & Cybersecurity Expert</title>
        <meta 
          name="description" 
          content="Join Dr. Troy Williams at upcoming conferences, workshops, and speaking engagements on AI, cybersecurity, and defense technology." 
        />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Events" />
        <EventsCalendar />
      </main>

      <Footer />
    </div>
  );
};

export default Events;
