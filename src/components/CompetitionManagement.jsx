import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
// Update the import path to point to the correct firebase.js location
import { db } from '../services/firebase';

const CompetitionManagement = () => {
  const [competitions, setCompetitions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    skillsRequired: '',
    maxParticipants: 0,
    status: 'draft', // draft, active, completed
    evaluationCriteria: '',
    prizeDetails: '',
    eligibilityCriteria: '',
    submissionGuidelines: ''
  });

  useEffect(() => {
    fetchCompetitions();
  }, []);

  // Add this near the top of your component
  const [error, setError] = useState(null);

  const fetchCompetitions = async () => {
    try {
      setError(null);
      const querySnapshot = await getDocs(collection(db, 'competitions'));
      console.log('Fetched competitions:', querySnapshot.docs.length); // Debug log
      setCompetitions(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (err) {
      console.error('Error fetching competitions:', err);
      setError('Failed to load competitions');
    }
  };

  // Add this in your return statement after the h2
  {error && (
    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
      {error}
    </div>
  )}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate and format the data
      const formattedData = {
        ...formData,
        createdAt: new Date().toISOString(),
        participants: [],
        submissions: [],
        maxParticipants: Number(formData.maxParticipants),
        skillsRequired: formData.skillsRequired.split(',').map(skill => skill.trim())
      };

      console.log('Submitting competition:', formattedData); // Debug log
      
      const docRef = await addDoc(collection(db, 'competitions'), formattedData);
      console.log('Competition created with ID:', docRef.id); // Debug log
      
      fetchCompetitions();
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        skillsRequired: '',
        maxParticipants: 0,
        status: 'draft',
        evaluationCriteria: '',
        prizeDetails: '',
        eligibilityCriteria: '',
        submissionGuidelines: ''
      });
    } catch (error) {
      console.error('Error adding competition:', error);
      setError('Failed to create competition');
    }
  };

  const updateCompetitionStatus = async (competitionId, newStatus) => {
    try {
      await updateDoc(doc(db, 'competitions', competitionId), {
        status: newStatus
      });
      fetchCompetitions();
    } catch (error) {
      console.error('Error updating competition status:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Competition Management</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Competition Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="p-2 border rounded-md"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="datetime-local"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="datetime-local"
            placeholder="End Date"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Required Skills (comma-separated)"
            value={formData.skillsRequired}
            onChange={(e) => setFormData({...formData, skillsRequired: e.target.value})}
            className="p-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Maximum Participants"
            value={formData.maxParticipants}
            onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
            className="p-2 border rounded-md"
            min="1"
            required
          />
          <textarea
            placeholder="Evaluation Criteria"
            value={formData.evaluationCriteria}
            onChange={(e) => setFormData({...formData, evaluationCriteria: e.target.value})}
            className="p-2 border rounded-md"
            required
          />
          <textarea
            placeholder="Prize Details"
            value={formData.prizeDetails}
            onChange={(e) => setFormData({...formData, prizeDetails: e.target.value})}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          Create Competition
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitions.map(competition => (
          <div key={competition.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{competition.title}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                competition.status === 'active' ? 'bg-green-100 text-green-800' :
                competition.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {competition.status}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{competition.description}</p>
            <div className="text-sm text-gray-500">
              <p>Start: {new Date(competition.startDate).toLocaleDateString()}</p>
              <p>End: {new Date(competition.endDate).toLocaleDateString()}</p>
              <p>Participants: {competition.participants?.length || 0}/{competition.maxParticipants}</p>
            </div>
            <div className="mt-4 flex gap-2">
              {competition.status === 'draft' && (
                <button
                  onClick={() => updateCompetitionStatus(competition.id, 'active')}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Activate
                </button>
              )}
              {competition.status === 'active' && (
                <button
                  onClick={() => updateCompetitionStatus(competition.id, 'completed')}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionManagement;