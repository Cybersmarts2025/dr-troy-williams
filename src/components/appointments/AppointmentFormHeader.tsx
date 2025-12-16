
import React from 'react';
import { Calendar } from 'lucide-react';

const AppointmentFormHeader = () => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-[#3C3B6E] mb-2 flex items-center justify-center gap-2">
        <Calendar className="h-7 w-7" />
        Book an Appointment
      </h2>
      <p className="text-gray-600">Schedule a consultation with Dr. Troy Williams</p>
    </div>
  );
};

export default AppointmentFormHeader;
