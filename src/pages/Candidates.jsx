import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getApplicationsForCompanyInternships, updateApplicationStatus } from '../services/firestore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

const Candidates = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'
  
  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) {
        setLoading(false);
        setError('You must be logged in to view applications');
        return;
      }
      
      try {
        setLoading(true);
        // Get applications for internships posted by this company
        const applicationsData = await getApplicationsForCompanyInternships(currentUser.uid);
        setApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to load applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [currentUser]);
  
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      
      // Update local state
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };
  
  const filteredApplications = applications.filter(application => {
    // Filter by search query
    const matchesSearch = 
      application.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.internshipTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning" className="flex items-center"><ClockIcon className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'accepted':
        return <Badge variant="success" className="flex items-center"><CheckCircleIcon className="h-3 w-3 mr-1" />Accepted</Badge>;
      case 'rejected':
        return <Badge variant="danger" className="flex items-center"><XCircleIcon className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'interview':
        return <Badge variant="info" className="flex items-center">Interview</Badge>;
      default:
        return <Badge>{status || 'Pending'}</Badge>;
    }
  };
  
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-800/30 rounded-full flex items-center justify-center mb-4">
          <XCircleIcon className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{error}</p>
      </Card>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Applications for Your Internships</h1>
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search candidates by name, internship, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="interview">Interview</option>
            </select>
            
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden dark:border-gray-600">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
                onClick={() => setViewMode('grid')}
              >
                <Squares2X2Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
                onClick={() => setViewMode('list')}
              >
                <ViewColumnsIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </Card>
      
      {filteredApplications.length === 0 ? (
        <Card className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <DocumentTextIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Applications Found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery || statusFilter !== 'all' 
              ? "No applications match your current filters. Try adjusting your search criteria."
              : "There are no applications for your internships yet."}
          </p>
        </Card>
      ) : (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {filteredApplications.map((application) => (
            <Card key={application.id} className="relative">
              <div className="absolute top-4 right-4">
                {getStatusBadge(application.status)}
              </div>
              
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 mr-4">
                  <span className="text-xl font-bold">
                    {application.applicantName?.split(' ').map(n => n?.[0] || '').join('') || '?'}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{application.applicantName || 'Unknown Applicant'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{application.applicantEmail || 'No email provided'}</p>
                  <p className="text-sm text-primary dark:text-primary-light">{application.internshipTitle || 'Unknown Internship'}</p>
                </div>
              </div>
              
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Applied on:</span>
                  <span className="text-gray-900 dark:text-white">{formatDate(application.appliedAt)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Company:</span>
                  <span className="text-gray-900 dark:text-white">{application.company || 'Your Company'}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Expected Stipend:</span>
                  <span className="text-gray-900 dark:text-white">${application.expectedStipend || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Availability:</span>
                  <span className="text-gray-900 dark:text-white">{application.availability || 'Not specified'}</span>
                </div>
              </div>
              
              {application.coverLetter && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Letter</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-md max-h-20 overflow-y-auto">
                    {application.coverLetter}
                  </p>
                </div>
              )}
              
              {application.resumeLink && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <a 
                    href={application.resumeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-primary hover:text-primary-dark dark:hover:text-primary-light"
                  >
                    <DocumentTextIcon className="h-4 w-4 mr-1" />
                    View Resume
                  </a>
                </div>
              )}
              
              <div className="flex space-x-2">
                {(!application.status || application.status === 'pending') && (
                  <>
                    <Button 
                      variant="success" 
                      size="sm" 
                      className="flex-1"
                      icon={CheckCircleIcon}
                      onClick={() => handleStatusChange(application.id, 'accepted')}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="flex-1"
                      icon={XCircleIcon}
                      onClick={() => handleStatusChange(application.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {application.status === 'accepted' && (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    icon={EnvelopeIcon}
                  >
                    Contact
                  </Button>
                )}
                {application.status === 'rejected' && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="flex-1"
                    icon={CheckCircleIcon}
                    onClick={() => handleStatusChange(application.id, 'accepted')}
                  >
                    Reconsider
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  icon={EyeIcon}
                >
                  Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Candidates;
