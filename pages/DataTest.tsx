import React from 'react';
import { useData } from '../context/DataContext';
import { Check, AlertCircle, Loader } from 'lucide-react';

const DataTest: React.FC = () => {
  const { news, teachers, clubs, gallery, events, studentCorner, achievements, digitalLibrary } = useData();

  const dataStatus = [
    { name: '📰 News', count: news.length, required: 1 },
    { name: '👨‍🏫 Teachers', count: teachers.length, required: 1 },
    { name: '🎭 Clubs', count: clubs.length, required: 1 },
    { name: '🖼️ Gallery', count: gallery.length, required: 1 },
    { name: '📅 Events', count: events.length, required: 1 },
    { name: '📚 Digital Library', count: digitalLibrary.length, required: 1 },
    { name: '🎓 Achievements', count: achievements.length, required: 1 },
  ];

  const allOk = dataStatus.every(d => d.count >= d.required);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            🔍 Data Status Check
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Verify that all data is loading correctly from your data sources
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            {allOk ? (
              <>
                <Check className="w-8 h-8 text-green-500" />
                <div>
                  <h2 className="text-xl font-bold text-green-600">All Data Loaded ✅</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">All required data sources are available</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-8 h-8 text-orange-500" />
                <div>
                  <h2 className="text-xl font-bold text-orange-600">Partial Data</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Some data sources may be using fallback data</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Data Items */}
        <div className="space-y-3">
          {dataStatus.map((item) => (
            <div
              key={item.name}
              className={`p-4 rounded-lg border-2 transition-all ${
                item.count >= item.required
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.name}</span>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    item.count >= item.required
                      ? 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                  }`}>
                    {item.count} items
                  </span>
                </div>
                <div className="text-2xl">
                  {item.count >= item.required ? '✅' : '⚠️'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-3">📝 Troubleshooting Tips</h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li>✅ Check browser console (F12) for any error messages</li>
            <li>✅ Verify Supabase credentials in .env.local</li>
            <li>✅ Make sure dev server was restarted after changing .env files</li>
            <li>✅ Check network tab in DevTools for API calls</li>
            <li>✅ Verify Supabase database has data in tables</li>
          </ul>
        </div>

        {/* Console Info */}
        <div className="mt-8">
          <button
            onClick={() => {
              console.log('📊 Data Status Report:');
              dataStatus.forEach(d => {
                console.log(`${d.name}: ${d.count} items`);
              });
              alert('Check browser console (F12) for detailed logs');
            }}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            📋 Log Data Status to Console
          </button>
        </div>

        {/* Direct Supabase Check */}
        <div className="mt-8">
          <button
            onClick={async () => {
              try {
                const response = await fetch(
                  `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/news?select=*`,
                  {
                    headers: {
                      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
                    }
                  }
                );
                const data = await response.json();
                console.log('📡 Direct Supabase Query Result:', data);
                alert(`Supabase response: ${response.status} - Check console for details`);
              } catch (error) {
                console.error('❌ Supabase Query Error:', error);
                alert('Error querying Supabase - check console');
              }
            }}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            🌐 Test Supabase Connection
          </button>
        </div>

        {/* Environment Check */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs overflow-auto">
          <div className="font-bold mb-2">Environment Variables:</div>
          <div>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '✅' : '❌'}</div>
          <div>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅' : '❌'}</div>
        </div>
      </div>
    </div>
  );
};

export default DataTest;
