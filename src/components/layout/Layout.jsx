import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  // Initialize theme on component mount
  useEffect(() => {
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Sidebar />
      <div className="ml-64 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <main className="pt-20 pb-6 px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
