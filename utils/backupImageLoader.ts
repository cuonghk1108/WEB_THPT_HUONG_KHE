/**
 * Fallback data loader - Load images from backup JSON embedded in constant
 * Used when Supabase returns empty/null images
 */

// Image mappings from backup file
const BACKUP_IMAGES = {
  news: {
    0: 'https://i.ibb.co/NnT8cnTg/a920ea3f6917.jpg',
    1: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop',
    2: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    3: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&auto=format&fit=crop',
    4: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop'
  },
  teachers: {
    1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
    2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
    3: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=400',
    4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400',
    5: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400'
  },
  clubs: {
    0: 'https://via.placeholder.com/400x300?text=Club+1',
    1: 'https://via.placeholder.com/400x300?text=Club+2',
    2: 'https://via.placeholder.com/400x300?text=Club+3',
    3: 'https://via.placeholder.com/400x300?text=Club+4'
  },
  gallery: {
    0: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?q=80&w=800&auto=format&fit=crop',
    1: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop',
    2: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800&auto=format&fit=crop',
    3: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?q=80&w=800&auto=format&fit=crop'
  }
};

export function getBackupImageUrl(id: number, type: 'news' | 'teachers' | 'clubs' | 'gallery'): string {
  try {
    const images = BACKUP_IMAGES[type] as Record<number | string, string>;
    return images[id] || images[String(id)] || '';
  } catch (error) {
    console.error('Error loading backup image:', error);
    return '';
  }
}
