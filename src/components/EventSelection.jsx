import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from './loginNavbar';
import sendConfirmationEmailWithRetry from './sendConfirmationEmailWithRetry';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db, } from '../firebase';



const EventSelection = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showThanks, setShowThanks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const retryPendingEmails = async () => {
        const pendingRequests = JSON.parse(localStorage.getItem('pendingEmailRequests')) || [];
        const updatedPendingRequests = [];

        for (const request of pendingRequests) {
            const isDataStillValid = await checkDataValidity(request);
            
            if (isDataStillValid) {
                try {
                    await sendConfirmationEmailWithRetry(request.email, request.name, request.transactionId, request.endpoint);
                } catch (error) {
                    console.error('Failed to send email:', error);
                    updatedPendingRequests.push(request);
                }
            }
        }

        localStorage.setItem('pendingEmailRequests', JSON.stringify(updatedPendingRequests));
    };

    retryPendingEmails();
}, []);

async function checkDataValidity(request) {
  // Check if any required field is undefined
  const requiredFields = ['email', 'name', 'transactionId', 'endpoint'];
  for (const field of requiredFields) {
      if (request[field] === undefined) {
          console.log(`Invalid request: ${field} is undefined`);
          return false;
      }
  }

  // Add any additional validity checks here if needed
  // For example, you might want to check if the email is in a valid format
  // or if the transactionId matches a specific pattern

  return true;
}

  const handleSubmit =async  (e) => {
    e.preventDefault();
    if (selectedEvent === 'panel') {
      // Handle panel discussion registration
      // console.log('Panel Discussion Registration:', { name, email });
      try {
        // Store registration data in Firebase
        const docRef = await  addDoc(collection(db, "panelRegistrations"), {
          name,
          email,
          registrationDate: new Date()
        });
        // console.log("Panel Discussion Registration stored with ID: ", docRef.id);
  
        // Send confirmation email
       await  sendConfirmationEmailWithRetry(email, name, 'txn', 'https://api.saquib.in/panel-discussion');
        
        // Update UI
        setShowThanks(true);
      } catch (error) {
        console.error("Error registering for panel discussion: ", error);
        // Handle error (e.g., show error message to user)
      }
    } else if (selectedEvent === 'hackathon') {
      navigate('/registration');
    } else if (selectedEvent === 'paper') {
      navigate('/paper-presentation-registration');
    }
  };

  const renderEventDetails = () => {
    switch (selectedEvent) {
      case 'panel':
        return (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Panel Discussion Details:</h4>
            <p>Join our expert-led discussions on cutting-edge biotechnology topics.</p>
            <p>Registration is free for all participants. Sign up now to reserve your spot!</p>
            <h4 className="font-semibold mt-4">Name:</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name for Panel Discussion"
              className="w-full p-2 border rounded mt-2"
              required
            />


            <h4 className="font-semibold mt-4">Email Address:</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for Panel Discussion"
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>
        );
      case 'hackathon':
        return (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2">BioHack Challenge Details:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Open to both international and Indian participants</li>
              <li>Registration fee: ₹397 or equivalent in USD</li>
              <li>Accommodation and meals provided for all participants</li>
              <li>48-hour intensive biotechnology innovation challenge</li>
            </ul>
          </div>
        );
      case 'paper':
        return (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold mb-2">Research Symposium Details:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Exclusively for students enrolled in Indian institutions</li>
              <li>Registration fee: ₹150</li>
              <li>Participants are responsible for their own accommodation and meals</li>
              <li>Opportunity to present and discuss cutting-edge research in biotechnology</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
<>
<div className="bg-blue-900 text-white p-4 z-20">
<LoginNavbar />
</div>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50 font-sans text-black">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
          body, html {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-8 text-center">
            BioVerse 2024: Explore, Innovate, Transform
          </h1>
          
          {!showThanks ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block p-4 bg-blue-50 rounded-lg cursor-pointer hover:shadow-md transition-all">
                  <input
                    type="radio"
                    value="panel"
                    checked={selectedEvent === 'panel'}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`text-center ${selectedEvent === 'panel' ? 'text-blue-600' : 'text-black'}`}>
                    <h3 className="text-lg font-semibold">Panel Discussion</h3>
                  </div>
                </label>
                
                <label className="block p-4 bg-green-50 rounded-lg cursor-pointer hover:shadow-md transition-all">
                  <input
                    type="radio"
                    value="hackathon"
                    checked={selectedEvent === 'hackathon'}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`text-center ${selectedEvent === 'hackathon' ? 'text-green-600' : 'text-black'}`}>
                    <h3 className="text-lg font-semibold">BioHack Challenge</h3>
                  </div>
                </label>
                
                <label className="block p-4 bg-yellow-50 rounded-lg cursor-pointer hover:shadow-md transition-all">
                  <input
                    type="radio"
                    value="paper"
                    checked={selectedEvent === 'paper'}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`text-center ${selectedEvent === 'paper' ? 'text-yellow-600' : 'text-black'}`}>
                    <h3 className="text-lg font-semibold">Research Symposium</h3>
                  </div>
                </label>
              </div>
              
              {renderEventDetails()}
              
              <button
                type="submit"
                className="w-full p-3 rounded-lg text-white text-lg font-semibold bg-blue-800 hover:bg-yellow-800 transition-all"
                disabled={!selectedEvent || (selectedEvent === 'panel' && !email)}
              >
                {selectedEvent === 'panel' ? 'Register for Panel' : 'Proceed to Registration'}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Thank you for registering!</h2>
              <p>Our team will contact you soon with more details about the Panel Discussion.</p>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Why Join BioVerse 2024?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Engage with leading experts in biotechnology and genomics</li>
              <li>Participate in cutting-edge discussions and workshops</li>
              <li>Network with peers and potential collaborators</li>
              <li>Explore the latest advancements in biological sciences</li>
              <li>Gain insights into emerging trends and future directions in the field</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        <p>&copy; 2024 BioVerse Events. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="text-blue-400 hover:text-blue-300 mx-2">Privacy Policy</a>
          <a href="/terms" className="text-blue-400 hover:text-blue-300 mx-2">Terms of Service</a>
        </div>
      </footer>
    </div>
    </>
  );
};

export default EventSelection;