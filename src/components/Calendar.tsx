import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="crt-button">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xl crt-text">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="crt-button">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center p-2 border border-[#B20000]">
            {day}
          </div>
        ))}
        
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}
        
        {days.map(day => (
          <div
            key={day.toISOString()}
            className={`p-2 text-center border border-[#B20000] ${
              isToday(day) ? 'bg-[#D1D1D1] text-black' : ''
            }`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}