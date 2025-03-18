import { useState } from 'react';
import { 
  BellIcon, 
  MagnifyingGlassIcon, 
  SunIcon, 
  MoonIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const Header = ({ toggleDarkMode, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center justify-between px-6 fixed top-0 right-0 left-0 z-40 ml-64">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search candidates, internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-primary"
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
        
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative text-primary">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        
        <div className="flex items-center">
          <UserCircleIcon className="h-8 w-8 text-primary" />
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {currentUser?.displayName || 'Guest User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentUser?.email || 'Not signed in'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
