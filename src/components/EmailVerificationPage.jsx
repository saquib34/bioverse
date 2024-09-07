import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, applyActionCode, checkActionCode } from 'firebase/auth';
import app from '../config/firebase';
import { CheckCircle, XCircle, Loader, Home } from 'lucide-react';

const auth = getAuth(app);

function EmailVerificationPage() {
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const actionCode = urlParams.get('oobCode');

    if (actionCode) {
      verifyEmail(actionCode);
    } else {
      setStatus('error');
      setError('No verification code found in the URL.');
    }
  }, [location]);

  const verifyEmail = async (actionCode) => {
    try {
      
      // First, check the action code
      const checkResult = await checkActionCode(auth, actionCode);
      

      // Extract email based on the operation type
      let extractedEmail;
      switch (checkResult.operation) {
        case 'VERIFY_EMAIL':
          extractedEmail = checkResult.data.email || auth.currentUser?.email;
          break;
        case 'PASSWORD_RESET':
          extractedEmail = checkResult.data.email;
          break;
        case 'RECOVER_EMAIL':
          extractedEmail = checkResult.data.previousEmail;
          break;
        case 'VERIFY_AND_CHANGE_EMAIL':
          extractedEmail = checkResult.data.email;
          break;
        default:
          throw new Error(`Unsupported operation: ${checkResult.operation}`);
      }

      if (!extractedEmail) {
        throw new Error('Email not found in action code info or current user');
      }

      setEmail(extractedEmail);

   
      await applyActionCode(auth, actionCode);

      setStatus('success');
      await sendConfirmationEmail(extractedEmail);
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setError(error.message || 'An error occurred during email verification');
    }
  };

  const sendConfirmationEmail = async (email) => {
    try {
      const response = await fetch(import.meta.env.VITE_APP_CONFORMATION_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:{ email: email,
          name: 'Bioverse',
         },
      });
 

      if (response.ok) {
        const data = await response.json();
    
      } else {
        const errorData = await response.text();
        console.error('Server error response:', errorData);
        throw new Error(`Failed to send confirmation email. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error.message);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.error('This may indicate a network error or that the server is not reachable.');
      }
      // We're not setting an error state here as the email verification was successful
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
        return (
          <>
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Email Verified!</h2>
            <p className="mt-2 text-gray-600">Your email has been successfully verified. Welcome to Bioverse!</p>
            {email && <p className="mt-2 text-sm text-gray-500">Verified email: {email}</p>}
            <p className="mt-2 text-sm text-gray-500">A confirmation email has been sent to your inbox.</p>
          </>
        );
      case 'error':
        return (
          <>
            <XCircle className="w-16 h-16 text-red-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Verification Failed</h2>
            <p className="mt-2 text-gray-600">We couldn't verify your email. The link may be invalid or expired.</p>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
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