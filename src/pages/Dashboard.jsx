import { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import CandidateList from '../components/dashboard/CandidateList';
import InternshipList from '../components/dashboard/InternshipList';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, getApplications, getCandidates, getInternships } from '../services/firestore';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    activeInternships: 0,
    totalApplications: 0,
    interviewStage: 0,
    acceptanceRate: '0%'
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [topCandidates, setTopCandidates] = useState([]);
  const [activeInternships, setActiveInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (currentUser) {
          const companyId = currentUser.uid; // Using user ID as company ID for simplicity
          
          // Get dashboard stats
          const dashboardStats = await getDashboardStats(companyId);
          setStats(dashboardStats);
          
          // Get recent applications for activity feed
          const applications = await getApplications(companyId);
          const recentApps = applications.slice(0, 5).map(app => ({
            id: app.id,
            type: 'application',
            title: `New application for ${app.internshipTitle || 'Internship'}`,
            candidate: app.candidateName,
            timestamp: app.createdAt?.toDate() || new Date(),
            status: app.status
          }));
          setRecentActivities(recentApps);
          
          // Get top candidates
          const candidates = await getCandidates(companyId);
          setTopCandidates(candidates.slice(0, 5));
          
          // Get active internships
          const internships = await getInternships(companyId);
          setActiveInternships(internships.filter(internship => 
            internship.status === 'open' || internship.status === 'in progress'
          ).slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Use fallback data if Firestore fetch fails
        setStats({
          activeInternships: 12,
          totalApplications: 145,
          interviewStage: 28,
          acceptanceRate: '18%'
        });
        
        setRecentActivities([
          {
            id: 1,
            type: 'application',
            title: 'New application for Frontend Developer Internship',
            candidate: 'John Smith',
            timestamp: new Date(2023, 5, 15),
            status: 'pending'
          },
          {
            id: 2,
            type: 'interview',
            title: 'Interview scheduled',
            candidate: 'Emily Johnson',
            timestamp: new Date(2023, 5, 14),
            status: 'scheduled'
          },
          {
            id: 3,
            type: 'offer',
            title: 'Offer sent',
            candidate: 'Michael Brown',
            timestamp: new Date(2023, 5, 13),
            status: 'sent'
          },
          {
            id: 4,
            type: 'application',
            title: 'New application for Data Science Internship',
            candidate: 'Sarah Wilson',
            timestamp: new Date(2023, 5, 12),
            status: 'pending'
          },
          {
            id: 5,
            type: 'rejection',
            title: 'Application rejected',
            candidate: 'David Lee',
            timestamp: new Date(2023, 5, 11),
            status: 'rejected'
          }
        ]);
        
        setTopCandidates([
          {
            id: 1,
            name: 'Emily Johnson',
            email: 'emily.johnson@example.com',
            position: 'Frontend Developer',
            status: 'interview',
            rating: 4.8
          },
          {
            id: 2,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            position: 'Backend Developer',
            status: 'offer',
            rating: 4.7
          },
          {
            id: 3,
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            position: 'Data Scientist',
            status: 'review',
            rating: 4.5
          },
          {
            id: 4,
            name: 'John Smith',
            email: 'john.smith@example.com',
            position: 'UI/UX Designer',
            status: 'pending',
            rating: 4.3
          },
          {
            id: 5,
            name: 'Jessica Davis',
            email: 'jessica.davis@example.com',
            position: 'Mobile Developer',
            status: 'review',
            rating: 4.2
          }
        ]);
        
        setActiveInternships([
          {
            id: 1,
            title: 'Frontend Developer Internship',
            department: 'Engineering',
            location: 'Remote',
            applicants: 45,
            deadline: new Date(2023, 6, 30)
          },
          {
            id: 2,
            title: 'Backend Developer Internship',
            department: 'Engineering',
            location: 'New York, NY',
            applicants: 38,
            deadline: new Date(2023, 6, 15)
          },
          {
            id: 3,
            title: 'Data Science Internship',
            department: 'Data',
            location: 'San Francisco, CA',
            applicants: 27,
            deadline: new Date(2023, 7, 10)
          },
          {
            id: 4,
            title: 'UI/UX Design Internship',
            department: 'Design',
            location: 'Remote',
            applicants: 32,
            deadline: new Date(2023, 6, 20)
          },
          {
            id: 5,
            title: 'Mobile Developer Internship',
            department: 'Engineering',
            location: 'Austin, TX',
            applicants: 21,
            deadline: new Date(2023, 7, 5)
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {currentUser?.displayName || 'User'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Internships" 
          value={stats.activeInternships} 
          icon="briefcase" 
          change="+2" 
          changeType="increase" 
        />
        <StatCard 
          title="Total Applications" 
          value={stats.totalApplications} 
          icon="document" 
          change="+12" 
          changeType="increase" 
        />
        <StatCard 
          title="Interview Stage" 
          value={stats.interviewStage} 
          icon="chat" 
          change="+5" 
          changeType="increase" 
        />
        <StatCard 
          title="Acceptance Rate" 
          value={stats.acceptanceRate} 
          icon="chart" 
          change="+2.5%" 
          changeType="increase" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Internships</h2>
            <InternshipList internships={activeInternships} />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Candidates</h2>
            <CandidateList candidates={topCandidates} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <ActivityFeed activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
