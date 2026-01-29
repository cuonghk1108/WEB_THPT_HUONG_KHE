import React from 'react';
import { useData } from '../context/DataContext';

/**
 * Debug component to show data loading status
 * Only visible in development mode
 */
export const DataDebugStatus: React.FC = () => {
  const { news, teachers, clubs, gallery, events } = useData();

  // Only show in development or if explicitly enabled
  const isDev = import.meta.env.DEV || localStorage.getItem('debug_data_status') === 'true';
  
  if (!isDev) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 text-white p-4 rounded-lg shadow-lg text-xs font-mono max-w-xs z-50 max-h-48 overflow-auto">
      <div className="font-bold mb-2 text-yellow-400">📊 Data Status</div>
      <div>News: {news.length} items ✅</div>
      <div>Teachers: {teachers.length} items ✅</div>
      <div>Clubs: {clubs.length} items ✅</div>
      <div>Gallery: {gallery.length} items ✅</div>
      <div>Events: {events.length} items ✅</div>
      <div className="text-xs text-gray-400 mt-2">Open browser console for details</div>
      <button 
        onClick={() => {
          localStorage.removeItem('debug_data_status');
          window.location.reload();
        }}
        className="text-xs mt-2 px-2 py-1 bg-red-600 rounded hover:bg-red-700"
      >
        Close
      </button>
    </div>
  );
};
