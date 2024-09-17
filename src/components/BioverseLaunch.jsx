import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BioverseLaunch = () => {
  const [launch, setLaunch] = useState(false);
  const [blast, setBlast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (launch) {
      const blastTimer = setTimeout(() => setBlast(true), 2000);
      const loadingTimer = setTimeout(() => setLoading(true), 2000);
      const thankYouTimer = setTimeout(() => {
        setLoading(false);
        setShowThankYou(true);
      }, 4000);

      return () => {
        clearTimeout(blastTimer);
        clearTimeout(loadingTimer);
        clearTimeout(thankYouTimer);
      };
    }
  }, [launch]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-full bg-custom-gradient overflow-hidden relative">
      {/* Stars */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div className="flex flex-col items-center justify-center h-full">
        <h1 className={`text-8xl font-bold text-white mb-8 animate-fade-in-out ${launch ? 'animate-size-increase' : ''}`}>
          Bioverse Hackathon
        </h1>

        {/* Rocket and Blast */}
        <div className={`relative ${launch ? 'animate-launch' : ''}`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`w-32 h-32 ${blast ? 'hidden' : ''}`}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" className="text-red-500" />
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" className="text-gray-300" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" className="text-orange-400" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" className="text-orange-400" />
          </svg>

          {/* Blast Effect */}
          {blast && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-64 h-64 bg-yellow-500 rounded-full animate-blast-inner"></div>
              <div className="w-80 h-80 bg-orange-500 rounded-full animate-blast-outer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          )}

          {/* Rocket Trail */}
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${launch && !blast ? 'animate-trail' : 'hidden'}`}>
            <div className="w-1 h-10 bg-gradient-to-t from-transparent to-orange-500 rounded-full"></div>
          </div>
        </div>

        {/* Launch Button */}
        <button
          onClick={() => setLaunch(true)}
          disabled={launch}
          className={`mt-8 px-6 py-3 bg-green-500 text-white rounded-full text-xl font-semibold 
                     hover:bg-green-600 transition-all duration-300 
                     ${launch ? 'opacity-0' : 'animate-bounce'}`}
        >
          Launch
        </button>
      </div>

      {/* Circular Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-24 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div className="text-white text-xl mt-4 font-bold animate-fade-in-out">Updating DNS</div>
            <div className="text-white text-xl mt-2 animate-fade-in-out">Checking All</div>
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative flex flex-col items-center">
            <div className="text-white text-4xl font-bold animate-fade-in-out">Thank You!</div>
            <button
              onClick={handleGoHome}
              className="mt-4 px-6 py-3 bg-darkorchid text-white rounded-lg text-xl font-semibold hover:bg-darkorchid-dark transition-all duration-300"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BioverseLaunch;
