
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Calendar, Clock, User, FileDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CalendarSelector from './CalendarSelector';
import { format } from 'date-fns';

const appointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  appointment_type: z.string().min(1, 'Please select an appointment type'),
  preferred_time: z.string().min(1, 'Please select a time'),
  duration_minutes: z.number().min(30, 'Minimum duration is 30 minutes'),
  message: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const appointmentTypes = [
  'Cybersecurity Consultation',
  'AI Strategy Session',
  'Technical Advisory',
  'Private Investigation',
  'Mentoring Session',
  'Other'
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

const EnhancedAppointmentForm = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      appointment_type: '',
      preferred_time: '',
      duration_minutes: 60,
      message: '',
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    if (!selectedDate) {
      toast.error('Please select a date for your appointment');
      return;
    }

    setIsSubmitting(true);
    try {
      const appointmentData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        appointment_type: data.appointment_type,
        preferred_date: new Date(selectedDate.toDateString() + ' ' + data.preferred_time).toISOString(),
        preferred_time: data.preferred_time,
        duration_minutes: data.duration_minutes,
        message: data.message || null,
        user_id: user?.id || null,
      };

      const { error } = await supabase
        .from('appointments')
        .insert(appointmentData);

      if (error) throw error;

      toast.success('Appointment request submitted successfully!');
      form.reset();
      setSelectedDate(undefined);
      
      // Generate calendar file for download
      generateCalendarFile(data, selectedDate);
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit appointment request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateCalendarFile = (data: AppointmentFormData, date: Date) => {
    const startDateTime = new Date(date.toDateString() + ' ' + data.preferred_time);
    const endDateTime = new Date(startDateTime.getTime() + (data.duration_minutes * 60000));
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Dr. Troy Williams//Appointment//EN
BEGIN:VEVENT
UID:appointment-${Date.now()}@drtroywilliams.net
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDateTime)}
DTEND:${formatDate(endDateTime)}
SUMMARY:${data.appointment_type} with Dr. Troy Williams
DESCRIPTION:Appointment scheduled with Dr. Troy Williams\\n\\nType: ${data.appointment_type}\\nDuration: ${data.duration_minutes} minutes\\n\\nMessage: ${data.message || 'No additional message'}
ORGANIZER:mailto:appointments@drtroywilliams.net
ATTENDEE:mailto:${data.email}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment-${format(date, 'yyyy-MM-dd')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Calendar file downloaded! Add it to your calendar.');
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#3C3B6E] mb-2 flex items-center justify-center gap-2">
          <Calendar className="h-7 w-7" />
          Book an Appointment
        </h2>
        <p className="text-gray-600">Schedule a consultation with Dr. Troy Williams</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CalendarSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </FormLabel>
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
                name="appointment_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preferred_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Preferred Time
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration_minutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe what you'd like to discuss"
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-[#3C3B6E] hover:bg-[#2A2952] flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : (
                  <>
                    Submit Appointment Request
                    <FileDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAppointmentForm;
