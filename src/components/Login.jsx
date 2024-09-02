import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { generateToken } from '../utils/jwtUtils';
import LoginNavbar from './loginNavbar';
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if(!user.emailVerified) {
        await auth.signOut();
        setError('Please verify your email before logging in.');
        return;
      }


      const registrationsQuery = query(
        collection(db, "registrations"),
        where("teamLeadEmail", "==", email)
      );

      const querySnapshot = await getDocs(registrationsQuery);

      if (querySnapshot.empty) {
        await auth.signOut();
        setError('No team registration found. Please check your credentials or register.');
        return;
      }

      const registrationData = querySnapshot.docs[0].data();

      if (registrationData.teamLeadEmail === email) {
        const token = generateToken(user.uid, true);
        localStorage.setItem('authToken', token);
        
        if (registrationData.country) {
          navigate('/dashboard');
        } else {
          navigate('/additional-details', { state: { email: registrationData.teamLeadEmail } });
        }
      } else {
        await auth.signOut();
        setError('Only team leads can log in. Please check with your team lead for access.');
      }
    } catch (error) {
      console.error("Detailed login error:", error);
      setError(`Failed to log in: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-custom-gradient relative overflow-hidden">
      <LoginNavbar className="z-20" />
      
      {/* Background images */}
      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <img src={bg2} alt="" className="absolute top-0 right-0 w-1/2 md:w-1/3 lg:w-1/4 h-full object-cover" />
      <img src={text} alt="" className="absolute top-20 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/3 max-w-2xl" />

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-md space-y-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-xl">
          <div>
            <h2 className="text-3xl font-bold text-center text-white mb-6">Team Lead Login</h2>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-t-lg mt-10 placeholder:text-black text-center rounded-lg relative block w-full px-0 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none mt-5 py-4  rounded-b-lg placeholder:text-black text-center  relative block w-full px-0 rounded-lg border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-white">
            Not Registered?{' '}
            <a href="/registration" className="font-medium text-purple-300 hover:text-purple-200">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;