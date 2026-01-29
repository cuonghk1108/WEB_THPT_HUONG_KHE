import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllNews, getAllEvents, getAllGalleryImages, getAllTeachers, getAllClubs, getAllLibraryDocuments, getAllAchievements } from '../services/supabaseService';

interface SupabaseContextType {
  news: any[];
  events: any[];
  gallery: any[];
  teachers: any[];
  clubs: any[];
  library: any[];
  achievements: any[];
  isLoading: boolean;
  error: string | null;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SupabaseContextType>({
    news: [],
    events: [],
    gallery: [],
    teachers: [],
    clubs: [],
    library: [],
    achievements: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔄 Loading data from Supabase...');
        
        const [news, events, gallery, teachers, clubs, library, achievements] = await Promise.all([
          getAllNews(),
          getAllEvents(),
          getAllGalleryImages(),
          getAllTeachers(),
          getAllClubs(),
          getAllLibraryDocuments(),
          getAllAchievements()
        ]);

        setData({
          news: news || [],
          events: events || [],
          gallery: gallery || [],
          teachers: teachers || [],
          clubs: clubs || [],
          library: library || [],
          achievements: achievements || [],
          isLoading: false,
          error: null
        });

        console.log('✅ Data loaded successfully');
        console.log('📊 Data:', { 
          news: news?.length, 
          events: events?.length, 
          gallery: gallery?.length,
          teachers: teachers?.length,
          clubs: clubs?.length,
          library: library?.length,
          achievements: achievements?.length
        });

      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Error loading data:', errorMsg);
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: errorMsg
        }));
      }
    };

    loadData();
  }, []);

  return (
    <SupabaseContext.Provider value={data}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabaseData = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabaseData must be used within SupabaseProvider');
  }
  return context;
};

export default SupabaseContext;
