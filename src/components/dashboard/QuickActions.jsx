import { 
  DocumentPlusIcon, 
  UserPlusIcon, 
  CalendarIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      name: 'Post New Internship',
      icon: DocumentPlusIcon,
      onClick: () => console.log('Post new internship'),
    },
    {
      id: 2,
      name: 'Review Top Candidates',
      icon: UserPlusIcon,
      onClick: () => console.log('Review top candidates'),
    },
    {
      id: 3,
      name: 'Schedule Interviews',
      icon: CalendarIcon,
      onClick: () => console.log('Schedule interviews'),
    },
    {
      id: 4,
      name: 'Send Communications',
      icon: EnvelopeIcon,
      onClick: () => console.log('Send communications'),
    },
  ];
  
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="secondary"
            icon={action.icon}
            onClick={action.onClick}
            className="justify-start py-3"
          >
            {action.name}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
