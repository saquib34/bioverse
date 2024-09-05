import React from 'react';
import { useLocation } from 'react-router-dom';
import { XCircleIcon } from 'lucide-react';

const FailurePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract payment details from URL parameters
  const txnid = searchParams.get('txnid') || 'N/A';
  const amount = searchParams.get('amount') || 'N/A';
  const error = searchParams.get('error') || 'An unknown error occurred';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Failed</h2>
          <p className="mt-2 text-sm text-gray-600">
            We're sorry, but there was an issue processing your payment.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-red-700">Transaction Details</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Transaction ID:</span>
              <span className="text-sm text-gray-900">{txnid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Amount:</span>
              <span className="text-sm text-gray-900">₹{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Error:</span>
              <span className="text-sm text-red-600">{error}</span>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <button
            onClick={() => window.location.href = '/payment'}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailurePage;