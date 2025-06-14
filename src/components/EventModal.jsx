import React, { useState } from 'react';
import { useCalendarContext } from '../context/CalendarContext';
import { motion, AnimatePresence } from 'framer-motion';

const EventModal = () => {
  const { selectedDate, saveEvent, deleteEvent, editEvent, setSelectedDate, events } = useCalendarContext();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const dayKey = selectedDate.format('YYYY-MM-DD');
  const dayEvents = events[dayKey] || [];

  const handleSubmit = () => {
    if (!title.trim()) return;

    const eventData = {
      title,
      desc,
      allDay,
      time: allDay ? 'All Day' : `${startTime} - ${endTime}`
    };

    if (editingIndex !== null) {
      editEvent(selectedDate, editingIndex, eventData);
      setEditingIndex(null);
    } else {
      saveEvent(selectedDate, eventData);
    }

    setTitle('');
    setDesc('');
    setStartTime('');
    setEndTime('');
    setAllDay(false);
  };

  const handleEdit = (event, index) => {
    setTitle(event.title);
    setDesc(event.desc);
    setAllDay(event.allDay);
    if (!event.allDay && event.time.includes('-')) {
      const [start, end] = event.time.split(' - ');
      setStartTime(start);
      setEndTime(end);
    } else {
      setStartTime('');
      setEndTime('');
    }
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    deleteEvent(selectedDate, index);
  };

  const closeModal = () => {
    setTitle('');
    setDesc('');
    setStartTime('');
    setEndTime('');
    setAllDay(false);
    setEditingIndex(null);
    setSelectedDate(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/10 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="bg-white/30 text-black shadow-[0_15px_25px_rgba(0,0,0,0.4)] rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manage Events for {selectedDate.format('DD MMM YYYY')}</h2>
            <button className="hover:text-red-500 font-semibold text-lg" onClick={closeModal}>✕</button>
          </div>

          <div className="md:flex md:space-x-6 space-y-6 md:space-y-0">
            {/* Left: Add/Edit Form */}
            <div className="md:w-1/2">
              <h3 className="text-lg font-semibold mb-2">{editingIndex !== null ? 'Edit Event' : 'Add Event'}</h3>
              <div className="space-y-3">
                <input
                  className="w-full bg-white/50 rounded px-3 py-2 border border-gray-300 placeholder-gray-700"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Event title *"
                />
                <input
                  className="w-full bg-white/50 rounded px-3 py-2 border border-gray-300 placeholder-gray-700"
                  type="text"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="Description"
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={allDay}
                    onChange={(e) => setAllDay(e.target.checked)}
                  />
                  <label>All-day event</label>
                </div>

                {!allDay && (
                  <div className="flex space-x-2">
                    <input
                      className="w-1/2 bg-white/50 rounded px-3 py-2 border border-gray-300"
                      type="time"
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                    />
                    <input
                      className="w-1/2 bg-white/50 rounded px-3 py-2 border border-gray-300"
                      type="time"
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={handleSubmit}
                    disabled={!title.trim() || (!allDay && (!startTime || !endTime))}
                  >
                    {editingIndex !== null ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Event List */}
            <div className="md:w-1/2">
              <h3 className="text-lg font-semibold mb-2">Events</h3>
              <input
                className="w-full bg-white/50 px-3 py-2 mb-3 rounded border border-gray-300 placeholder-gray-700"
                type="text"
                placeholder="🔍 Search by title"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
                {dayEvents.length > 0 ? (
                  dayEvents
                    .filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
                        className="bg-white/60 hover:bg-white/70 px-4 py-2 rounded shadow transition"
                      >
                        <div className="font-semibold">{event.title}</div>
                        <div className="text-sm text-gray-700">
                          {event.time}{event.desc && ` – ${event.desc}`}
                        </div>
                        <div className="mt-1 flex space-x-3">
                          <button className="text-blue-600 hover:underline text-sm" onClick={() => handleEdit(event, index)}>Edit</button>
                          <button className="text-red-600 hover:underline text-sm" onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                      </motion.div>
                    ))
                ) : (
                  <p className="text-sm text-gray-600">No events yet.</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;
