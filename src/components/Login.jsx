import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { generateToken } from '../utils/jwtUtils';
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";
import AdditionalDetails from './AdditionalDetails';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // console.log$&
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // console.log$&

      const registrationsQuery = query(
        collection(db, "registrations"),
        where("teamLeadEmail", "==", email)
      );

      // console.log$&
      const querySnapshot = await getDocs(registrationsQuery);

      if (querySnapshot.empty) {
        // console.log$&
        await auth.signOut();
        setError('No team registration found for this email. Please check your credentials or register if you haven\'t already.');
        return;
      }

      // console.log$&
      const registrationData = querySnapshot.docs[0].data();

      if (registrationData.teamLeadEmail === email) {
        const token = generateToken(user.uid, true);
        localStorage.setItem('authToken', token);
        
        if (registrationData.country) {
          navigate('/dashboard');
        } else {
          // console.log$&

          navigate('/additional-details',registrationData.teamLeadEmail);
        }
      } else {
        // console.log$&
        await auth.signOut();
        setError('Only team leads can log in. Please check with your team lead for access.');
      }
    } catch (error) {
      console.error("Detailed login error:", error);
      setError(`Failed to log in: ${error.message}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10">
      <img src={bg2} alt="" className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover" />
      <img src={bg} alt="" className="hidden sm:block absolute w-full h-full object-cover" />
      <img src={text} alt="" className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px]" />

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-white bg-opacity-40 backdrop-blur-xs border border-gray-200 shadow-md rounded-3xl max-w-md w-full">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Team Lead Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border placeholder-gray-900 placeholder:text-sm placeholder:font-semibold bg-gray-300 bg-opacity-40 backdrop-blur-xs rounded-3xl"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border placeholder-gray-900 placeholder:text-sm placeholder:font-semibold bg-gray-300 bg-opacity-40 backdrop-blur-xs rounded-3xl"
            />
          </div>
          <button type="submit" className="w-full p-3 bg-purple-900 text-white rounded-3xl hover:bg-purple-300 hover:text-black">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Not Registered <a href="/registration" className="text-purple-300 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;