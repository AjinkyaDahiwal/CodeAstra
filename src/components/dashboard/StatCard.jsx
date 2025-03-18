import {
  BriefcaseIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon, change, changeType = 'increase', changeTimeframe = 'vs last month' }) => {
  const getIcon = () => {
    switch (icon) {
      case 'briefcase':
        return <BriefcaseIcon className="h-6 w-6 text-primary" />;
      case 'document':
        return <DocumentTextIcon className="h-6 w-6 text-primary" />;
      case 'chat':
        return <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary" />;
      case 'chart':
        return <ChartBarIcon className="h-6 w-6 text-primary" />;
      default:
        return <BriefcaseIcon className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-primary-light/10 p-3 rounded-full">
          {getIcon()}
        </div>
        {change && (
          <div className={`flex items-center ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
            {changeType === 'increase' ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">{change}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              {changeTimeframe}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
};

export default StatCard;
