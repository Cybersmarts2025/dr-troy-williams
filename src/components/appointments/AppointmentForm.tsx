
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { appointmentSchema, AppointmentFormData } from './appointmentSchema';
import { useAppointmentSubmit } from './useAppointmentSubmit';
import AppointmentFormHeader from './AppointmentFormHeader';
import AppointmentFormFields from './AppointmentFormFields';

const AppointmentForm = () => {
  const { submitAppointment, isSubmitting } = useAppointmentSubmit();

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      appointment_type: '',
      preferred_date: '',
      preferred_time: '',
      duration_minutes: 60,
      message: '',
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    const success = await submitAppointment(data);
    if (success) {
      form.reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <AppointmentFormHeader />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AppointmentFormFields form={form} />

          <Button 
            type="submit" 
            className="w-full bg-[#3C3B6E] hover:bg-[#2A2952]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Appointment Request'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
