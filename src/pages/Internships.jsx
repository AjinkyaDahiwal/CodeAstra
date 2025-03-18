import { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  ClockIcon, 
  UserGroupIcon, 
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import InternshipForm from '../components/internships/InternshipForm';
import { format, differenceInDays } from 'date-fns';
import { getAllInternships, deleteInternship } from '../services/firestore';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  
  // Fetch internships from Firestore
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const internshipsData = await getAllInternships();
        setInternships(internshipsData);
      } catch (err) {
        console.error('Error fetching internships:', err);
        setError('Failed to load internships. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInternships();
  }, []);
  
  const handleDeleteInternship = async (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await deleteInternship(id);
        setInternships(internships.filter(internship => internship.id !== id));
      } catch (err) {
        console.error('Error deleting internship:', err);
        alert('Failed to delete internship. Please try again.');
      }
    }
  };
  
  const handleInternshipAdded = () => {
    // Refresh the internships list
    setShowForm(false);
    // Fetch internships again
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const internshipsData = await getAllInternships();
        setInternships(internshipsData);
      } catch (err) {
        console.error('Error fetching internships:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInternships();
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'draft':
        return <Badge variant="warning">Draft</Badge>;
      case 'closed':
        return <Badge variant="default">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getRemainingDays = (deadline) => {
    if (!deadline) return null;
    
    const today = new Date();
    const days = differenceInDays(deadline, today);
    
    if (days < 0) return 0;
    return days;
  };
  
  const activeInternships = internships.filter(i => i.status === 'active');
  const totalApplications = internships.reduce((sum, i) => sum + (i.applications || 0), 0);
  const avgApplications = internships.length > 0 ? Math.round(totalApplications / internships.length) : 0;
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Internship Management</h1>
        <Button 
          variant="primary" 
          icon={showForm ? XMarkIcon : PlusIcon}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Internship'}
        </Button>
      </div>
      
      {showForm ? (
        <div className="mb-8">
          <InternshipForm 
            onSuccess={handleInternshipAdded} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Internships</h3>
                <span className="text-2xl font-bold text-primary">{activeInternships.length}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Currently active internship programs</p>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Applications</h3>
                <span className="text-2xl font-bold text-primary">{totalApplications}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Applications across all internships</p>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avg. Applications</h3>
                <span className="text-2xl font-bold text-primary">{avgApplications}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Average applications per internship</p>
            </Card>
          </div>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Internships</h3>
            
            {loading ? (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">Loading internships...</p>
              </div>
            ) : error ? (
              <div className="text-center py-6">
                <p className="text-red-500">{error}</p>
              </div>
            ) : internships.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">No internships found. Create your first internship!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Title</th>
                      <th scope="col" className="px-6 py-3">Company</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Type</th>
                      <th scope="col" className="px-6 py-3">Deadline</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internships.map((internship) => (
                      <tr key={internship.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {internship.title}
                        </th>
                        <td className="px-6 py-4">{internship.company}</td>
                        <td className="px-6 py-4">{getStatusBadge(internship.status)}</td>
                        <td className="px-6 py-4">
                          <span className="capitalize">{internship.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          {internship.applicationDeadline ? (
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {getRemainingDays(internship.applicationDeadline) > 0 
                                ? `${getRemainingDays(internship.applicationDeadline)} days` 
                                : 'Closed'}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-primary">
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button className="text-gray-500 hover:text-primary">
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button className="text-gray-500 hover:text-primary">
                              <DocumentDuplicateIcon className="h-5 w-5" />
                            </button>
                            {/* Only show delete button if user is the creator */}
                            {currentUser && internship.postedBy === currentUser.uid && (
                              <button 
                                className="text-gray-500 hover:text-red-500"
                                onClick={() => handleDeleteInternship(internship.id)}
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            )}
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

export default Internships;
