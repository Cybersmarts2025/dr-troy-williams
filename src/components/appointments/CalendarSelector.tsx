
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

interface CalendarSelectorProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const CalendarSelector = ({ selectedDate, onDateChange }: CalendarSelectorProps) => {
  const today = new Date();
  
  // Disable past dates and weekends
  const disabledDates = (date: Date) => {
    const day = date.getDay();
    return date < today || day === 0 || day === 6; // Disable past dates, Sundays (0), and Saturdays (6)
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarDays className="h-5 w-5" />
          Select Date
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          disabled={disabledDates}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};

export default CalendarSelector;
