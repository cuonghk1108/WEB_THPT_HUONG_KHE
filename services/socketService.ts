/**
 * Socket.io Real-time Client Service
 * WebSocket connection to MongoDB backend
 */

import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const socketService = {
  /**
   * Initialize Socket.io connection
   */
  connect(): Socket {
    if (socket && socket.connected) {
      return socket;
    }

    socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    socket.on('connect', () => {
      console.log('🔴 Socket.io connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket.io disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket.io connection error:', error);
    });

    return socket;
  },

  /**
   * Get Socket.io instance
   */
  getSocket(): Socket | null {
    return socket;
  },

  /**
   * Subscribe to news updates
   */
  onNewsCreated(callback: (news: any) => void) {
    if (!socket) this.connect();
    socket?.on('news:created', callback);
  },

  onNewsUpdated(callback: (news: any) => void) {
    if (!socket) this.connect();
    socket?.on('news:updated', callback);
  },

  onNewsDeleted(callback: (id: string) => void) {
    if (!socket) this.connect();
    socket?.on('news:deleted', callback);
  },

  /**
   * Subscribe to gallery updates
   */
  onGalleryCreated(callback: (image: any) => void) {
    if (!socket) this.connect();
    socket?.on('gallery:created', (image) => {
      console.log('📸 [Socket.io] Gallery image received:', image);
      callback(image);
    });
  },

  onGalleryUpdated(callback: (image: any) => void) {
    if (!socket) this.connect();
    socket?.on('gallery:updated', callback);
  },

  onGalleryDeleted(callback: (id: string) => void) {
    if (!socket) this.connect();
    socket?.on('gallery:deleted', callback);
  },

  /**
   * Subscribe to teacher updates
   */
  onTeacherCreated(callback: (teacher: any) => void) {
    if (!socket) this.connect();
    socket?.on('teacher:created', callback);
  },

  onTeacherUpdated(callback: (teacher: any) => void) {
    if (!socket) this.connect();
    socket?.on('teacher:updated', callback);
  },

  onTeacherDeleted(callback: (id: string) => void) {
    if (!socket) this.connect();
    socket?.on('teacher:deleted', callback);
  },

  /**
   * Subscribe to club updates
   */
  onClubCreated(callback: (club: any) => void) {
    if (!socket) this.connect();
    socket?.on('club:created', callback);
  },

  onClubUpdated(callback: (club: any) => void) {
    if (!socket) this.connect();
    socket?.on('club:updated', callback);
  },

  onClubDeleted(callback: (id: string) => void) {
    if (!socket) this.connect();
    socket?.on('club:deleted', callback);
  },

  /**
   * Subscribe to event updates
   */
  onEventCreated(callback: (event: any) => void) {
    if (!socket) this.connect();
    socket?.on('event:created', callback);
  },

  onEventUpdated(callback: (event: any) => void) {
    if (!socket) this.connect();
    socket?.on('event:updated', callback);
  },

  onEventDeleted(callback: (id: string) => void) {
    if (!socket) this.connect();
    socket?.on('event:deleted', callback);
  },

  /**
   * Disconnect Socket.io
   */
  disconnect() {
    if (socket) {
      socket.disconnect();
      socket = null;
      console.log('🔴 Socket.io disconnected');
    }
  }
};
