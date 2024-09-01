// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        isTeamLead: false,
        additionalDetailsProvided: false
      });

      navigate('/registration');
    } catch (error) {
      setError('Failed to create an account. ' + error.message);
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10">
      <img src={bg2} alt="" className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover" />
      <img src={bg} alt="" className="hidden sm:block absolute w-full h-full object-cover" />
      <img src={text} alt="" className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px]" />

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-300 bg-opacity-40 backdrop-blur-xs border border-gray-200 shadow-md rounded-3xl max-w-md w-full">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Already have an account? <a href="/login" className="text-purple-300 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;