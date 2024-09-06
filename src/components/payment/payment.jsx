import React, { useState, useEffect } from 'react';
import sha512 from 'crypto-js/sha512';
import { useNavigate } from 'react-router-dom';

const EASEBUZZ_KEY = "2PBP7IABZ2";
const API_URL = "/api/payment/initiateLink";
const EASEBUZZ_SALT = "DAH88E3UWQ";

const EasebuzzPayment = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [accessKey, setAccessKey] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Load Easebuzz SDK
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

            // Generate hash
            const hashString = `${EASEBUZZ_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${EASEBUZZ_SALT}`;
            console.log('Hash string:', hashString);
            const hash = sha512(hashString).toString();
            console.log('Generated hash:', hash);

            const formData = new URLSearchParams();
            formData.append('key', EASEBUZZ_KEY);
            formData.append('txnid', txnid);
            formData.append('amount', amount);
            formData.append('firstname', firstname);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('productinfo', productinfo);
            formData.append('surl', surl);
            formData.append('furl', furl);
            formData.append('hash', hash);

            console.log('Form data:', formData.toString());

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('API response:', result);

            if (result.status === 1) {
                setAccessKey(result.data);
                proceedToPayment(result.data);
            } else {
                setError(`Payment initiation failed: ${result.data}`);
                console.error('Error details:', result);
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
            const easebuzzCheckout = new window.EasebuzzCheckout(EASEBUZZ_KEY, 'test'); // Use 'prod' for production
            const options = {
                access_key: access_key,
                onResponse: (response) => {
                    console.log(response);
                    if (response.txnid && response.status === 'success') {
                        navigate('/payment/success');
                    } else {
                        navigate('/payment/failure');
                    }

                    // Handle the payment response here
                },
                theme: "#123456" // color hex
            }
            easebuzzCheckout.initiatePayment(options);
        } else {
            console.error('Easebuzz SDK not loaded');
            setError('Payment gateway not available. Please try again later.');
        }
    }

    return (
        <div>
            <button 
                className="btn btn-primary" 
                onClick={initiatePayment}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Proceed to Pay'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default EasebuzzPayment;