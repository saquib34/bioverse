const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const axios = require('axios');
const crypto = require('crypto');

const EASEBUZZ_KEY = import.meta.env.VITE_APP_EASEBUZZ_KEY;
const EASEBUZZ_SALT = import.meta.env.VITE_APP_EASEBUZZ_SALT;
const API_URL = "https://testpay.easebuzz.in/payment/initiateLink";

function generateHash(params) {
    const hashString = `${EASEBUZZ_KEY}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|||||||||${EASEBUZZ_SALT}`;
    return crypto.createHash('sha512').update(hashString).digest('hex');
  }
  
  exports.initiateEasebuzzPayment = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
      if (request.method !== 'POST') {
        return response.status(405).send('Method Not Allowed');
      }
  
      try {
        const paymentData = {
          ...request.body,
          key: EASEBUZZ_KEY,
          surl: 'https://bioverse.saquib.in/payment/success',
          furl: 'https://bioverse.saquib.in/payment/failure',
        };
  
        paymentData.hash = generateHash(paymentData);
  
        const easebuzzResponse = await axios.post(API_URL, new URLSearchParams(paymentData).toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
  
        response.json(easebuzzResponse.data);
      } catch (error) {
        console.error('Error initiating payment:', error);
        response.status(500).json({ status: 0, error: 'Failed to initiate payment' });
      }
    });
  });