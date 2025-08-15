import { motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

const Events = () => {
  const { data: events, isLoading, error } = trpc.events.getUpcomingEvents.useQuery();

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-40"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <p className="text-gray-500">Could not load events</p>
      </div>
    );
  }

  // Ensure events is an array and has items
  if (!events || !Array.isArray(events) || events.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No upcoming events right now</p>
      </div>
    );
  }

  const formatDate = (date: Date | string) => {
    const eventDate = date ? new Date(date) : new Date();
    return eventDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date | string) => {
    const eventDate = date ? new Date(date) : new Date();
    return eventDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-semibold text-black mb-2">
          Events & Happenings
        </h2>
        <p className="text-gray-600">Experience exclusive evenings at Vibliotek</p>
      </div>

      {/* Events grid */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border-2 border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Event image placeholder */}
            <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>

            {/* Event content */}
            <div className="p-4">
              {/* Event title and featured badge */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-black text-lg leading-tight">
                  {event.title}
                </h3>
                {event.currentAttendees > event.maxAttendees * 0.8 && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    Almost Full
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {event.description}
              </p>

              {/* Event details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)} • {formatTime(event.date)}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{event.duration}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>
                    {event.currentAttendees} of {event.maxAttendees} spots
                  </span>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-black">
                  {event.price} kr
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    px-6 py-2 rounded-lg font-medium transition-colors
                    ${event.currentAttendees >= event.maxAttendees
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                    }
                  `}
                  disabled={event.currentAttendees >= event.maxAttendees}
                >
                  {event.currentAttendees >= event.maxAttendees ? 'Fully Booked' : 'Book Spot'}
                </motion.button>
              </div>

              {/* Availability indicator */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Available spots</span>
                  <span>{event.maxAttendees - event.currentAttendees} left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((event.maxAttendees - event.currentAttendees) / event.maxAttendees) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom info */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
        </div>
        <p className="text-sm text-gray-600">
          Book your spots in advance to ensure your participation
        </p>
      </div>
    </motion.div>
  );
};

export default Events;
