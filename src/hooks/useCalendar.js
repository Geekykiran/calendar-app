import { useState } from 'react';
import dayjs from 'dayjs';

// I created this custom hook for generating the days for the current month
export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  // console.log(currentDate);
    

  const nextMonth = () => setCurrentDate(prev => prev.add(1, 'month'));
  const prevMonth = () => setCurrentDate(prev => prev.subtract(1, 'month'));

  const getMonthDays = () => {
    const start = currentDate.startOf('month').startOf('week');
    const end = currentDate.endOf('month').endOf('week');
    const days = [];
    let day = start;

    while (day <= end) {
      days.push(day);
      day = day.add(1, 'day');
    }

    return days;
  };

  return {
    currentDate,
    nextMonth,
    prevMonth,
    getMonthDays
  };
};
