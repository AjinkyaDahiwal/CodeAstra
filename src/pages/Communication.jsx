import { useState } from 'react';
import { 
  PaperAirplaneIcon, 
  BellIcon, 
  MegaphoneIcon, 
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserGroupIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import MessageCenter from '../components/communication/MessageCenter';
import NotificationCenter from '../components/communication/NotificationCenter';
import AnnouncementSystem from '../components/communication/AnnouncementSystem';
import FeedbackSystem from '../components/communication/FeedbackSystem';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('messages');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'messages':
        return <MessageCenter />;
      case 'notifications':
        return <NotificationCenter />;
      case 'announcements':
        return <AnnouncementSystem />;
      case 'feedback':
        return <FeedbackSystem />;
      default:
        return <MessageCenter />;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communication Centre</h1>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                className={`inline-flex items-center py-4 px-4 text-sm font-medium text-center border-b-2 ${
                  activeTab === 'messages'
                    ? 'text-primary border-primary'
                    : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Messages
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-flex items-center py-4 px-4 text-sm font-medium text-center border-b-2 ${
                  activeTab === 'notifications'
                    ? 'text-primary border-primary'
                    : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <BellIcon className="h-5 w-5 mr-2" />
                Notifications
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-flex items-center py-4 px-4 text-sm font-medium text-center border-b-2 ${
                  activeTab === 'announcements'
                    ? 'text-primary border-primary'
                    : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('announcements')}
              >
                <MegaphoneIcon className="h-5 w-5 mr-2" />
                Announcements
              </button>
            </li>
            <li>
              <button
                className={`inline-flex items-center py-4 px-4 text-sm font-medium text-center border-b-2 ${
                  activeTab === 'feedback'
                    ? 'text-primary border-primary'
                    : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('feedback')}
              >
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Feedback
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {renderTabContent()}
    </div>
  );
};

export default Communication;
