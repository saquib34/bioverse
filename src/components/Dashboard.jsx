import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import AdditionalDetails from './AdditionalDetails';
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";
import { auth } from '../firebase';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserData(user.email);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, db]);

  const fetchUserData = async (email) => {
    try {
      const registrationsRef = collection(db, 'registrations');
      const q = query(registrationsRef, where("teamLeadEmail", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const data = userDoc.data();
        setUserData(data);
        setPaymentStatus(data.pay === true);
      } else {
        console.error("No matching document found for the current user");
        setError('No user data found. Please try logging in again.');
        navigate('/login');
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError('An error occurred while loading your data. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
      setError('Failed to log out. Please try again.');
    }
  };

  const handleViewDocument = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Document not available');
    }
  };

  const handlePay = () => {
    // Implement payment logic here
    console.log("Redirecting to payment gateway...");
    navigate('/payment');
  };

  const handleEdit = () => {
    navigate('/edit');
  };

  const handleNext = () => {
    navigate('/submissions');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  if (!userData) return <AdditionalDetails />;

  const TeamMemberCard = ({ member, index }) => (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold text-white mb-2">Team Member {index + 1}</h3>
      <div className="flex flex-col sm:flex-row items-center">
        <img 
          src={member.profilePicUrl || '/placeholder-avatar.png'} 
          alt={`${member.name}'s profile`} 
          className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-4"
        />
        <div>
          <p className="text-white"><span className="font-semibold">Name:</span> {member.name}</p>
          <p className="text-white"><span className="font-semibold">Email:</span> {member.email}</p>
          <p className="text-white"><span className="font-semibold">Mobile:</span> {member.mobile}</p>
          <p className="text-white"><span className="font-semibold">University:</span> {member.university}</p>
          <button 
            onClick={() => handleViewDocument(member.idCardUrl)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            View ID Card
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10 py-12">
      <img src={bg2} alt="" className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover" />
      <img src={bg} alt="" className="hidden sm:block absolute w-full h-full object-cover" />
      <img src={text} alt="" className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px]" />

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg border border-gray-700 shadow-md rounded-3xl w-full max-w-4xl">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">Team Dashboard</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-2xl text-white font-semibold mb-4">Team Information</h3>
            <p className="text-white"><span className="font-semibold">Team Name:</span> {userData.teamName}</p>
            <p className="text-white"><span className="font-semibold">Team Lead:</span> {userData.teamLeadName}</p>
            <p className="text-white"><span className="font-semibold">Email:</span> {userData.teamLeadEmail}</p>
            <p className="text-white"><span className="font-semibold">Status:</span> {userData.isStudent ? 'Students' : 'Professionals'}</p>
            <p className="text-white"><span className="font-semibold">Country:</span> {userData.country}</p>
          </div>
          <div>
            <h3 className="text-2xl text-white font-semibold mb-4">Project Details</h3>
            <p className="text-white"><span className="font-semibold">Theme:</span> {userData.projectTheme}</p>
            <p className="text-white"><span className="font-semibold">Description:</span> {userData.projectDescription}</p>
          </div>
        </div>

        <h3 className="text-2xl text-white font-semibold mb-4">Team Members</h3>
        <div className="space-y-4">
          <TeamMemberCard member={userData.member1} index={0} />
          <TeamMemberCard member={userData.member2} index={1} />
          <TeamMemberCard member={userData.member3} index={2} />
        </div>

        <div className="mt-8 space-y-4">
          {!paymentStatus && (
            <>
              <button 
                onClick={handlePay}
                className="w-full p-3 bg-green-600 text-white rounded-3xl hover:bg-green-500 transition duration-300"
              >
                Pay Now
              </button>
              <button 
                onClick={handleEdit}
                className="w-full p-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-500 transition duration-300"
              >
                Edit Details
              </button>
            </>
          )}
          {paymentStatus && (
            <button 
              onClick={handleNext}
              className="w-full p-3 bg-purple-600 text-white rounded-3xl hover:bg-purple-500 transition duration-300"
            >
              Next
            </button>
          )}
          <button 
            onClick={handleLogout}
            className="w-full p-3 bg-red-600 text-white rounded-3xl hover:bg-red-500 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;