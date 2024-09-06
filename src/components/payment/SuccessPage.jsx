import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from 'lucide-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const SuccessPage = (response) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const paymentResponse = location.state;
  const searchParams = new URLSearchParams(paymentResponse);

  // Extract payment details from URL parameters
  const txnid = searchParams.get('txnid') || 'N/A';
  const amount = searchParams.get('amount') || 'N/A';
  const status = searchParams.get('status') || 'Success';

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        const registrationsRef = collection(db, 'registrations');
        const q = query(registrationsRef, where("teamLeadEmail", "==", email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setIsAuthenticated(true);
          const registrationDoc = querySnapshot.docs[0];
          const userDoc = querySnapshot.docs[0];
          const data = userDoc.data();
          await updateDoc(registrationDoc.ref, {
            pay: true,          
            payment: {
              txnid,
              amount,
              status,
            },
          });
        } else {
          navigate('/login', { state: { from: location } });
        }
      } else {
        navigate('/login', { state: { from: location } });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, location, txnid, amount, status]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // This will prevent the content from flashing before redirect
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your payment. Your transaction was successful.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-green-700">Transaction Details</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Transaction ID:</span>
              <span className="text-sm text-gray-900">{txnid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Amount Paid:</span>
              <span className="text-sm text-gray-900">₹{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Status:</span>
              <span className="text-sm text-green-600">{status}</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;