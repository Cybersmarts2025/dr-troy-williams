
import * as z from 'zod';

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  appointment_type: z.string().min(1, 'Please select an appointment type'),
  preferred_date: z.string().min(1, 'Please select a date'),
  preferred_time: z.string().min(1, 'Please select a time'),
  duration_minutes: z.number().min(30, 'Minimum duration is 30 minutes'),
  message: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
