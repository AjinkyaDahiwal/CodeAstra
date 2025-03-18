import { useState } from 'react';
import { 
  PaperAirplaneIcon, 
  MagnifyingGlassIcon, 
  PlusIcon,
  UserIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

// Sample message templates
const messageTemplates = [
  {
    id: 1,
    title: 'Interview Invitation',
    content: 'Dear [Candidate Name], We are pleased to invite you to an interview for the [Position] position. The interview is scheduled for [Date] at [Time]. Please confirm your availability. Looking forward to meeting you!'
  },
  {
    id: 2,
    title: 'Application Confirmation',
    content: 'Dear [Candidate Name], Thank you for applying to the [Position] position. We have received your application and will review it shortly. We will contact you if your qualifications match our requirements.'
  },
  {
    id: 3,
    title: 'Internship Offer',
    content: 'Dear [Candidate Name], We are delighted to offer you the [Position] internship position at our company. The internship will start on [Start Date] and end on [End Date]. Please confirm your acceptance by [Response Date].'
  }
];

// Sample conversations
const sampleConversations = [
  {
    id: 1,
    recipient: 'Alex Johnson',
    recipientPhoto: null,
    lastMessage: 'Thank you for the opportunity! I am available for the interview.',
    timestamp: new Date(2025, 2, 17, 14, 30),
    unread: true
  },
  {
    id: 2,
    recipient: 'Emily Rodriguez',
    recipientPhoto: null,
    lastMessage: 'I have submitted my project for the Web Development challenge.',
    timestamp: new Date(2025, 2, 16, 9, 15),
    unread: false
  }
];

const MessageCenter = () => {
  const [conversations] = useState(sampleConversations);
  const [templates] = useState(messageTemplates);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;
    
    // In a real app, we would send the message to the backend here
    console.log('Sending message to', selectedConversation.recipient, ':', messageText);
    
    // Clear the message input
    setMessageText('');
  };
  
  const handleTemplateSelect = (template) => {
    setMessageText(template.content);
    setShowTemplates(false);
  };
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formatDate = (date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="h-full">
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Conversations</h3>
            <Button 
              variant="primary" 
              size="sm" 
              icon={PlusIcon}
            >
              New
            </Button>
          </div>
          
          <div className="space-y-2">
            {conversations.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No conversations yet.</p>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-primary-light dark:bg-primary-dark'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                        {conversation.recipientPhoto ? (
                          <img
                            src={conversation.recipientPhoto}
                            alt={conversation.recipient}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-bold">
                            {conversation.recipient.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      {conversation.unread && (
                        <span className="absolute top-0 right-2 h-3 w-3 bg-primary rounded-full"></span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {conversation.recipient}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                  {selectedConversation.recipientPhoto ? (
                    <img
                      src={selectedConversation.recipientPhoto}
                      alt={selectedConversation.recipient}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold">
                      {selectedConversation.recipient.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedConversation.recipient}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    Last active: {formatTime(selectedConversation.timestamp)}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {/* Sample messages - in a real app, these would be loaded from the database */}
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs md:max-w-md">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        Hello! I'm interested in the Web Development internship position.
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                        {formatTime(new Date(2025, 2, 17, 10, 15))}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-primary text-white rounded-lg p-3 max-w-xs md:max-w-md">
                      <p className="text-sm">
                        Hi there! Thank you for your interest. Your application has been received and is currently under review.
                      </p>
                      <span className="text-xs text-primary-light block mt-1">
                        {formatTime(new Date(2025, 2, 17, 11, 30))}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs md:max-w-md">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {selectedConversation.lastMessage}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                        {formatTime(selectedConversation.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <textarea
                    className="block w-full p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    placeholder="Type your message..."
                    rows="3"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  ></textarea>
                  
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      onClick={() => setShowTemplates(!showTemplates)}
                    >
                      <span className="sr-only">Use template</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <span className="sr-only">Attach file</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center p-2 text-primary rounded-full cursor-pointer hover:bg-primary-light dark:hover:bg-primary-dark"
                      onClick={handleSendMessage}
                    >
                      <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
                      <span className="sr-only">Send message</span>
                    </button>
                  </div>
                  
                  {showTemplates && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Message Templates</h4>
                      </div>
                      <ul className="max-h-60 overflow-y-auto">
                        {templates.map((template) => (
                          <li key={template.id}>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => handleTemplateSelect(template)}
                            >
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{template.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{template.content}</p>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Conversation Selected</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Select a conversation from the list or start a new one.
              </p>
              <Button 
                variant="primary" 
                icon={PlusIcon}
              >
                New Conversation
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessageCenter;
