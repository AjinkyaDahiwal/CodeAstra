import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Candidates
export const getCandidates = async (companyId) => {
  try {
    const q = query(
      collection(db, 'candidates'),
      where('companyId', '==', companyId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting candidates:', error);
    throw error;
  }
};

export const getCandidate = async (candidateId) => {
  try {
    const docRef = doc(db, 'candidates', candidateId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Candidate not found');
    }
  } catch (error) {
    console.error('Error getting candidate:', error);
    throw error;
  }
};

export const addCandidate = async (candidateData) => {
  try {
    const docRef = await addDoc(collection(db, 'candidates'), {
      ...candidateData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding candidate:', error);
    throw error;
  }
};

export const updateCandidate = async (candidateId, candidateData) => {
  try {
    const docRef = doc(db, 'candidates', candidateId);
    await updateDoc(docRef, {
      ...candidateData,
      updatedAt: serverTimestamp()
    });
    
    return candidateId;
  } catch (error) {
    console.error('Error updating candidate:', error);
    throw error;
  }
};

export const deleteCandidate = async (candidateId) => {
  try {
    await deleteDoc(doc(db, 'candidates', candidateId));
    return candidateId;
  } catch (error) {
    console.error('Error deleting candidate:', error);
    throw error;
  }
};

// Internships
export const getAllInternships = async () => {
  try {
    const q = query(
      collection(db, 'internships'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      applicationDeadline: doc.data().applicationDeadline ? new Date(doc.data().applicationDeadline) : null
    }));
  } catch (error) {
    console.error('Error getting all internships:', error);
    throw error;
  }
};

export const getInternships = async (companyId) => {
  try {
    const q = query(
      collection(db, 'internships'),
      where('companyId', '==', companyId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting internships:', error);
    throw error;
  }
};

export const getInternship = async (internshipId) => {
  try {
    const docRef = doc(db, 'internships', internshipId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Internship not found');
    }
  } catch (error) {
    console.error('Error getting internship:', error);
    throw error;
  }
};

export const addInternship = async (internshipData) => {
  try {
    const docRef = await addDoc(collection(db, 'internships'), {
      ...internshipData,
      applications: 0, // Initialize with 0 applications
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding internship:', error);
    throw error;
  }
};

export const updateInternship = async (internshipId, internshipData) => {
  try {
    const docRef = doc(db, 'internships', internshipId);
    await updateDoc(docRef, {
      ...internshipData,
      updatedAt: serverTimestamp()
    });
    
    return internshipId;
  } catch (error) {
    console.error('Error updating internship:', error);
    throw error;
  }
};

export const deleteInternship = async (internshipId) => {
  try {
    await deleteDoc(doc(db, 'internships', internshipId));
    return internshipId;
  } catch (error) {
    console.error('Error deleting internship:', error);
    throw error;
  }
};

// Applications
export const getApplications = async (companyId, internshipId = null) => {
  try {
    let q;
    
    if (internshipId) {
      q = query(
        collection(db, 'applications'),
        where('companyId', '==', companyId),
        where('internshipId', '==', internshipId),
        orderBy('appliedAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'applications'),
        where('companyId', '==', companyId),
        orderBy('appliedAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      appliedAt: doc.data().appliedAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting applications:', error);
    throw error;
  }
};

export const getApplicationsForCompanyInternships = async (companyId) => {
  try {
    // First, get all internships for this company
    const internships = await getInternships(companyId);
    
    if (!internships.length) {
      return [];
    }
    
    // Get internship IDs
    const internshipIds = internships.map(internship => internship.id);
    
    // Query applications for these internships
    const applications = [];
    
    // We need to do multiple queries since Firestore doesn't support array-contains with multiple values
    for (const internshipId of internshipIds) {
      const q = query(
        collection(db, 'applications'),
        where('internshipId', '==', internshipId),
        orderBy('appliedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const internshipApplications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        appliedAt: doc.data().appliedAt?.toDate()
      }));
      
      applications.push(...internshipApplications);
    }
    
    return applications;
  } catch (error) {
    console.error('Error getting applications for company internships:', error);
    throw error;
  }
};

export const getAllApplications = async () => {
  try {
    const q = query(
      collection(db, 'applications'),
      orderBy('appliedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      appliedAt: doc.data().appliedAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting all applications:', error);
    throw error;
  }
};

export const getApplicationsByPostedBy = async (userId) => {
  try {
    const q = query(
      collection(db, 'applications'),
      where('postedBy', '==', userId),
      orderBy('appliedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      appliedAt: doc.data().appliedAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting applications by posted by:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (applicationId, status) => {
  try {
    const docRef = doc(db, 'applications', applicationId);
    await updateDoc(docRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    
    // If accepting or rejecting, update the internship's applications count
    const application = await getDoc(docRef);
    if (application.exists() && (status === 'accepted' || status === 'rejected')) {
      const internshipRef = doc(db, 'internships', application.data().internshipId);
      const internship = await getDoc(internshipRef);
      
      if (internship.exists()) {
        // Update the internship with the new status count
        const currentCount = internship.data()[`${status}Count`] || 0;
        await updateDoc(internshipRef, {
          [`${status}Count`]: currentCount + 1,
          updatedAt: serverTimestamp()
        });
      }
    }
    
    return applicationId;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

// Dashboard Stats
export const getDashboardStats = async (companyId) => {
  try {
    // Get active internships count
    const internshipsQuery = query(
      collection(db, 'internships'),
      where('companyId', '==', companyId),
      where('status', 'in', ['open', 'in progress'])
    );
    const internshipsSnapshot = await getDocs(internshipsQuery);
    const activeInternshipsCount = internshipsSnapshot.size;
    
    // Get total applications count
    const applicationsQuery = query(
      collection(db, 'applications'),
      where('companyId', '==', companyId)
    );
    const applicationsSnapshot = await getDocs(applicationsQuery);
    const totalApplicationsCount = applicationsSnapshot.size;
    
    // Get candidates in interview stage
    const interviewQuery = query(
      collection(db, 'applications'),
      where('companyId', '==', companyId),
      where('status', '==', 'interview')
    );
    const interviewSnapshot = await getDocs(interviewQuery);
    const interviewCount = interviewSnapshot.size;
    
    // Calculate acceptance rate
    const acceptedQuery = query(
      collection(db, 'applications'),
      where('companyId', '==', companyId),
      where('status', '==', 'accepted')
    );
    const acceptedSnapshot = await getDocs(acceptedQuery);
    const acceptedCount = acceptedSnapshot.size;
    
    const acceptanceRate = totalApplicationsCount > 0 
      ? Math.round((acceptedCount / totalApplicationsCount) * 100) 
      : 0;
    
    return {
      activeInternships: activeInternshipsCount,
      totalApplications: totalApplicationsCount,
      interviewStage: interviewCount,
      acceptanceRate: `${acceptanceRate}%`
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};
