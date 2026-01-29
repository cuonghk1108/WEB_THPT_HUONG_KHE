/**
 * Data Loading Utility with Fallback System
 * Ensures data always displays on client, with multiple fallback strategies:
 * 1. Supabase (primary)
 * 2. localStorage (cached)
 * 3. Initial/Default data (fallback)
 */

export interface LoadDataOptions<T> {
  key: string; // localStorage key
  initialData: T; // Fallback data
  loader: () => Promise<T>; // Supabase loader function
  onSuccess?: (data: T, source: 'supabase' | 'cache' | 'initial') => void;
  onError?: (error: any) => void;
}

/**
 * Smart data loader with automatic fallbacks
 * @returns Promise<{ data, source }>
 */
export async function loadDataWithFallback<T>(
  options: LoadDataOptions<T>
): Promise<{ data: T; source: 'supabase' | 'cache' | 'initial' }> {
  const { key, initialData, loader, onSuccess, onError } = options;

  try {
    // Try to load from Supabase first
    console.log(`📥 Loading ${key} from Supabase...`);
    const supabaseData = await loader();
    
    if (supabaseData && (Array.isArray(supabaseData) ? supabaseData.length > 0 : Object.keys(supabaseData).length > 0)) {
      console.log(`✅ ${key}: Loaded from Supabase (${Array.isArray(supabaseData) ? supabaseData.length : 1} items)`);
      // Cache it
      localStorage.setItem(key, JSON.stringify(supabaseData));
      onSuccess?.(supabaseData, 'supabase');
      return { data: supabaseData, source: 'supabase' };
    }
    
    console.log(`⚠️ ${key}: Supabase returned empty, trying localStorage...`);
  } catch (error) {
    console.warn(`⚠️ ${key}: Supabase error, trying localStorage...`, error);
    onError?.(error);
  }

  // Try to load from localStorage (cached data)
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const cachedData = JSON.parse(cached);
      if (cachedData && (Array.isArray(cachedData) ? cachedData.length > 0 : Object.keys(cachedData).length > 0)) {
        console.log(`✅ ${key}: Loaded from localStorage (${Array.isArray(cachedData) ? cachedData.length : 1} items)`);
        onSuccess?.(cachedData, 'cache');
        return { data: cachedData, source: 'cache' };
      }
    }
    console.log(`⚠️ ${key}: localStorage is empty, using initial data...`);
  } catch (error) {
    console.warn(`⚠️ ${key}: localStorage error, using initial data...`, error);
  }

  // Use initial/default data as last resort
  console.log(`✅ ${key}: Using initial/default data (${Array.isArray(initialData) ? initialData.length : 1} items)`);
  onSuccess?.(initialData, 'initial');
  return { data: initialData, source: 'initial' };
}

/**
 * Debug helper to check data loading status
 */
export function logDataStatus(key: string, data: any, source: 'supabase' | 'cache' | 'initial'): void {
  const count = Array.isArray(data) ? data.length : Object.keys(data).length;
  const emoji = source === 'supabase' ? '🌐' : source === 'cache' ? '💾' : '📋';
  console.log(`${emoji} ${key}: ${count} items from ${source}`);
}
