import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signOut } from 'firebase/auth';
import { verifyToken, decodeToken } from '../utils/jwtUtils';
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";

const MAX_PROFILE_PIC_SIZE = 3 * 1024 * 1024; // 3MB in bytes
const MAX_ID_CARD_SIZE = 100 * 1024; // 100KB in bytes
const MAX_RETRY_ATTEMPTS = 3;

const AdditionalDetails = () => {
  const [teamData, setTeamData] = useState({
    teamLeadEmail: '',
    teamLeadName: '',
    teamName: '',
    projectTheme: '',
    projectDescription: '',
    isStudent: true,
    members: [
      { name: '', email: '', mobile: '', university: '',regNumber :'', profilePic: null, idCard: null },
      { name: '', email: '', mobile: '', university: '',regNumber :'', profilePic: null, idCard: null },
      { name: '', email: '', mobile: '', university: '',regNumber :'', profilePic: null, idCard: null }
    ]
  });
  const [country, setCountry] = useState('India');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();
  const auth = getAuth();

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No auth token found');
        }

        if (!verifyToken(token)) {
          throw new Error('Invalid token');
        }

        await new Promise((resolve) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
          });
        });

        const email = auth.currentUser ? auth.currentUser.email : null;
        const decodedToken = decodeToken(token);

        if (!decodedToken || !email) {
          throw new Error('Invalid user data');
        }

        // Fetch existing data
        const registrationsRef = collection(db, 'registrations');
        const q = query(registrationsRef, where("teamLeadEmail", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const registrationData = querySnapshot.docs[0].data();
          setTeamData(prevData => ({
            ...prevData,
            teamLeadEmail: registrationData.teamLeadEmail,
            teamLeadName: registrationData.teamLeadName,
            teamName: registrationData.teamName || '',
            members: [
              {
                name: registrationData.member1.name,
                email: registrationData.member1.email,
                mobile: registrationData.member1.mobile,
                regNumber : registrationData.member1.regNumber,
                university: '',
                profilePic: null,
                idCard: null
              },
              {
                name: registrationData.member2.name,
                email: registrationData.member2.email,
                mobile: registrationData.member2.mobile,
                regNumber : registrationData.member2.regNumber,
                university: '',
                profilePic: null,
                idCard: null
              },
              {
                name: registrationData.member3.name,
                email: registrationData.member3.email,
                mobile: registrationData.member3.mobile,
                regNumber : registrationData.member3.regNumber,
                university: '',
                profilePic: null,
                idCard: null
              }
            ]
          }));
        }

        setLoading(false);
        setRetryCount(0);
      } catch (err) {
        console.error('Error initializing component:', err);
        if (retryCount < MAX_RETRY_ATTEMPTS) {
          setRetryCount(prevCount => prevCount + 1);
          setTimeout(initializeComponent, 1000); // Retry after 1 second
        } else {
          setError('Unable to load user data. Please try logging in again.');
          setLoading(false);
        }
      }
    };

    initializeComponent();
  }, [navigate, db, auth, retryCount]);

  const validateFile = (file, isProfilePic) => {
    if (isProfilePic) {
      if (file.size > MAX_PROFILE_PIC_SIZE) {
        throw new Error(`Profile picture size exceeds 3MB limit`);
      }
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Profile picture must be JPG or PNG format');
      }
    } else {
      if (file.size > MAX_ID_CARD_SIZE) {
        throw new Error(`ID card size exceeds 100KB limit`);
      }
      if (file.type !== 'application/pdf') {
        throw new Error('ID card must be in PDF format');
      }
    }
  };

  const handleTeamDataChange = (field, value) => {
    setTeamData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleMemberDataChange = (index, field, value) => {
    setTeamData(prevData => ({
      ...prevData,
      members: prevData.members.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const handleFileChange = (index, field, file) => {
    try {
      validateFile(file, field === 'profilePic');
      handleMemberDataChange(index, field, file);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamData.teamLeadEmail) {
      setError('Team lead email not found. Please log in again.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('authToken');
      const decodedToken = decodeToken(token);

      // Upload files and get URLs
      const updatedMembers = await Promise.all(teamData.members.map(async (member, index) => {
        let profilePicUrl = '';
        let idCardUrl = '';
        if (member.profilePic) {
          const profilePicRef = ref(storage, `profile_pics/${decodedToken.userId}/${index}_${member.profilePic.name}`);
          await uploadBytes(profilePicRef, member.profilePic);
          profilePicUrl = await getDownloadURL(profilePicRef);
        }
        if (member.idCard) {
          const idCardRef = ref(storage, `id_cards/${decodedToken.userId}/${index}_${member.idCard.name}`);
          await uploadBytes(idCardRef, member.idCard);
          idCardUrl = await getDownloadURL(idCardRef);
        }
        return { 
          name: member.name,
          email: member.email,
          mobile: member.mobile,
          regNumber : member.regNumber,
          university: member.university,
          profilePicUrl,
          idCardUrl
        };
      }));

      const registrationsRef = collection(db, 'registrations');
      const q = query(registrationsRef, where("teamLeadEmail", "==", teamData.teamLeadEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No matching registration found");
      }

      const docRef = querySnapshot.docs[0].ref;

      await updateDoc(docRef, {
        teamName: teamData.teamName,
        projectTheme: teamData.projectTheme,
        projectDescription: teamData.projectDescription,
        isStudent: teamData.isStudent,
        country,
        member1: updatedMembers[0],
        member2: updatedMembers[1],
        member3: updatedMembers[2],
        additionalDetailsProvided: true
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Error updating additional details:", error);
      setError(`Failed to update additional details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
      setError('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black bg-opacity-80 px-4 sm:px-6 md:px-8 lg:px-10 py-12">
      <img src={bg2} alt="" className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover opacity-50" />
      <img src={bg} alt="" className="hidden sm:block absolute w-full h-full object-cover opacity-50" />
      <img src={text} alt="" className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px] opacity-50" />

      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300"
      >
        Logout
      </button>

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-black bg-opacity-70 border border-gray-700 shadow-md rounded-3xl w-full max-w-4xl">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Team Registration</h2>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4">
            {error}
            {retryCount < MAX_RETRY_ATTEMPTS && (
              <button 
                onClick={() => setRetryCount(0)} 
                className="ml-2 underline"
              >
                Retry
              </button>
            )}
          </div>
        )}
        
        {loading ? (
          <div className="text-white text-center">Loading... Attempt {retryCount + 1} of {MAX_RETRY_ATTEMPTS + 1}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  checked={teamData.isStudent}
                  onChange={() => handleTeamDataChange('isStudent', true)}
                  className="mr-2"
                />
                Students
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  checked={!teamData.isStudent}
                  onChange={() => handleTeamDataChange('isStudent', false)}
                  className="mr-2"
                />
                Professionals
              </label>
            </div>

            <div className="w-full mb-4">
              <label className="block text-white mb-2">
                Country of Residence:
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border text-black bg-gray-700 bg-opacity-40 backdrop-blur-xs rounded-3xl"
                required
              >
                <option value="India">India</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {teamData.members.map((member, index) => (
              <div key={index} className="p-4 border border-gray-600 rounded-lg space-y-4">
                <h3 className="text-white font-semibold mb-2">Team Member {index + 1}</h3>
                <p className="text-white">Name: {member.name}</p>
                <p className="text-white">Email: {member.email}</p>
                <p className="text-white">Mobile: {member.mobile}</p>
                <p className="text-white">Registration Number: {member.regNumber}</p>
                <div>
                  <label className="block text-white mb-2">
                    University:
                  </label>
                  <input
                    type="text"
                    value={member.university}
                    onChange={(e) => handleMemberDataChange(index, 'university', e.target.value)}
                    placeholder="Enter university name"
                    required
                    className="w-full p-3 border placeholder-gray-400 text-white bg-gray-700 bg-opacity-40 backdrop-blur-xs rounded-3xl"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">
                    Profile Picture (JPG or PNG, max 3MB):
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(index, 'profilePic', e.target.files[0])}
                    accept="image/jpeg,image/png"
                    required
                    className="w-full p-3 border text-white bg-gray-700 bg-opacity-40 backdrop-blur-xs rounded-3xl"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">
                    {teamData.isStudent
                      ? (country === 'India' ? 'Student ID Card' : 'Government ID')
                      : (country === 'India' ? 'Aadhar Card' : 'Government ID')} (PDF only, max 100KB):
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(index, 'idCard', e.target.files[0])}
                    accept="application/pdf"
                    required
                    className="w-full p-3 border text-white bg-gray-700 bg-opacity-40 backdrop-blur-xs rounded-3xl"
                  />
                </div>
              </div>
            ))}
            
            <div className="space-y-4">
   
              
            </div>
            
            <button 
              type="submit" 
              className="w-full p-3 bg-purple-600 text-white rounded-3xl hover:bg-purple-500 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdditionalDetails;