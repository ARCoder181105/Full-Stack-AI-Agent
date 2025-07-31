import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChooseAuth() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 50);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div
        className={`w-full max-w-md bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 shadow-lg text-white transform transition-all duration-700 ease-out
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <h1 className="text-3xl font-semibold mb-3 tracking-wide text-center font-mono  text-blue-400">
          Welcome👋,
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Please choose how you'd like to continue
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/signup')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-medium py-2 rounded-lg transition-all transform hover:scale-105 hover:shadow-[0_0_12px_rgba(99,102,241,0.6)]"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/login')}
            className="relative group border border-gray-600 text-gray-300 py-2 rounded-lg transition-all transform hover:scale-105 hover:border-blue-600 hover:text-white overflow-hidden"
          >
            <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-all duration-300"></span>
            <span className="relative z-10">Log In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChooseAuth;
