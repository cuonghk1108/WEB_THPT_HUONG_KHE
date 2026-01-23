import React, { createContext, useContext, useState, useEffect } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize dark mode on client side
  useEffect(() => {
    // Check localStorage
    const saved = localStorage.getItem('darkMode');
    const initialDarkMode = saved ? saved === 'true' : false;
    
    setIsDarkMode(initialDarkMode);
    updateDarkMode(initialDarkMode);
  }, []);

  const updateDarkMode = (isDark: boolean) => {
    console.log('Updating dark mode to:', isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    
    localStorage.setItem('darkMode', String(isDark));
  };

  const toggleDarkMode = () => {
    const newValue = !isDarkMode;
    console.log('Toggling dark mode:', newValue);
    
    setIsDarkMode(newValue);
    updateDarkMode(newValue);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
};
