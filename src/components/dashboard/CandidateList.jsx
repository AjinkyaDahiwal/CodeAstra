import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const CandidateList = ({ candidates = [] }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (candidates.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 dark:text-gray-400">No candidates found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {candidates.map((candidate) => (
          <li key={candidate.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary font-medium">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {candidate.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {candidate.position}
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                    {candidate.rating}
                  </span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(candidate.status)}`}>
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <Link 
                to={`/candidates/${candidate.id}`}
                className="text-xs text-primary hover:text-primary-dark font-medium"
              >
                View Profile
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <Link 
          to="/candidates"
          className="text-sm text-primary hover:text-primary-dark font-medium"
        >
          View All Candidates
        </Link>
      </div>
    </div>
  );
};

export default CandidateList;
