import React, { createContext, useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
    const [events, setEvents] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('calendar-events');
        // console.log(stored);
        if (stored) {
            try {
                setEvents(JSON.parse(stored));
            } catch (err) {
                console.error('Failed to parse localStorage data', err);
            }
        }
    }, []);

    useEffect(() => {
        // console.log(events);
        localStorage.setItem('calendar-events', JSON.stringify(events));
    }, [events]);


    const saveEvent = (date, event) => {
        const key = date.format('YYYY-MM-DD');
        setEvents(prev => {
            const updated = {
                ...prev,
                [key]: [...(prev[key] || []), event],
            };
            // console.log(updated);
            return updated;
        });
    };



    const deleteEvent = (date, eventIdx) => {
        const key = date.format('YYYY-MM-DD');
        setEvents(prev => {
            const updated = [...prev[key]];
            updated.splice(eventIdx, 1);
            return { ...prev, [key]: updated };
        });
    };

    const editEvent = (date, eventIdx, updatedEvent) => {
        const key = date.format('YYYY-MM-DD');
        setEvents(prev => {
            const updated = [...prev[key]];
            updated[eventIdx] = updatedEvent;
            return { ...prev, [key]: updated };
        });
    };


    return (
        <CalendarContext.Provider value={{
            events,
            selectedDate,
            setSelectedDate,
            saveEvent,
            deleteEvent,
            editEvent,
        }}>
            {children}
        </CalendarContext.Provider>
    );
};

// I created another custom hook for consuming context
export const useCalendarContext = () => useContext(CalendarContext);
