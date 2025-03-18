import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  BriefcaseIcon, 
  ChartBarIcon, 
  CogIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Candidate Management', href: '/candidates', icon: UserGroupIcon },
  { name: 'Internship Management', href: '/internships', icon: BriefcaseIcon },
  { name: 'Competition Management', href: '/competitions', icon: TrophyIcon },
  { name: 'Analytics & Reports', href: '/analytics', icon: ChartBarIcon },
  { name: 'Communication Center', href: '/communication', icon: ChatBubbleLeftRightIcon },
  // Settings item removed from here
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, signInWithGoogle } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (currentUser) return; // Already signed in
    
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white shadow-md text-gray-800 h-screen flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} fixed left-0 top-0 z-50`}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-primary">Internship Portal</h1>
        )}
        <button 
          onClick={toggleSidebar} 
          className={`p-2 rounded-md hover:bg-gray-100 text-primary ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <Bars3Icon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
        </button>
      </div>
      
      {/* User Profile Section */}
      <div className="flex-shrink-0">
        {!currentUser ? (
          <div className="p-4 border-b border-gray-200">
            {!collapsed && (
              <div className="mb-2 text-gray-700">
                <p className="text-sm">Sign in to access all features</p>
              </div>
            )}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={`flex items-center w-full p-3 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {/* Google Icon */}
              <svg className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} viewBox="0 0 24 24">
                <path
                  d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.139-2.701-6.735-2.701-5.522 0-10.001 4.478-10.001 10s4.479 10 10.001 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.081z"
                  fill="#FFFFFF"
                />
              </svg>
              {!collapsed && <span>Sign in with Google</span>}
            </button>
          </div>
        ) : (
          <div className="p-4 border-b border-gray-200">
            {!collapsed && (
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-900">{currentUser.displayName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Navigation - Now with scrolling */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-primary-light/10 hover:text-primary'
                  }`}
                >
                  <item.icon className={`h-6 w-6 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer - Now properly positioned */}
      {currentUser && (
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`flex items-center w-full p-3 rounded-md text-gray-700 hover:bg-primary-light/10 hover:text-primary transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <ArrowLeftOnRectangleIcon className={`h-6 w-6 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
            {!collapsed && <span>{loading ? 'Signing out...' : 'Logout'}</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
