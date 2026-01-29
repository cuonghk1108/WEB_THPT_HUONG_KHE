import { supabase } from './supabaseService';
import { RealtimeChannel } from '@supabase/supabase-js';

/**
 * Real-time Listener Service
 * Provides real-time subscriptions to Supabase tables
 * Auto-updates UI when data changes on other devices/browsers
 */

// Store active subscriptions
let newsChannel: RealtimeChannel | null = null;
let teachersChannel: RealtimeChannel | null = null;
let clubsChannel: RealtimeChannel | null = null;
let galleryChannel: RealtimeChannel | null = null;
let eventsChannel: RealtimeChannel | null = null;

/**
 * Subscribe to news table changes
 * @param onUpdate Callback when news changes
 */
export const subscribeToNews = (onUpdate: () => void) => {
  try {
    if (newsChannel) {
      supabase.removeChannel(newsChannel);
    }

    newsChannel = supabase
      .channel('public:news')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'news' 
        },
        (payload) => {
          console.log('[Real-time] News update:', payload);
          onUpdate();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Subscribed to news changes');
        }
      });

    return newsChannel;
  } catch (error) {
    console.error('Failed to subscribe to news:', error);
  }
};

/**
 * Subscribe to teachers table changes
 * @param onUpdate Callback when teachers change
 */
export const subscribeToTeachers = (onUpdate: () => void) => {
  try {
    if (teachersChannel) {
      supabase.removeChannel(teachersChannel);
    }

    teachersChannel = supabase
      .channel('public:teachers')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'teachers' 
        },
        (payload) => {
          console.log('[Real-time] Teachers update:', payload);
          onUpdate();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Subscribed to teachers changes');
        }
      });

    return teachersChannel;
  } catch (error) {
    console.error('Failed to subscribe to teachers:', error);
  }
};

/**
 * Subscribe to clubs table changes
 * @param onUpdate Callback when clubs change
 */
export const subscribeToClubs = (onUpdate: () => void) => {
  try {
    if (clubsChannel) {
      supabase.removeChannel(clubsChannel);
    }

    clubsChannel = supabase
      .channel('public:clubs')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'clubs' 
        },
        (payload) => {
          console.log('[Real-time] Clubs update:', payload);
          onUpdate();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Subscribed to clubs changes');
        }
      });

    return clubsChannel;
  } catch (error) {
    console.error('Failed to subscribe to clubs:', error);
  }
};

/**
 * Subscribe to gallery table changes
 * @param onUpdate Callback when gallery changes
 */
export const subscribeToGallery = (onUpdate: () => void) => {
  try {
    if (galleryChannel) {
      supabase.removeChannel(galleryChannel);
    }

    galleryChannel = supabase
      .channel('public:gallery')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'gallery' 
        },
        (payload) => {
          console.log('[Real-time] Gallery update:', payload);
          onUpdate();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Subscribed to gallery changes');
        }
      });

    return galleryChannel;
  } catch (error) {
    console.error('Failed to subscribe to gallery:', error);
  }
};

/**
 * Subscribe to events table changes
 * @param onUpdate Callback when events change
 */
export const subscribeToEvents = (onUpdate: () => void) => {
  try {
    if (eventsChannel) {
      supabase.removeChannel(eventsChannel);
    }

    eventsChannel = supabase
      .channel('public:events')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'events' 
        },
        (payload) => {
          console.log('[Real-time] Events update:', payload);
          onUpdate();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Subscribed to events changes');
        }
      });

    return eventsChannel;
  } catch (error) {
    console.error('Failed to subscribe to events:', error);
  }
};

/**
 * Unsubscribe from all channels
 * Call this when component unmounts
 */
export const unsubscribeAll = () => {
  try {
    if (newsChannel) {
      supabase.removeChannel(newsChannel);
      newsChannel = null;
      console.log('✅ Unsubscribed from news');
    }
    if (teachersChannel) {
      supabase.removeChannel(teachersChannel);
      teachersChannel = null;
      console.log('✅ Unsubscribed from teachers');
    }
    if (clubsChannel) {
      supabase.removeChannel(clubsChannel);
      clubsChannel = null;
      console.log('✅ Unsubscribed from clubs');
    }
    if (galleryChannel) {
      supabase.removeChannel(galleryChannel);
      galleryChannel = null;
      console.log('✅ Unsubscribed from gallery');
    }
    if (eventsChannel) {
      supabase.removeChannel(eventsChannel);
      eventsChannel = null;
      console.log('✅ Unsubscribed from events');
    }
  } catch (error) {
    console.error('Failed to unsubscribe:', error);
  }
};

/**
 * Setup all subscriptions at once
 * Call once on app startup
 */
export const setupAllSubscriptions = (onUpdate: () => void) => {
  subscribeToNews(onUpdate);
  subscribeToTeachers(onUpdate);
  subscribeToClubs(onUpdate);
  subscribeToGallery(onUpdate);
  subscribeToEvents(onUpdate);
};
