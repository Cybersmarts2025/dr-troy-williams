
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Video, Users, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  questions: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface WebinarRegistrationProps {
  webinarId: string;
  webinarTitle: string;
  webinarDate: string;
  maxAttendees?: number;
  currentAttendees?: number;
}

const WebinarRegistration: React.FC<WebinarRegistrationProps> = ({
  webinarId,
  webinarTitle,
  webinarDate,
  maxAttendees,
  currentAttendees = 0
}) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      questions: '',
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const registrationData = {
        ...data,
        webinar_id: webinarId,
        user_id: user?.id || null,
      };

      const { error } = await supabase
        .from('webinar_registrations')
        .insert([registrationData]);

      if (error) throw error;

      toast.success('Successfully registered for the webinar!');
      form.reset();
    } catch (error: any) {
      toast.error(error.message || 'Failed to register for webinar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFull = maxAttendees && currentAttendees >= maxAttendees;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#3C3B6E] mb-2 flex items-center justify-center gap-2">
          <Video className="h-7 w-7" />
          Register for Webinar
        </h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{webinarTitle}</h3>
        <div className="flex items-center justify-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(webinarDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          {maxAttendees && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {currentAttendees}/{maxAttendees} registered
            </div>
          )}
        </div>
      </div>

      {isFull ? (
        <div className="text-center py-8">
          <p className="text-lg font-semibold text-red-600 mb-4">This webinar is full</p>
          <p className="text-gray-600">Registration is no longer available for this webinar.</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company/Organization (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company or organization" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="questions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Questions for the Presenter (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any specific questions you'd like addressed during the webinar?"
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-[#3C3B6E] hover:bg-[#2A2952]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register for Webinar'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default WebinarRegistration;
