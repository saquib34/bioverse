import React, { useState, useEffect } from 'react';

const ComingSoonPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const hackathonDate = new Date("2024-09-28T00:00:00").getTime();
      const now = new Date().getTime();
      const difference = hackathonDate - now;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-indigo-600">Bio verse India</h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-700">First Hackathon</h2>
        <div className="text-2xl md:text-3xl font-bold mb-8 text-center text-indigo-800">Coming Soon</div>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center bg-indigo-100 rounded-lg p-2">
              <div className="text-xl md:text-2xl font-bold text-indigo-800">{value}</div>
              <div className="text-xs md:text-sm uppercase text-indigo-600">{unit}</div>
            </div>
          ))}
        </div>
        
        <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300">
          Registeration Coming Soon
        </button>
      </div>
    </div>
  );
};

export default ComingSoonPage;