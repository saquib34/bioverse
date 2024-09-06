import React, { useState, useEffect } from 'react';
import { useNavigate,} from 'react-router-dom';

const API_URL = import.meta.env.VITE_APP_EASEBUZZ_LINK;
const EASEBUZZ_KEY = import.meta.env.VITE_APP_EASEBUZZ_KEY;

const EasebuzzPayment = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
   

        const script = document.createElement('script');
        script.src = "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const initiatePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            const txnid = 'TXN' + Date.now();
            const amount = '1.1';
            const firstname = 'saquib';
            const email = 'shadmanshahin6@gmail.com';
            const phone = '7070927837';
            const productinfo = '1223';
            const surl = 'https://bioverse.saquib.in/payment/success';
            const furl = 'https://bioverse.saquib.in/payment/failure';

            const paymentData = {
                txnid,
                amount,
                firstname,
                email,
                phone,
                productinfo,
                surl,
                furl
            };

            ;

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            ;
            const responseText = await response.text();
            ;

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

            ;

            if (result.status === 1) {
                proceedToPayment(result.data);
            } else {
                setError(`Payment initiation failed: ${result.data}`);
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            setError(`Error initiating payment: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    const proceedToPayment = (access_key) => {
    
        
        if (window.EasebuzzCheckout) {
            if (!EASEBUZZ_KEY) {
                console.error('Easebuzz key is not set in environment variables');
                setError('Payment configuration error. Please contact support.');
                return;
            }
            
            ;
            const easebuzzCheckout = new window.EasebuzzCheckout(EASEBUZZ_KEY, 'test');
            const options = {
                access_key: access_key,
                onResponse: (response) => {
                    ;
                    if (response.status === 'success') {
                        console.log('Payment successful:', response);
                        navigate('/payment/success', { state: { response } });
                    } else {
                        console.error('Payment failed:', response);
                        navigate('/payment/failure', { state: { response } });
                    }
                },
                theme: "#123456"
            }
            easebuzzCheckout.initiatePayment(options);
        } else {
            console.error('Easebuzz SDK not loaded');
            setError('Payment gateway not available. Please try again later.');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button 
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out disabled:opacity-50"
                onClick={initiatePayment}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Proceed to Pay'}
            </button>
            {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        </div>
    );
}

export default EasebuzzPayment;