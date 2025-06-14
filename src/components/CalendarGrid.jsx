import React from 'react';
import DayCell from './DayCell';
import { useCalendar } from '../hooks/useCalendar';
import { useCalendarContext } from '../context/CalendarContext';
import dayjs from 'dayjs';

const CalendarGrid = () => {
  const { currentDate, nextMonth, prevMonth, getMonthDays } = useCalendar();
  const { events, setSelectedDate } = useCalendarContext();
  const days = getMonthDays();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="btn">Previous</button>
        <h2 className="text-xl font-semibold">{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={nextMonth} className="btn">Next</button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mt-2">
        {days.map(date => (
          <DayCell
            key={date.toString()}
            date={date}
            currentMonth={currentDate.month()}
            events={events[date.format('YYYY-MM-DD')] || []}
            isToday={date.isSame(dayjs(), 'day')}
            onClick={() => setSelectedDate(date)}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
