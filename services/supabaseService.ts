import { createClient } from '@supabase/supabase-js';

// Supabase Config
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Config Check:');
console.log('   URL:', supabaseUrl ? '✅ Configured' : '❌ Missing');
console.log('   Key:', supabaseKey ? '✅ Configured' : '❌ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables - using fallback data');
}

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// ========== News Management ==========
export async function saveNews(newsData: any) {
  try {
    const { data, error } = await supabase
      .from('news')
      .upsert({
        ...newsData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving news:', error);
    throw error;
  }
}

export async function getAllNews() {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export async function deleteNews(newsId: string) {
  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', newsId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
}

// ========== Events Management ==========
export async function saveEvent(eventData: any) {
  try {
    const { data, error } = await supabase
      .from('events')
      .upsert({
        ...eventData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
}

export async function getAllEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

// ========== Gallery Management ==========
export async function saveGalleryImage(imageData: any) {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .upsert({
        ...imageData,
        uploaded_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving gallery image:', error);
    throw error;
  }
}

export async function getAllGalleryImages() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    throw error;
  }
}

export async function deleteGalleryImage(imageId: string) {
  try {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', imageId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
}

// ========== Teachers Management ==========
export async function saveTeacher(teacherData: any) {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .upsert({
        ...teacherData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving teacher:', error);
    throw error;
  }
}

export async function getAllTeachers() {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
}

export async function deleteTeacher(teacherId: string) {
  try {
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', teacherId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
}

// ========== Clubs Management ==========
export async function saveClub(clubData: any) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .upsert({
        ...clubData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving club:', error);
    throw error;
  }
}

export async function getAllClubs() {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
}

export async function deleteClub(clubId: string) {
  try {
    const { error } = await supabase
      .from('clubs')
      .delete()
      .eq('id', clubId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting club:', error);
    throw error;
  }
}

// ========== Digital Library Management ==========
export async function saveLibraryDocument(docData: any) {
  try {
    const { data, error } = await supabase
      .from('library')
      .upsert({
        ...docData,
        uploaded_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving library document:', error);
    throw error;
  }
}

export async function getAllLibraryDocuments() {
  try {
    const { data, error } = await supabase
      .from('library')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching library documents:', error);
    throw error;
  }
}

export async function deleteLibraryDocument(docId: string) {
  try {
    const { error } = await supabase
      .from('library')
      .delete()
      .eq('id', docId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting library document:', error);
    throw error;
  }
}

// ========== Achievements Management ==========
export async function saveAchievement(achievementData: any) {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .upsert({
        ...achievementData,
        created_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving achievement:', error);
    throw error;
  }
}

export async function getAllAchievements() {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('year', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }
}

export async function deleteAchievement(achievementId: string) {
  try {
    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', achievementId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting achievement:', error);
    throw error;
  }
}

// ========== Student Portal Management ==========
export async function saveStudentPortalData(portalData: any) {
  try {
    const { data, error } = await supabase
      .from('student_portal')
      .upsert({
        ...portalData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving student portal data:', error);
    throw error;
  }
}

export async function getStudentPortalData() {
  try {
    const { data, error } = await supabase
      .from('student_portal')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || {};
  } catch (error) {
    console.error('Error fetching student portal data:', error);
    throw error;
  }
}

// ========== Lunch Menu Management ==========
export async function saveLunchMenu(menuData: any) {
  try {
    const { data, error } = await supabase
      .from('lunch_menu')
      .upsert({
        ...menuData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving lunch menu:', error);
    throw error;
  }
}

export async function getAllLunchMenus() {
  try {
    const { data, error } = await supabase
      .from('lunch_menu')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching lunch menus:', error);
    throw error;
  }
}

export async function deleteLunchMenu(menuId: string) {
  try {
    const { error } = await supabase
      .from('lunch_menu')
      .delete()
      .eq('id', menuId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting lunch menu:', error);
    throw error;
  }
}

// ========== Contact Messages Management ==========
export async function saveContactMessage(messageData: any) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        ...messageData,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving contact message:', error);
    throw error;
  }
}

export async function getAllContactMessages() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  }
}

export async function deleteContactMessage(messageId: string) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', messageId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
}

// ========== Settings Management ==========
export async function updateSettings(settingKey: string, value: any) {
  try {
    const { data, error } = await supabase
      .from('settings')
      .upsert({
        key: settingKey,
        value: value,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

export async function getSetting(key: string) {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.value || null;
  } catch (error) {
    console.error('Error fetching setting:', error);
    throw error;
  }
}

export async function getAllSettings() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
}

// ========== Real-time Subscriptions ==========
export function subscribeToNews(callback: (data: any[]) => void) {
  const subscription = supabase
    .from('news')
    .on('*', (payload) => {
      console.log('News changed:', payload);
      getAllNews().then(callback);
    })
    .subscribe();

  return () => subscription.unsubscribe();
}

export function subscribeToEvents(callback: (data: any[]) => void) {
  const subscription = supabase
    .from('events')
    .on('*', (payload) => {
      console.log('Events changed:', payload);
      getAllEvents().then(callback);
    })
    .subscribe();

  return () => subscription.unsubscribe();
}

export function subscribeToGallery(callback: (data: any[]) => void) {
  const subscription = supabase
    .from('gallery')
    .on('*', (payload) => {
      console.log('Gallery changed:', payload);
      getAllGalleryImages().then(callback);
    })
    .subscribe();

  return () => subscription.unsubscribe();
}

export default supabase;
