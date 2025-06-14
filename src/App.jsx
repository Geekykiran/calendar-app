import React from 'react';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import { useCalendarContext } from './context/CalendarContext';

const App = () => {
  const { selectedDate, setSelectedDate } = useCalendarContext();

  return (
    <div className="container mx-auto p-4">
      <CalendarGrid />
      {selectedDate && (
        <EventModal />
      )}
    </div>
  );
};

export default App;
