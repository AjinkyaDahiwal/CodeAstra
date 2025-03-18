import { useState } from 'react';
import { 
  ArrowLeftIcon, 
  StarIcon, 
  DocumentTextIcon, 
  UserIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

// Sample submissions data
const sampleSubmissions = [
  {
    id: 1,
    candidateName: 'Alex Johnson',
    candidatePhoto: null,
    submissionDate: new Date(2025, 2, 10),
    title: 'React Dashboard App',
    description: 'A responsive dashboard built with React, Tailwind CSS, and Firebase',
    repoUrl: 'https://github.com/alexj/react-dashboard',
    demoUrl: 'https://react-dashboard-demo.netlify.app',
    score: null,
    feedback: '',
    status: 'pending'
  }
];

const SubmissionReview = ({ competition, onBack }) => {
  const [submissions] = useState(sampleSubmissions);
  const [activeSubmission, setActiveSubmission] = useState(null);
  const [scores, setScores] = useState({});
  const [feedback, setFeedback] = useState({});
  
  const handleScoreChange = (submissionId, category, value) => {
    setScores(prev => ({
      ...prev,
      [submissionId]: {
        ...(prev[submissionId] || {}),
        [category]: parseInt(value)
      }
    }));
  };
  
  const handleFeedbackChange = (submissionId, value) => {
    setFeedback(prev => ({
      ...prev,
      [submissionId]: value
    }));
  };
  
  const calculateTotalScore = (submissionId) => {
    if (!scores[submissionId]) return 0;
    
    const submissionScores = scores[submissionId];
    return Object.values(submissionScores).reduce((sum, score) => sum + score, 0);
  };
  
  const handleSubmitReview = (submissionId) => {
    // In a real app, we would save the review to Firestore here
    console.log('Submitting review for submission', submissionId);
    console.log('Scores:', scores[submissionId]);
    console.log('Feedback:', feedback[submissionId]);
    
    // Show success message or redirect
    alert('Review submitted successfully!');
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          icon={ArrowLeftIcon}
          onClick={onBack}
          className="mr-4"
        >
          Back
        </Button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {competition ? competition.title : 'Competition'} - Submissions
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Submissions ({submissions.length})</h3>
            
            {submissions.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No submissions yet.</p>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div 
                    key={submission.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      activeSubmission?.id === submission.id 
                        ? 'bg-primary-light dark:bg-primary-dark' 
                        : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveSubmission(submission)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                        {submission.candidatePhoto ? (
                          <img 
                            src={submission.candidatePhoto} 
                            alt={submission.candidateName} 
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-bold">
                            {submission.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{submission.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{submission.candidateName}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(submission.submissionDate)}
                      </span>
                      
                      {submission.status === 'approved' ? (
                        <Badge variant="success">Approved</Badge>
                      ) : submission.status === 'rejected' ? (
                        <Badge variant="danger">Rejected</Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {activeSubmission ? (
            <Card>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {activeSubmission.title}
                </h3>
                
                <div className="flex items-center mb-4">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">{activeSubmission.candidateName}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 dark:text-gray-400">{formatDate(activeSubmission.submissionDate)}</span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {activeSubmission.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  {activeSubmission.repoUrl && (
                    <a 
                      href={activeSubmission.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      <DocumentTextIcon className="h-4 w-4 mr-1" />
                      Repository
                    </a>
                  )}
                  
                  {activeSubmission.demoUrl && (
                    <a 
                      href={activeSubmission.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      <DocumentTextIcon className="h-4 w-4 mr-1" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Evaluation</h4>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Technical Implementation (0-10)
                    </label>
                    <div className="flex items-center">
                      {[...Array(11)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`h-8 w-8 rounded-full mx-1 flex items-center justify-center ${
                            scores[activeSubmission.id]?.technical === i
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                          onClick={() => handleScoreChange(activeSubmission.id, 'technical', i)}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Design & User Experience (0-10)
                    </label>
                    <div className="flex items-center">
                      {[...Array(11)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`h-8 w-8 rounded-full mx-1 flex items-center justify-center ${
                            scores[activeSubmission.id]?.design === i
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                          onClick={() => handleScoreChange(activeSubmission.id, 'design', i)}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Innovation & Creativity (0-10)
                    </label>
                    <div className="flex items-center">
                      {[...Array(11)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`h-8 w-8 rounded-full mx-1 flex items-center justify-center ${
                            scores[activeSubmission.id]?.innovation === i
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                          onClick={() => handleScoreChange(activeSubmission.id, 'innovation', i)}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Overall Score: {calculateTotalScore(activeSubmission.id)}/30
                    </label>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(calculateTotalScore(activeSubmission.id) / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feedback
                  </label>
                  <textarea
                    rows="4"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Provide feedback to the candidate..."
                    value={feedback[activeSubmission.id] || ''}
                    onChange={(e) => handleFeedbackChange(activeSubmission.id, e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="danger" 
                    icon={XCircleIcon}
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reject this submission?')) {
                        // In a real app, we would update the submission status in Firestore
                        console.log('Rejected submission', activeSubmission.id);
                      }
                    }}
                  >
                    Reject
                  </Button>
                  
                  <Button 
                    variant="success" 
                    icon={CheckCircleIcon}
                    onClick={() => handleSubmitReview(activeSubmission.id)}
                  >
                    Approve & Send Feedback
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Submission</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Click on a submission from the list to view and evaluate it.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionReview;
