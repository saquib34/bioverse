import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_APP_EASEBUZZ_LINK;
const EASEBUZZ_KEY = import.meta.env.VITE_APP_EASEBUZZ_KEY;

const EasebuzzPayment = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const initiatePayment = async () => {
        try {
            const txnid = 'TXN' + Date.now();
            const paymentData = {
                txnid,
                amount: '250',
                firstname: 'saquib',
                email: 'shadmanshahin6@gmail.com',
                phone: '7070927837',
                productinfo: '1223',
                surl: 'https://bioverse.saquib.in/payment/success',
                furl: 'https://bioverse.saquib.in/payment/failure'
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
                proceedToPayment(result.data);
            } else {
                setError(`Payment initiation failed: ${result.data}`);
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            setError(`Error initiating payment: ${error.message}`);
        }
    };

    const proceedToPayment = (access_key) => {
        if (window.EasebuzzCheckout) {
            if (!EASEBUZZ_KEY) {
                console.error('Easebuzz key is not set in environment variables');
                setError('Payment configuration error. Please contact support.');
                return;
            }
            
            const easebuzzCheckout = new window.EasebuzzCheckout(EASEBUZZ_KEY, 'test');
            const options = {
                access_key: access_key,
                onResponse: (response) => {
                    if (response.status === 'success') {
                        console.log('Payment successful:', response);
                        navigate('/payment/success', { state: { response } });
                    } else {
                        console.error('Payment failed:', response);
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