import { useState } from 'react';
import { 
  BellIcon, 
  BellSlashIcon, 
  CheckIcon, 
  TrashIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

// Sample notification data
const notificationsData = [
  {
    id: 1,
    title: 'New Application',
    message: 'Alex Johnson has applied for the Web Development internship',
    timestamp: new Date(2025, 2, 18, 9, 30),
    read: false,
    type: 'application'
  },
  {
    id: 2,
    title: 'Submission Received',
    message: 'Emily Rodriguez has submitted her project for the UI/UX Design competition',
    timestamp: new Date(2025, 2, 17, 14, 45),
    read: true,
    type: 'submission'
  },
  {
    id: 3,
    title: 'Internship Ending Soon',
    message: 'The Data Science internship program will end in 7 days',
    timestamp: new Date(2025, 2, 16, 11, 20),
    read: true,
    type: 'reminder'
  }
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    applications: true,
    submissions: true,
    messages: true,
    reminders: true,
    emailNotifications: true,
    pushNotifications: false
  });
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const handleSettingChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  const formatTime = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case 'application':
        return <Badge variant="primary">Application</Badge>;
      case 'submission':
        return <Badge variant="success">Submission</Badge>;
      case 'message':
        return <Badge variant="info">Message</Badge>;
      case 'reminder':
        return <Badge variant="warning">Reminder</Badge>;
      default:
        return <Badge>Notification</Badge>;
    }
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <Badge variant="primary" className="ml-2">{unreadCount} New</Badge>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                icon={CheckIcon}
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark all as read
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                icon={AdjustmentsHorizontalIcon}
                onClick={() => setShowSettings(!showSettings)}
              >
                Settings
              </Button>
            </div>
          </div>
          
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <BellSlashIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Notifications</h4>
              <p className="text-gray-500 dark:text-gray-400">
                You don't have any notifications at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border ${
                    notification.read 
                      ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                      : 'bg-primary-light/10 dark:bg-primary-dark/10 border-primary-light dark:border-primary-dark'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className={`p-2 rounded-full ${
                        notification.read 
                          ? 'bg-gray-100 dark:bg-gray-700' 
                          : 'bg-primary-light dark:bg-primary-dark'
                      }`}>
                        <BellIcon className={`h-5 w-5 ${
                          notification.read 
                            ? 'text-gray-500 dark:text-gray-400' 
                            : 'text-primary dark:text-primary-light'
                        }`} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className={`text-sm font-medium ${
                          notification.read 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-primary dark:text-primary-light'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center ml-4">
                          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                            {formatTime(notification.timestamp)}
                          </span>
                          {getNotificationTypeIcon(notification.type)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      
                      <div className="flex justify-end mt-2 space-x-2">
                        {!notification.read && (
                          <button 
                            className="text-xs text-primary hover:text-primary-dark dark:hover:text-primary-light"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </button>
                        )}
                        <button 
                          className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        {showSettings ? (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h3>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Notification Types</h4>
              
              <div className="flex items-center justify-between">
                <label htmlFor="applications" className="text-sm text-gray-700 dark:text-gray-300">
                  Applications
                </label>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="applications" 
                    className="sr-only" 
                    checked={notificationSettings.applications}
                    onChange={() => handleSettingChange('applications')}
                  />
                  <div className={`w-11 h-6 rounded-full transition ${
                    notificationSettings.applications ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                      notificationSettings.applications ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="submissions" className="text-sm text-gray-700 dark:text-gray-300">
                  Submissions
                </label>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="submissions" 
                    className="sr-only" 
                    checked={notificationSettings.submissions}
                    onChange={() => handleSettingChange('submissions')}
                  />
                  <div className={`w-11 h-6 rounded-full transition ${
                    notificationSettings.submissions ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                      notificationSettings.submissions ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="messages" className="text-sm text-gray-700 dark:text-gray-300">
                  Messages
                </label>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="messages" 
                    className="sr-only" 
                    checked={notificationSettings.messages}
                    onChange={() => handleSettingChange('messages')}
                  />
                  <div className={`w-11 h-6 rounded-full transition ${
                    notificationSettings.messages ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                      notificationSettings.messages ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="reminders" className="text-sm text-gray-700 dark:text-gray-300">
                  Reminders
                </label>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="reminders" 
                    className="sr-only" 
                    checked={notificationSettings.reminders}
                    onChange={() => handleSettingChange('reminders')}
                  />
                  <div className={`w-11 h-6 rounded-full transition ${
                    notificationSettings.reminders ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                      notificationSettings.reminders ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mt-6 mb-2">Delivery Methods</h4>
              
              <div className="flex items-center justify-between">
                <label htmlFor="emailNotifications" className="text-sm text-gray-700 dark:text-gray-300">
                  Email Notifications
                </label>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="emailNotifications" 
                    className="sr-only" 
                    checked={notificationSettings.emailNotifications}
                    onChange={() => handleSettingChange('emailNotifications')}
                  />
                  <div className={`w-11 h-6 rounded-full transition ${
                    notificationSettings.emailNotifications ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                      notificationSettings.emailNotifications ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="pushNotifications" className="text-sm text-gray-700 dark:text-gray-300">
                  Push Notifications
                </label>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="pushNotifications" 
                    className="sr-only" 
                    checked={notificationSettings.pushNotifications}
                    onChange={() => handleSettingChange('pushNotifications')}
                  />
                  <div className={`w-11 h-6 rounded-full transition ${
                    notificationSettings.pushNotifications ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                      notificationSettings.pushNotifications ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="primary" className="w-full">
                  Save Settings
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Summary</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <BellIcon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Unread Notifications</span>
                </div>
                <Badge variant="primary">{unreadCount}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Read Notifications</span>
                </div>
                <Badge variant="success">{notifications.length - unreadCount}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <ClockIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Last 7 Days</span>
                </div>
                <Badge variant="info">{notifications.length}</Badge>
              </div>
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  icon={AdjustmentsHorizontalIcon}
                  onClick={() => setShowSettings(true)}
                >
                  Notification Settings
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
