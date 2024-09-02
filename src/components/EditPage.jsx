import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { verifyToken } from '../utils/jwtUtils';
import { auth } from '../firebase';
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";

const EditPage = () => {
    const [userData, setUserData] = useState(null);
    const [docId, setDocId] = useState(null);
    const [error, setError] = useState('');
    const [editedData, setEditedData] = useState({
        teamName: '',
        teamLeadEmail: '',
        member1: { name: '', email: '', mobile: '', regNumber: '' },
        member2: { name: '', email: '', mobile: '', regNumber: '' },
        member3: { name: '', email: '', mobile: '', regNumber: '' },
        projectTheme: '',
        projectDescription: ''
    });
    const navigate = useNavigate();
    const db = getFirestore();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token || !verifyToken(token)) {
                navigate('/login');
                return;
            }

            const email = auth.currentUser ? auth.currentUser.email : null;
            if (!email) {
                navigate('/login');
                return;
            }

            const registrationsRef = collection(db, 'registrations');
            const q = query(registrationsRef, where("teamLeadEmail", "==", email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                setDocId(userDoc.id);
                const data = userDoc.data();
                setUserData(data);
                console.log("Fetched Data:", data); // For debugging
                setEditedData({
                    teamName: data.teamName,
                    teamLeadEmail: data.teamLeadEmail,
                    member1: { 
                        name: data.member1.name, 
                        email: data.member1.email, 
                        mobile: data.member1.mobile || '',
                        regNumber: data.member1.regNumber || ''
                    },
                    member2: { 
                        name: data.member2.name, 
                        email: data.member2.email,
                        mobile: data.member2.mobile || '',
                        regNumber: data.member2.regNumber || ''
                    },
                    member3: { 
                        name: data.member3.name, 
                        email: data.member3.email,
                        mobile: data.member3.mobile || '',
                        regNumber: data.member3.regNumber || ''
                    },
                    projectTheme: data.projectTheme || '',
                    projectDescription: data.projectDescription || ''
                });
                console.log("Fetched Data:", data); // For debugging
            } else {
                console.error("No matching document found for the current user");
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate, db]);

    const handleEdit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (!docId) {
                throw new Error('Document ID not found');
            }

            const registrationDoc = doc(db, 'registrations', docId);
            await updateDoc(registrationDoc, {
                member1: editedData.member1,
                member2: editedData.member2,
                member3: editedData.member3,
                projectTheme: editedData.projectTheme,
                projectDescription: editedData.projectDescription
            });

            setError('Information updated successfully!');
            setTimeout(() => navigate('/dashboard'), 2000); // Redirect to dashboard after 2 seconds
        } catch (error) {
            console.error("Error updating document: ", error);
            setError('Failed to update. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const isTeamLead = (memberEmail) => {
        return memberEmail === editedData.teamLeadEmail;
    };

    const renderMemberFields = (memberNum) => {
        const member = editedData[`member${memberNum}`];
        const isLeader = isTeamLead(member.email);

        return (
            <div key={memberNum} className="space-y-2 mb-4">
                <h3 className="text-white font-semibold">Team Member {memberNum}</h3>
                <input
                    type="text"
                    value={member.name}
                    onChange={(e) => setEditedData({
                        ...editedData,
                        [`member${memberNum}`]: { ...member, name: e.target.value }
                    })}
                    placeholder="Name"
                    className={`w-full px-3 py-2 ${isLeader ? 'bg-gray-600 text-gray-300' : 'bg-gray-700 text-white'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    disabled={isLeader}
                />
                <input
                    type="email"
                    value={member.email}
                    onChange={(e) => setEditedData({
                        ...editedData,
                        [`member${memberNum}`]: { ...member, email: e.target.value }
                    })}
                    placeholder="Email"
                    className={`w-full px-3 py-2 ${isLeader ? 'bg-gray-600 text-gray-300' : 'bg-gray-700 text-white'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    disabled={isLeader}
                />
                <input
                    type="tel"
                    value={member.mobile}
                    onChange={(e) => setEditedData({
                        ...editedData,
                        [`member${memberNum}`]: { ...member, mobile: e.target.value }
                    })}
                    placeholder="Mobile Number"
                    className={`w-full px-3 py-2 ${isLeader ? 'bg-gray-600 text-gray-300' : 'bg-gray-700 text-white'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    disabled={isLeader}
                />
                <input
                    type="text"
                    value={member.regNumber}
                    onChange={(e) => setEditedData({
                        ...editedData,
                        [`member${memberNum}`]: { ...member, regNumber: e.target.value }
                    })}
                    placeholder="Registration Number"
                    className={`w-full px-3 py-2 ${isLeader ? 'bg-gray-600 text-gray-300' : 'bg-gray-700 text-white'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    disabled={isLeader}
                />
            </div>
        );
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10 py-12">
            <img src={bg2} alt="" className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover" />
            <img src={bg} alt="" className="hidden sm:block absolute w-full h-full object-cover" />
            <img src={text} alt="" className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px]" />
            
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition duration-300 text-sm z-20"
            >
                Logout
            </button>

            <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg border border-gray-700 shadow-md rounded-3xl w-full max-w-md">
                <h2 className="text-3xl text-white font-bold mb-6 text-center">Edit Team Information</h2>
                {error && <p className={`text-center mb-4 ${error.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{error}</p>}
                <form onSubmit={handleEdit} className="space-y-4">
                    <div>
                        <h3 className="text-white font-semibold">Team Name (Non-editable)</h3>
                        <input
                            type="text"
                            value={editedData.teamName}
                            className="w-full px-3 py-2 bg-gray-600 text-gray-300 rounded-md mb-2"
                            disabled
                        />
                    </div>
                    
                    {renderMemberFields(1)}
                    {renderMemberFields(2)}
                    {renderMemberFields(3)}

                    <div>
                        <h3 className="text-white font-semibold">Project Theme</h3>
                        <input
                            type="text"
                            value={editedData.projectTheme}
                            onChange={(e) => setEditedData({ ...editedData, projectTheme: e.target.value })}
                            placeholder="Project Theme"
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Project Description</h3>
                        <textarea
                            value={editedData.projectDescription}
                            onChange={(e) => setEditedData({ ...editedData, projectDescription: e.target.value })}
                            placeholder="Project Description"
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows="4"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition duration-300"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300"
                    >
                        Cancel
                    </button>
                    
                </form>
            </div>
        </div>
    );
};

export default EditPage;