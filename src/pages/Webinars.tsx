
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WebinarRegistration from "@/components/webinars/WebinarRegistration";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, Users, Video } from 'lucide-react';

const Webinars = () => {
  const [selectedWebinar, setSelectedWebinar] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: webinars, isLoading } = useQuery({
    queryKey: ['webinars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('webinars')
        .select('*')
        .eq('is_public', true)
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (selectedWebinar) {
    const webinar = webinars?.find(w => w.id === selectedWebinar);
    if (webinar) {
      return (
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <main className="pt-16">
            <PageBreadcrumb pageName="Webinar Registration" />
            <div className="container mx-auto px-4 py-16">
              <Button 
                onClick={() => setSelectedWebinar(null)}
                className="mb-8 bg-gray-600 hover:bg-gray-700"
              >
                ← Back to Webinars
              </Button>
              <WebinarRegistration
                webinarId={webinar.id}
                webinarTitle={webinar.title}
                webinarDate={webinar.date}
                maxAttendees={webinar.max_attendees || undefined}
              />
            </div>
          </main>
          <Footer />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Webinars | Dr. Troy Williams - Educational Sessions on AI & Cybersecurity</title>
        <meta 
          name="description" 
          content="Join Dr. Troy Williams for educational webinars on cybersecurity, AI, and defense technology. Register for upcoming sessions." 
        />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Webinars" />
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#3C3B6E] mb-4 flex items-center justify-center gap-3">
              <Video className="h-10 w-10" />
              Educational Webinars
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join Dr. Troy Williams for exclusive webinars covering the latest in cybersecurity, AI, and defense technology.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-16 h-16 border-4 border-[#3C3B6E] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : webinars && webinars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webinars.map((webinar) => (
                <Card key={webinar.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#3C3B6E]">{webinar.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(webinar.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {new Date(webinar.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })} ({webinar.duration_minutes} minutes)
                      </div>
                      {webinar.max_attendees && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          Limited to {webinar.max_attendees} attendees
                        </div>
                      )}
                    </div>
                    <Button 
                      onClick={() => setSelectedWebinar(webinar.id)}
                      className="w-full bg-[#3C3B6E] hover:bg-[#2A2952]"
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Upcoming Webinars</h3>
              <p className="text-gray-600">Check back soon for new webinar announcements.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Webinars;
