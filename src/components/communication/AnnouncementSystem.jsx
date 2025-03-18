import { useState } from 'react';
import { 
  MegaphoneIcon, 
  PlusIcon, 
  XMarkIcon,
  UserGroupIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

// Sample announcements data
const announcementsData = [
  {
    id: 1,
    title: 'New Web Development Competition',
    content: 'We are excited to announce a new web development competition starting next week. The theme is "Responsive Dashboards" and the top three winners will receive prizes.',
    audience: ['All Candidates', 'Web Development'],
    date: new Date(2025, 2, 15),
    status: 'active',
    author: 'Admin'
  },
  {
    id: 2,
    title: 'System Maintenance',
    content: 'The portal will be undergoing maintenance on Saturday, March 22nd from 2:00 AM to 5:00 AM EST. During this time, the system may be unavailable.',
    audience: ['All Users'],
    date: new Date(2025, 2, 10),
    status: 'active',
    author: 'Admin'
  }
];

const AnnouncementSystem = () => {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    audience: [],
    status: 'draft'
  });
  const [audienceInput, setAudienceInput] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAudienceAdd = () => {
    if (audienceInput.trim() && !formData.audience.includes(audienceInput.trim())) {
      setFormData(prev => ({
        ...prev,
        audience: [...prev.audience, audienceInput.trim()]
      }));
      setAudienceInput('');
    }
  };
  
  const handleAudienceRemove = (audience) => {
    setFormData(prev => ({
      ...prev,
      audience: prev.audience.filter(a => a !== audience)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.content || formData.audience.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, we would save the announcement to Firestore here
    const newAnnouncement = {
      id: announcements.length + 1,
      ...formData,
      date: new Date(),
      author: 'Admin'
    };
    
    setAnnouncements([newAnnouncement, ...announcements]);
    setShowForm(false);
    setFormData({
      title: '',
      content: '',
      audience: [],
      status: 'draft'
    });
  };
  
  const deleteAnnouncement = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    }
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Announcements</h3>
        <Button 
          variant="primary" 
          icon={showForm ? XMarkIcon : PlusIcon}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Announcement'}
        </Button>
      </div>
      
      {showForm && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Announcement</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows="4"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Audience <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={audienceInput}
                    onChange={(e) => setAudienceInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g., All Candidates, Web Development, etc."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAudienceAdd();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAudienceAdd}
                  >
                    Add
                  </Button>
                </div>
                
                {formData.audience.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.audience.map((audience, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-light text-primary"
                      >
                        {audience}
                        <button
                          type="button"
                          onClick={() => handleAudienceRemove(audience)}
                          className="ml-2 inline-flex text-primary-dark hover:text-primary focus:outline-none"
                        >
                          <span className="sr-only">Remove</span>
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                >
                  Publish Announcement
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}
      
      {announcements.length === 0 ? (
        <Card className="text-center py-8">
          <MegaphoneIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Announcements</h4>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            There are no announcements at the moment.
          </p>
          <Button 
            variant="primary" 
            icon={PlusIcon}
            onClick={() => setShowForm(true)}
          >
            Create Announcement
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <MegaphoneIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-primary">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => deleteAnnouncement(announcement.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {announcement.content}
              </p>
              
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{formatDate(announcement.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    <span>{announcement.audience.join(', ')}</span>
                  </div>
                </div>
                
                <Badge 
                  variant={
                    announcement.status === 'active' 
                      ? 'success' 
                      : announcement.status === 'scheduled' 
                        ? 'warning' 
                        : 'default'
                  }
                >
                  {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementSystem;
