const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light',
    success: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
};

export default Badge;
