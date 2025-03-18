import { useState } from 'react';
import { 
  PaperAirplaneIcon, 
  ChartBarIcon, 
  StarIcon,
  ChatBubbleLeftRightIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  ArrowDownTrayIcon,
  PencilIcon,
  ArrowLeftIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

// Sample feedback data
const feedbackData = [
  {
    id: 1,
    type: 'internship',
    name: 'Web Development Internship',
    rating: 4.5,
    responses: 24,
    sentiment: 'positive',
    categories: {
      'Content Quality': 4.7,
      'Mentor Support': 4.2,
      'Learning Experience': 4.6,
      'Career Impact': 4.5
    },
    comments: [
      {
        id: 1,
        text: 'Great experience! I learned a lot about modern web development practices.',
        rating: 5,
        date: new Date(2025, 2, 10)
      },
      {
        id: 2,
        text: 'The mentors were very helpful, but I wish there was more time for one-on-one sessions.',
        rating: 4,
        date: new Date(2025, 2, 8)
      }
    ]
  },
  {
    id: 2,
    type: 'competition',
    name: 'UI/UX Design Challenge',
    rating: 4.2,
    responses: 18,
    sentiment: 'positive',
    categories: {
      'Challenge Difficulty': 4.0,
      'Instructions Clarity': 4.3,
      'Judging Fairness': 4.1,
      'Overall Experience': 4.4
    },
    comments: [
      {
        id: 1,
        text: 'The competition was well-organized and the feedback from judges was very constructive.',
        rating: 5,
        date: new Date(2025, 2, 15)
      }
    ]
  }
];

const FeedbackSystem = () => {
  const [feedback, setFeedback] = useState(feedbackData);
  const [activeTab, setActiveTab] = useState('collection');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  
  const calculateAverageRating = (feedbackItem) => {
    return Object.values(feedbackItem.categories).reduce((sum, rating) => sum + rating, 0) / Object.keys(feedbackItem.categories).length;
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <StarIcon className="h-5 w-5 text-gray-300 fill-current" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="h-5 w-5 text-gray-300 fill-current" />
        ))}
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                className={`inline-flex items-center py-4 px-4 text-sm font-medium text-center border-b-2 ${
                  activeTab === 'collection'
                    ? 'text-primary border-primary'
                    : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('collection')}
              >
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Feedback Collection
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-flex items-center py-4 px-4 text-sm font-medium text-center border-b-2 ${
                  activeTab === 'analysis'
                    ? 'text-primary border-primary'
                    : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('analysis')}
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Feedback Analysis
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {activeTab === 'collection' ? (
        <div>
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Feedback Form</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="formType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Form Type
                </label>
                <select
                  id="formType"
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="internship">Internship Feedback</option>
                  <option value="competition">Competition Feedback</option>
                  <option value="mentor">Mentor Feedback</option>
                  <option value="general">General Feedback</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="formName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Form Name
                </label>
                <input
                  type="text"
                  id="formName"
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., Web Development Internship Feedback"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Questions
                </label>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Overall Experience</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Rate your overall experience</p>
                    </div>
                    <Badge variant="primary">Rating</Badge>
                  </div>
                  
                  <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Content Quality</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Rate the quality of the content provided</p>
                    </div>
                    <Badge variant="primary">Rating</Badge>
                  </div>
                  
                  <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Mentor Support</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Rate the support provided by mentors</p>
                    </div>
                    <Badge variant="primary">Rating</Badge>
                  </div>
                  
                  <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Comments</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Any additional comments or suggestions</p>
                    </div>
                    <Badge variant="info">Text</Badge>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    icon={PlusIcon}
                  >
                    Add Question
                  </Button>
                </div>
              </div>
              
              <div>
                <label htmlFor="audience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Audience
                </label>
                <select
                  id="audience"
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">All Participants</option>
                  <option value="completed">Completed Participants</option>
                  <option value="active">Active Participants</option>
                  <option value="custom">Custom Group</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="secondary"
                >
                  Save as Draft
                </Button>
                <Button
                  variant="primary"
                >
                  Create & Send
                </Button>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Feedback Forms</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Type</th>
                    <th scope="col" className="px-6 py-3">Responses</th>
                    <th scope="col" className="px-6 py-3">Avg. Rating</th>
                    <th scope="col" className="px-6 py-3">Sentiment</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.map((item) => (
                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {item.name}
                      </th>
                      <td className="px-6 py-4 capitalize">{item.type}</td>
                      <td className="px-6 py-4">{item.responses}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {item.rating.toFixed(1)}
                          <div className="ml-2">
                            {renderStars(item.rating)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.sentiment === 'positive' ? (
                          <Badge variant="success" className="flex items-center">
                            <FaceSmileIcon className="h-4 w-4 mr-1" />
                            Positive
                          </Badge>
                        ) : item.sentiment === 'neutral' ? (
                          <Badge variant="info">Neutral</Badge>
                        ) : (
                          <Badge variant="danger" className="flex items-center">
                            <FaceFrownIcon className="h-4 w-4 mr-1" />
                            Negative
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button 
                            className="text-gray-500 hover:text-primary"
                            onClick={() => {
                              setSelectedFeedback(item);
                              setActiveTab('analysis');
                            }}
                          >
                            <ChartBarIcon className="h-5 w-5" />
                          </button>
                          <button className="text-gray-500 hover:text-primary">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button className="text-gray-500 hover:text-primary">
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : (
        <div>
          {selectedFeedback ? (
            <div>
              <div className="flex items-center mb-6">
                <Button 
                  variant="ghost" 
                  icon={ArrowLeftIcon}
                  onClick={() => setSelectedFeedback(null)}
                  className="mr-4"
                >
                  Back
                </Button>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedFeedback.name} - Feedback Analysis
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="flex items-center p-6">
                  <div className="rounded-full bg-primary-light p-3 mr-4">
                    <StarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedFeedback.rating.toFixed(1)}/5</h3>
                  </div>
                </Card>
                
                <Card className="flex items-center p-6">
                  <div className="rounded-full bg-green-100 p-3 mr-4">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Responses</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedFeedback.responses}</h3>
                  </div>
                </Card>
                
                <Card className="flex items-center p-6">
                  <div className="rounded-full bg-amber-100 p-3 mr-4">
                    {selectedFeedback.sentiment === 'positive' ? (
                      <FaceSmileIcon className="h-6 w-6 text-amber-600" />
                    ) : (
                      <FaceFrownIcon className="h-6 w-6 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sentiment</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{selectedFeedback.sentiment}</h3>
                  </div>
                </Card>
                
                <Card className="flex items-center p-6">
                  <div className="rounded-full bg-purple-100 p-3 mr-4">
                    <ChartBarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">92%</h3>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="lg:col-span-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Category Ratings</h4>
                  
                  <div className="space-y-4">
                    {Object.entries(selectedFeedback.categories).map(([category, rating]) => (
                      <div key={category}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{rating.toFixed(1)}</span>
                            {renderStars(rating)}
                          </div>
                        </div>
                        <ProgressBar 
                          value={(rating / 5) * 100} 
                          variant={rating >= 4.5 ? "success" : rating >= 4 ? "primary" : rating >= 3 ? "info" : "warning"} 
                        />
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Rating Distribution</h4>
                  
                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star}>
                        <div className="flex items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">{star}</span>
                          <StarIcon className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {star === 5 ? '45%' : star === 4 ? '30%' : star === 3 ? '15%' : star === 2 ? '7%' : '3%'}
                          </span>
                        </div>
                        <ProgressBar 
                          value={star === 5 ? 45 : star === 4 ? 30 : star === 3 ? 15 : star === 2 ? 7 : 3} 
                          variant={star >= 4 ? "success" : star >= 3 ? "info" : "warning"} 
                          size="sm"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              <Card>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Comments</h4>
                
                {selectedFeedback.comments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
                ) : (
                  <div className="space-y-4">
                    {selectedFeedback.comments.map((comment) => (
                      <div key={comment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            {renderStars(comment.rating)}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(comment.date)}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Feedback Overview</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Overall Satisfaction</h4>
                      <div className="flex items-center mb-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white mr-2">4.4</span>
                        <div>
                          {renderStars(4.4)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Based on {feedback.reduce((sum, item) => sum + item.responses, 0)} responses
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sentiment Analysis</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-700 dark:text-gray-300">Positive</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300">78%</span>
                          </div>
                          <ProgressBar value={78} variant="success" size="sm" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-700 dark:text-gray-300">Neutral</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300">15%</span>
                          </div>
                          <ProgressBar value={15} variant="info" size="sm" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-700 dark:text-gray-300">Negative</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300">7%</span>
                          </div>
                          <ProgressBar value={7} variant="danger" size="sm" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button 
                        variant="primary" 
                        className="w-full"
                        icon={ArrowDownTrayIcon}
                      >
                        Export All Data
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Feedback by Program</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">Name</th>
                          <th scope="col" className="px-6 py-3">Type</th>
                          <th scope="col" className="px-6 py-3">Responses</th>
                          <th scope="col" className="px-6 py-3">Rating</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedback.map((item) => (
                          <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              {item.name}
                            </th>
                            <td className="px-6 py-4 capitalize">{item.type}</td>
                            <td className="px-6 py-4">{item.responses}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {item.rating.toFixed(1)}
                                <div className="ml-2">
                                  {renderStars(item.rating)}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedFeedback(item)}
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackSystem;
