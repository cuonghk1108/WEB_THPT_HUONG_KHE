import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  const { events = [] } = useData();

  // Sort events by date
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [events]);

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = sortedEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = sortedEvents.filter(e => new Date(e.date) < now);

  const EventCard: React.FC<{ event: any; isPast?: boolean }> = ({ event, isPast }) => (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow ${isPast ? 'opacity-75' : ''}`}>
      {event.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex-1">{event.title}</h3>
          {isPast && <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full">Đã qua</span>}
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary-600" />
            <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary-600" />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary-600" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {event.id && (
          <Link 
            to={`/su-kien/${event.id}`}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
          >
            Chi tiết <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-4">
            Sự kiện & Hoạt động
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Khám phá các sự kiện, hoạt động và chương trình đặc biệt tại trường
          </p>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary-600" />
              Sự kiện sắp tới
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Sự kiện đã qua
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map(event => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-xl text-slate-600 dark:text-slate-400">Chưa có sự kiện nào được công bố</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
