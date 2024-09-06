// paymentUtils.js
const API_URL = import.meta.env.VITE_APP_EASEBUZZ_LINK;
const EASEBUZZ_KEY = import.meta.env.VITE_APP_EASEBUZZ_KEY;

export const initiatePayment = async () => {
    setLoading(true);
    setError(null);

    try {
        const txnid = 'TXN' + Date.now();
        const amount = '250';
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
            proceedToPayment(result.data, setError, navigate);
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

const proceedToPayment = (access_key, setError, navigate) => {
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
}
