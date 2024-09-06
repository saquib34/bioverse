import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, applyActionCode } from 'firebase/auth';
import app from '../config/firebase'; // Corrected import statement
import { CheckCircle, XCircle, Loader, Home } from 'lucide-react'; // Make sure to install lucide-react

const auth = getAuth(app);

function EmailVerificationPage() {
  const [status, setStatus] = useState('verifying');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const actionCode = urlParams.get('oobCode');

    if (actionCode) {
      verifyEmail(actionCode);
    } else {
      setStatus('error');
    }
  }, [location]);

  const verifyEmail = async (actionCode) => {
    try {
      await applyActionCode(auth, actionCode);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const sendConfirmationEmail = async () => {
    if (user) {
      try {
        const response = await fetch('http://210.18.155.129:3000/send-confirmation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }),
        });

        if (response.ok) {
          console.log('Confirmation email sent successfully');
        } else {
          throw new Error('Failed to send confirmation email');
        }
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      }
    }
  };

  const handleReturn = () => {
    navigate('/login');
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <>
            <Loader className="w-16 h-16 text-blue-500 animate-spin" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Verifying Your Email</h2>
            <p className="mt-2 text-gray-600">Please wait while we confirm your email address...</p>
          </>
        );
      case 'success':
        try{
          sendConfirmationEmail();
        }
        catch(error){
          console.error("Error sending confirmation email:", error);
        }
        const timer = setTimeout(() => {
          navigate('/login');
          clearTimeout(timer);
        }
        , 3000);
      

        return (
          <>
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Email Verified!</h2>
            <p className="mt-2 text-gray-600">Your email has been successfully verified. Welcome to Bioverse!</p>
          </>
        );
      case 'error':
        return (
          <>
            <XCircle className="w-16 h-16 text-red-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Verification Failed</h2>
            <p className="mt-2 text-gray-600">We couldn't verify your email. The link may be invalid or expired.</p>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          {renderContent()}
        </div>
        <div className="mt-8">
          <button
            onClick={handleReturn}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center"
          >
            <Home className="mr-2" size={20} />
            Return to Login Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationPage;