
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ExternalLink, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  location: string;
  is_virtual: boolean;
  virtual_link: string;
  start_date: string;
  end_date: string;
  registration_required: boolean;
  registration_link: string;
  created_at: string;
}

const EventsCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_public', true)
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatEventDate = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    const startTime = start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    if (endDate) {
      const end = new Date(endDate);
      const endTime = end.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });
      return `${startFormatted}, ${startTime} - ${endTime}`;
    }

    return `${startFormatted}, ${startTime}`;
  };

  const getEventTypeIcon = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'conference':
        return <Users className="h-5 w-5" />;
      case 'webinar':
        return <Video className="h-5 w-5" />;
      case 'workshop':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const eventTypes = ['all', ...Array.from(new Set(events.map(e => e.event_type)))];
  const filteredEvents = selectedType === 'all' 
    ? events 
    : events.filter(e => e.event_type === selectedType);

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-[#3C3B6E] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-6 w-6 text-[#3C3B6E]" />
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join Dr. Troy Williams at upcoming conferences, workshops, and speaking engagements on AI, cybersecurity, and defense technology.
          </p>
        </div>

        {/* Event Type Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {eventTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className="capitalize"
            >
              {type === 'all' ? 'All Events' : type}
            </Button>
          ))}
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getEventTypeIcon(event.event_type)}
                  {event.title}
                </CardTitle>
                <CardDescription>
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {formatEventDate(event.start_date, event.end_date)}
                </div>

                {event.is_virtual ? (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Video className="h-4 w-4" />
                    Virtual Event
                  </div>
                ) : event.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="bg-[#3C3B6E] text-white px-2 py-1 rounded text-sm capitalize">
                    {event.event_type}
                  </span>
                </div>

                {(event.registration_required && event.registration_link) && (
                  <Button
                    onClick={() => window.open(event.registration_link, '_blank')}
                    className="w-full bg-[#B22234] hover:bg-[#9B0000]"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Register Now
                  </Button>
                )}

                {(event.is_virtual && event.virtual_link) && (
                  <Button
                    onClick={() => window.open(event.virtual_link, '_blank')}
                    variant="outline"
                    className="w-full"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Join Virtual Event
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No upcoming events in this category.</p>
            <p className="text-gray-400">Check back soon for new speaking engagements and events.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsCalendar;
