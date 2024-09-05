import React, { useState } from 'react';
import axios from 'axios';

const EASEBUZZ_KEY = "DTDZKG0DFU"; // Be cautious about exposing this key
const API_URL = "https://testpay.easebuzz.in/payment/initiateLink";

const EasebuzzPayment = () => {
  const [formData, setFormData] = useState({
    txnid: '',
    amount: '',
    firstname: '',
    email: '',
    phone: '',
    productinfo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        ...formData,
        key: EASEBUZZ_KEY,
        surl: 'https://bioverse.saquib.in/payment/success',
        furl: 'https://bioverse.saquib.in/payment/failure',
      };

      const response = await axios.post(
        API_URL, 
        new URLSearchParams(paymentData).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.status === 1) {
        // Redirect to Easebuzz payment page
        window.location.href = response.data.data;
      } else {
        setError(response.data.error || 'Payment initiation failed');
      }
    } catch (error) {
      setError('An error occurred while initiating the payment');
      console.error('Payment initiation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Easebuzz Payment</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div>
          <label htmlFor="txnid" className="block text-sm font-medium text-gray-700">
            Transaction ID
          </label>
          <input
            type="text"
            id="txnid"
            name="txnid"
            value={formData.txnid}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        {/* Add other form fields here */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Processing...' : 'Initiate Payment'}
        </button>
      </form>
    </div>
  );
};

export default EasebuzzPayment;