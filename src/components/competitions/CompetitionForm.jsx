import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const CompetitionForm = ({ onSuccess, onCancel }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    prize: '',
    maxParticipants: 50,
    eligibility: '',
    rules: '',
    judging: '',
    skills: []
  });

  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('You must be logged in to create a competition');
      return;
    }

    // Basic validation
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (startDate >= endDate) {
      setError('End date must be after start date');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // In a real app, we would add the competition to Firestore here
      // For now, we'll just simulate a successful creation
      setTimeout(() => {
        setSuccess(true);
        setFormData({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          prize: '',
          maxParticipants: 50,
          eligibility: '',
          rules: '',
          judging: '',
          skills: []
        });
        
        if (onSuccess) {
          onSuccess();
        }
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error creating competition:', err);
      setError('Failed to create competition. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Create a New Competition</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p>Competition created successfully!</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Competition Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Prize */}
          <div>
            <label htmlFor="prize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Prize
            </label>
            <input
              type="text"
              id="prize"
              name="prize"
              value={formData.prize}
              onChange={handleChange}
              placeholder="e.g., $1000, Internship opportunity"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Max Participants */}
          <div>
            <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Maximum Participants
            </label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              min="1"
              value={formData.maxParticipants}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Skills */}
          <div className="col-span-2">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Required Skills
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="skills"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skills"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSkillAdd();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleSkillAdd}
                className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add
              </button>
            </div>
            
            {formData.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-light text-primary"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
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
          
          {/* Description */}
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          
          {/* Eligibility */}
          <div className="col-span-2">
            <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Eligibility
            </label>
            <textarea
              id="eligibility"
              name="eligibility"
              rows="3"
              value={formData.eligibility}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          
          {/* Rules */}
          <div className="col-span-2">
            <label htmlFor="rules" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rules
            </label>
            <textarea
              id="rules"
              name="rules"
              rows="3"
              value={formData.rules}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          
          {/* Judging Criteria */}
          <div className="col-span-2">
            <label htmlFor="judging" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Judging Criteria
            </label>
            <textarea
              id="judging"
              name="judging"
              rows="3"
              value={formData.judging}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Competition'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompetitionForm;
