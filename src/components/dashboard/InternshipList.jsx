import { BriefcaseIcon, MapPinIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const InternshipList = ({ internships = [] }) => {
  if (internships.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 dark:text-gray-400">No active internships found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {internships.map((internship) => (
          <li key={internship.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-light/10 flex items-center justify-center">
                  <BriefcaseIcon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {internship.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {internship.department}
                </p>
              </div>
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {internship.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <UserGroupIcon className="h-4 w-4 mr-1" />
                {internship.applicants} Applicants
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Deadline: {format(internship.deadline, 'MMM d, yyyy')}
              </div>
            </div>
            
            <div className="mt-3 flex justify-end">
              <Link 
                to={`/internships/${internship.id}`}
                className="text-xs text-primary hover:text-primary-dark font-medium"
              >
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <Link 
          to="/internships"
          className="text-sm text-primary hover:text-primary-dark font-medium"
        >
          View All Internships
        </Link>
      </div>
    </div>
  );
};

export default InternshipList;
