import { useState } from 'react';
import { 
  ArrowDownTrayIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  BriefcaseIcon,
  AcademicCapIcon,
  ClockIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';

// Sample data for charts and metrics
const metricsData = {
  totalCandidates: 156,
  activeInternships: 12,
  completionRate: 78,
  averageRating: 4.2,
  skillGap: 15,
  topSkills: ['React', 'JavaScript', 'Python', 'UI/UX Design', 'Data Analysis']
};

const Analytics = () => {
  const [selectedReport, setSelectedReport] = useState('dashboard');
  
  const handleExport = (format) => {
    // In a real app, we would generate and download the report here
    console.log(`Exporting ${selectedReport} report as ${format}`);
    alert(`${selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} report will be exported as ${format.toUpperCase()}`);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h1>
        <div className="flex space-x-2">
          <Button 
            variant="secondary" 
            icon={ArrowDownTrayIcon}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
          <Button 
            variant="secondary" 
            icon={ArrowDownTrayIcon}
            onClick={() => handleExport('csv')}
          >
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="flex items-center p-6">
          <div className="rounded-full bg-primary-light p-3 mr-4">
            <UserGroupIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Candidates</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{metricsData.totalCandidates}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <BriefcaseIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Internships</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{metricsData.activeInternships}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="rounded-full bg-amber-100 p-3 mr-4">
            <ClockIcon className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{metricsData.completionRate}%</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <AcademicCapIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{metricsData.averageRating}/5</h3>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Internship Performance Tracking</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Web Development Internship</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">85%</span>
              </div>
              <ProgressBar value={85} variant="primary" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Science Program</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">72%</span>
              </div>
              <ProgressBar value={72} variant="info" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">UI/UX Design Challenge</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">91%</span>
              </div>
              <ProgressBar value={91} variant="success" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile App Development</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">68%</span>
              </div>
              <ProgressBar value={68} variant="warning" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Digital Marketing</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">79%</span>
              </div>
              <ProgressBar value={79} variant="primary" />
            </div>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Skill Distribution</h3>
          
          <div className="space-y-4">
            {metricsData.topSkills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {Math.floor(100 - (index * 10))}%
                  </span>
                </div>
                <ProgressBar 
                  value={Math.floor(100 - (index * 10))} 
                  variant={index === 0 ? "primary" : index === 1 ? "success" : index === 2 ? "info" : index === 3 ? "warning" : "danger"} 
                  size="sm" 
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Skill Gap Analysis</h4>
              <span className="text-sm font-medium text-red-500">{metricsData.skillGap}%</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current skill gap between candidate profiles and internship requirements.
            </p>
          </div>
        </Card>
      </div>
      
      <Card>
        <div className="flex items-center mb-6">
          <DocumentChartBarIcon className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Available Reports</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedReport === 'dashboard' 
                ? 'border-primary bg-primary-light/20 dark:border-primary-light dark:bg-primary-dark/20' 
                : 'border-gray-200 hover:border-primary-light hover:bg-gray-50 dark:border-gray-700 dark:hover:border-primary-dark dark:hover:bg-gray-800'
            }`}
            onClick={() => setSelectedReport('dashboard')}
          >
            <div className="flex items-center">
              <ChartBarIcon className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Dashboard Overview</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Complete overview of all metrics and KPIs
            </p>
          </div>
          
          <div 
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedReport === 'candidates' 
                ? 'border-primary bg-primary-light/20 dark:border-primary-light dark:bg-primary-dark/20' 
                : 'border-gray-200 hover:border-primary-light hover:bg-gray-50 dark:border-gray-700 dark:hover:border-primary-dark dark:hover:bg-gray-800'
            }`}
            onClick={() => setSelectedReport('candidates')}
          >
            <div className="flex items-center">
              <UserGroupIcon className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Candidate Analytics</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Detailed analysis of candidate performance and demographics
            </p>
          </div>
          
          <div 
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedReport === 'internships' 
                ? 'border-primary bg-primary-light/20 dark:border-primary-light dark:bg-primary-dark/20' 
                : 'border-gray-200 hover:border-primary-light hover:bg-gray-50 dark:border-gray-700 dark:hover:border-primary-dark dark:hover:bg-gray-800'
            }`}
            onClick={() => setSelectedReport('internships')}
          >
            <div className="flex items-center">
              <BriefcaseIcon className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Internship Performance</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Metrics on internship completion, satisfaction, and outcomes
            </p>
          </div>
          
          <div 
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedReport === 'skills' 
                ? 'border-primary bg-primary-light/20 dark:border-primary-light dark:bg-primary-dark/20' 
                : 'border-gray-200 hover:border-primary-light hover:bg-gray-50 dark:border-gray-700 dark:hover:border-primary-dark dark:hover:bg-gray-800'
            }`}
            onClick={() => setSelectedReport('skills')}
          >
            <div className="flex items-center">
              <AcademicCapIcon className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Skills Analysis</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Breakdown of skills distribution and gap analysis
            </p>
          </div>
          
          <div 
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedReport === 'competitions' 
                ? 'border-primary bg-primary-light/20 dark:border-primary-light dark:bg-primary-dark/20' 
                : 'border-gray-200 hover:border-primary-light hover:bg-gray-50 dark:border-gray-700 dark:hover:border-primary-dark dark:hover:bg-gray-800'
            }`}
            onClick={() => setSelectedReport('competitions')}
          >
            <div className="flex items-center">
              <ChartBarIcon className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Competition Results</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Analysis of competition participation and outcomes
            </p>
          </div>
          
          <div 
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedReport === 'feedback' 
                ? 'border-primary bg-primary-light/20 dark:border-primary-light dark:bg-primary-dark/20' 
                : 'border-gray-200 hover:border-primary-light hover:bg-gray-50 dark:border-gray-700 dark:hover:border-primary-dark dark:hover:bg-gray-800'
            }`}
            onClick={() => setSelectedReport('feedback')}
          >
            <div className="flex items-center">
              <ChartBarIcon className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Feedback Analysis</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Summary of candidate and mentor feedback
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
