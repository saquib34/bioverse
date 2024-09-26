import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const API_URL = import.meta.env.VITE_APP_EASEBUZZ_LINK;
const EASEBUZZ_KEY = import.meta.env.VITE_APP_EASEBUZZ_KEY;

const EasebuzzPayment = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { email,firstname,phone,amount } = state || {};
 

    useEffect(() => {
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js";
            script.async = true;
            script.onload = initiatePayment;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        loadScript();
    }, []);

    const saveSuccessfulTransaction = async (txid) => {
        const docRef = doc(db, 'registrations', email);
        await setDoc(docRef, { succesTx: txid }, { merge: true });
    };

    const saveFailedTransaction = async (txid) => {
        const docRef = doc(db, 'registrations', email);
        const currentDate = new Date().toISOString();
        await updateDoc(docRef, {
            [`failedTx.${currentDate}`]: txid
        });
    };
   const initiatePayment = async () => {


        try {
 
            
            const txnid = 'TXN' + Date.now()+Math.floor(Math.random() * 1000);
            const paymentData = {
                txnid,
                amount: amount,
                firstname: firstname,
                email: email,

                phone: phone,
                productinfo: 'Bioverse Registration',
                surl: 'https://bioverse.asia/payment/success',
                furl: 'https://bioverse.asia/payment/failure'
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
            }

            let result;
            try {
                result = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response as JSON:', responseText);
                throw new Error('Invalid response from server');
            }

            if (result.status === 1) {
               await proceedToPayment(result.data);
            } else {
                setError(`Payment initiation failed: ${result.data}`);
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            setError(`Error initiating payment: ${error.message}`);
        }
    };

    const proceedToPayment = async (access_key) => {
        if (window.EasebuzzCheckout) {
            if (!EASEBUZZ_KEY) {
                console.error('Easebuzz key is not set in environment variables');
                setError('Payment configuration error. Please contact support.');
                return;
            }
            
            const easebuzzCheckout = new window.EasebuzzCheckout(EASEBUZZ_KEY, 'prod');
            const options = {
                access_key: access_key,
                onResponse: async (response) => {
                    if (response.status === 'success') {
                        console.log('Payment successful:', response);
                        // if(response.amount === '100')
                        // {
                        //     return;
                        // }
                        await saveSuccessfulTransaction(response.txnid);
                        navigate('/payment/success', { state: { response } });
                    } else {
                        console.error('Payment failed:', response);
                        await saveFailedTransaction(response.txnid);
                        navigate('/payment/failure', { state: { response } });
                    }
                },
                theme: "#123456"
            };
            easebuzzCheckout.initiatePayment(options);
        } else {
            console.error('Easebuzz SDK not loaded');
            setError('Payment gateway not available. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        </div>
    );
};

export default EasebuzzPayment;