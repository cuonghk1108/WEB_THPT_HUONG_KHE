import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const DarkModeTest: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  console.log('DarkModeTest Component - isDarkMode:', isDarkMode);
  console.log('HTML class:', document.documentElement.className);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Dark Mode Test</h1>
      
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        Current Mode: <strong>{isDarkMode ? '🌙 Dark' : '☀️ Light'}</strong>
      </p>

      <button 
        onClick={() => {
          console.log('Button clicked! Current mode:', isDarkMode);
          toggleDarkMode();
        }}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
          color: isDarkMode ? '#f1f5f9' : '#111827',
          border: '2px solid #0284c7',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Toggle Dark Mode
      </button>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9', borderRadius: '8px' }}>
        <p>HTML class: <code>{document.documentElement.className}</code></p>
        <p>isDarkMode state: <code>{String(isDarkMode)}</code></p>
        <p>localStorage darkMode: <code>{localStorage.getItem('darkMode')}</code></p>
      </div>
    </div>
  );
};

export default DarkModeTest;
