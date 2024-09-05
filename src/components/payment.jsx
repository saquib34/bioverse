import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

const EasebuzzDirectPayment = () => {
  const [formData, setFormData] = useState({
    txnid: '',
    amount: '',
    productinfo: '',
    firstname: '',
    phone: '',
    email: '',
  });
  const [paymentResponse, setPaymentResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const functions = getFunctions();
      const initiatePayment = httpsCallable(functions, 'initiateEasebuzzPayment');
      const result = await initiatePayment(formData);
      const data = result.data;

      setPaymentResponse(data);

      if (data.status === 1) {
        // Redirect to Easebuzz payment page
        window.location.href = data.data;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentResponse({ status: 0, error: 'Failed to initiate payment' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Easebuzz Direct Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="txnid"
          value={formData.txnid}
          onChange={handleChange}
          required
          placeholder="Transaction ID"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
          placeholder="Amount"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="productinfo"
          value={formData.productinfo}
          onChange={handleChange}
          required
          placeholder="Product Info"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
          placeholder="First Name"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Phone Number"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Initiate Payment
        </button>
      </form>

      {paymentResponse && (
        <div className={`mt-4 p-4 rounded-md ${paymentResponse.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {paymentResponse.status === 1 
            ? 'Payment initiated successfully. Redirecting to payment page...' 
            : `Payment initiation failed: ${paymentResponse.error}`}
        </div>
      )}
    </div>
  );
};

export default EasebuzzDirectPayment;