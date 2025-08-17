import React from 'react';

const DayCell = ({ date, events, isToday, onClick, currentMonth }) => {
  const isCurrentMonth = date.month() === currentMonth;

  return (
    <div
      className={`border rounded p-2 h-24 cursor-pointer hover:bg-blue-100 transition relative ${
        isToday ? 'bg-yellow-100' : ''
      } ${!isCurrentMonth ? 'bg-gray-100 text-gray-400 cursor-default' : ''}`}
      onClick={() => isCurrentMonth && onClick()}
    >
      
      <div className="text-sm font-bold mb-1">
        {isCurrentMonth ? date.date() : ''}
      </div>
     
      {isCurrentMonth &&
        events.slice(0, 2).map((event, idx) => (
          <div key={idx} className="text-xs truncate bg-blue-200 rounded px-1 py-0.5 mb-0.5">
            {event.title}
          </div>
        ))}
    </div>
  );
};

export default DayCell;
