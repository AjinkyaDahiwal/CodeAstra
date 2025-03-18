import { useState } from 'react';
import { 
  PlusIcon, 
  XMarkIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import CompetitionForm from '../components/competitions/CompetitionForm';
import SubmissionReview from '../components/competitions/SubmissionReview';

// Sample competition data
const competitionsData = [
  {
    id: 1,
    title: 'Web Development Challenge',
    description: 'Create a responsive web application using React and Firebase',
    startDate: new Date(2025, 2, 1),
    endDate: new Date(2025, 3, 15),
    participants: 24,
    submissions: 18,
    status: 'active',
    prize: '$1000',
    skills: ['React', 'Firebase', 'JavaScript']
  }
];

const Competitions = () => {
  const { currentUser } = useAuth();
  const [competitions] = useState(competitionsData);
  const [showForm, setShowForm] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  
  const handleCompetitionAdded = () => {
    setShowForm(false);
    // In a real app, we would fetch the updated competitions list here
  };
  
  const handleReviewSubmissions = (competition) => {
    setSelectedCompetition(competition);
    setShowReview(true);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'upcoming':
        return <Badge variant="primary">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days remaining`;
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Competition Management</h1>
        <Button 
          variant="primary" 
          icon={showForm ? XMarkIcon : PlusIcon}
          onClick={() => {
            setShowForm(!showForm);
            setShowReview(false);
          }}
        >
          {showForm ? 'Cancel' : 'Create Competition'}
        </Button>
      </div>
      
      {showForm ? (
        <div className="mb-8">
          <CompetitionForm 
            onSuccess={handleCompetitionAdded} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      ) : showReview ? (
        <div className="mb-8">
          <SubmissionReview 
            competition={selectedCompetition}
            onBack={() => setShowReview(false)}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Competitions</h3>
                <span className="text-2xl font-bold text-primary">
                  {competitions.filter(c => c.status === 'active').length}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Currently running competitions</p>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Participants</h3>
                <span className="text-2xl font-bold text-primary">
                  {competitions.reduce((sum, c) => sum + c.participants, 0)}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Participants across all competitions</p>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Submission Rate</h3>
                <span className="text-2xl font-bold text-primary">
                  {competitions.reduce((sum, c) => sum + c.submissions, 0)} / {competitions.reduce((sum, c) => sum + c.participants, 0)}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Total submissions vs participants</p>
            </Card>
          </div>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Competitions</h3>
            
            {competitions.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">No competitions found. Create your first competition!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Title</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Participants</th>
                      <th scope="col" className="px-6 py-3">Submissions</th>
                      <th scope="col" className="px-6 py-3">Timeline</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitions.map((competition) => (
                      <tr key={competition.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {competition.title}
                        </th>
                        <td className="px-6 py-4">{getStatusBadge(competition.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <UserGroupIcon className="h-4 w-4 mr-1" />
                            {competition.participants}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            {competition.submissions} / {competition.participants}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {getTimeRemaining(competition.endDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button 
                              className="text-gray-500 hover:text-primary"
                              onClick={() => handleReviewSubmissions(competition)}
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button className="text-gray-500 hover:text-primary">
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button className="text-gray-500 hover:text-primary">
                              <ChartBarIcon className="h-5 w-5" />
                            </button>
                            <button className="text-gray-500 hover:text-red-500">
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default Competitions;
