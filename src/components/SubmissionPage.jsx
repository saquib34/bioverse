import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { verifyToken } from '../utils/jwtUtils';
import { auth } from '../firebase';
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";

const SubmissionPage = () => {
    const [userData, setUserData] = useState(null);
    const [docId, setDocId] = useState(null);
    const [slideLink, setSlideLink] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();

    useEffect(() => {
        const checkSubmissionStatus = async () => {
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
                setIsSubmitted(data.isSubmitted === true);
                if (data.slideLink) setSlideLink(data.slideLink);
                if (data.videoLink) setVideoLink(data.videoLink);
            } else {
                console.error("No matching document found for the current user");
                navigate('/login');
            }
        };

        checkSubmissionStatus();
    }, [navigate, db]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!slideLink || !videoLink) {
            setError('Please provide both slide link and video link.');
            return;
        }

        try {
            if (!docId) {
                throw new Error('Document ID not found');
            }

            const registrationDoc = doc(db, 'registrations', docId);
            await updateDoc(registrationDoc, {
                slideLink: slideLink,
                videoLink: videoLink,
                isSubmitted: true
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error("Error updating document: ", error);
            setError('Failed to submit. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const PageWrapper = ({ children }) => (
        <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10 py-12">
            <img src={bg2} alt="" className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover" />
            <img src={bg} alt="" className="hidden sm:block absolute w-full h-full object-cover" />
            <img src={text} alt="" className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px]" />
            
            {/* Logout button */}
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition duration-300 text-sm z-20"
            >
                Logout
            </button>
            

            {children}
            {/* go to dashboard */}
            <button
                onClick={() => navigate('/dashboard')}
                className="absolute top-20 right-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition duration-300 text-sm z-20"
            >
                Dashboard
            </button>
        </div>
    );

    if (isSubmitted) {
        return (
            <PageWrapper>
                <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg border border-gray-700 shadow-md rounded-3xl w-full max-w-md">
                    <h2 className="text-3xl text-white font-bold mb-6 text-center">Submission Successful</h2>
                    <p className="text-white text-center">You have successfully submitted your presentation and video links. You'll receive an update shortly.</p>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg border border-gray-700 shadow-md rounded-3xl w-full max-w-md">
                <h2 className="text-3xl text-white font-bold mb-6 text-center">Submit Your Presentation</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="slideLink" className="block text-sm font-medium text-white mb-2">Presentation Link (Google Slides)</label>
                        <input
                            type="url"
                            id="slideLink"
                            value={slideLink}
                            onChange={(e) => setSlideLink(e.target.value)}
                            placeholder="https://docs.google.com/presentation/d/..."
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="videoLink" className="block text-sm font-medium text-white mb-2">Video Link</label>
                        <input
                            type="url"
                            id="videoLink"
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </PageWrapper>
    );
};

export default SubmissionPage;