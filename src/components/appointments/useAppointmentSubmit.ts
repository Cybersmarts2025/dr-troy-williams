
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AppointmentFormData } from './appointmentSchema';

export const useAppointmentSubmit = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAppointment = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      const appointmentData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        appointment_type: data.appointment_type,
        preferred_date: new Date(data.preferred_date + 'T' + data.preferred_time).toISOString(),
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
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit appointment request');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitAppointment, isSubmitting };
};
