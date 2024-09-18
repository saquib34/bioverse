import { db } from '../firebase'; // Ensure this import is correct
import { collection, addDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

const sendConfirmationEmailWithRetry = async (email, name, transactionId,endpoint) => {
    const requestData = { email, name, transactionId, endpoint };
    console.log(requestData)

    const sendEmail = async (data) => {
        try {
            const response = await fetch(data.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Email sent successfully:', responseData);
                return { success: true, data: responseData };
            } else {
                const errorData = await response.text();
                console.error('Server error response:', errorData);
                return { success: false, error: `Server error: ${response.status}`, details: errorData };
            }
        } catch (error) {
            console.error('Error sending confirmation email:', error.message);
            return { success: false, error: error.message, details: error };
        }
    };

    const manageLocalStorage = (data, action) => {
        const key = 'pendingEmailRequests';
        let pendingRequests = JSON.parse(localStorage.getItem(key)) || [];

        if (action === 'add') {
            pendingRequests.push(data);
        } else if (action === 'remove') {
            pendingRequests = pendingRequests.filter(
                req => req.email !== data.email || req.transactionId !== data.transactionId || data.endpoint
            );
        }

        localStorage.setItem(key, JSON.stringify(pendingRequests));
    };

    const manageFirebase = async (data, action) => {
        try {
            if (action === 'add') {
                await addDoc(collection(db, 'failedEmailRequests'), data);
            } else if (action === 'remove') {
                const q = query(
                    collection(db, 'failedEmailRequests'),
                    where('email', '==', data.email),
                    where('transactionId', '==', data.transactionId)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });
            }
        } catch (error) {
            console.error(`Error ${action === 'add' ? 'storing in' : 'removing from'} Firebase:`, error);
        }
    };

    const handleFailedRequest = async (data, error) => {
        const failedRequest = {
            ...data,
            error: error.error,
            details: JSON.stringify(error.details),
            timestamp: new Date().toISOString()
        };
        manageLocalStorage(failedRequest, 'add');
        await manageFirebase(failedRequest, 'add');
    };

    try {
        // Attempt to send all pending requests
        const pendingRequests = JSON.parse(localStorage.getItem('pendingEmailRequests')) || [];
        for (const request of pendingRequests) {
            const result = await sendEmail(request);
            if (result.success) {
                manageLocalStorage(request, 'remove');
                await manageFirebase(request, 'remove');
            } else {
                // Update the error information for failed requests
                await handleFailedRequest(request, result);
            }
        }

        // Attempt to send the current request
        const result = await sendEmail(requestData);
        if (result.success) {
            return true; // Success
        } else {
            await handleFailedRequest(requestData, result);
            return false; // Failure, but stored for retry
        }
    } catch (error) {
        console.error('Unexpected error in sendConfirmationEmailWithRetry:', error);
        await handleFailedRequest(requestData, { error: 'Unexpected error', details: error });
        return false;
    }
};

export default sendConfirmationEmailWithRetry;