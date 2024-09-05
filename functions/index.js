const functions = require('firebase-functions');
const axios = require('axios');
const crypto = require('crypto');

const EASEBUZZ_KEY = import.meta.env.VITE_APP_EASEBUZZ_KEY;
const EASEBUZZ_SALT = import.meta.env.VITE_APP_EASEBUZZ_SALT;
const API_URL = "https://testpay.easebuzz.in/payment/initiateLink";

function generateHash(params) {
  const hashString = `${EASEBUZZ_KEY}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|||||||||${EASEBUZZ_SALT}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
}

exports.initiateEasebuzzPayment = functions.https.onCall(async (data, context) => {
  try {
    const paymentData = {
      ...data,
      key: EASEBUZZ_KEY,
      surl: 'https://bioverse.saquib.in/payment/success',
      furl: 'https://bioverse.saquib.in/payment/failure',
    };

    paymentData.hash = generateHash(paymentData);

    const response = await axios.post(API_URL, new URLSearchParams(paymentData).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw new functions.https.HttpsError('internal', 'Failed to initiate payment');
  }
});