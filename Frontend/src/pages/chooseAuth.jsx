import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Ticket, Shield, Users } from 'lucide-react';

function ChooseAuth() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Hero Section */}
        <div
          className={`text-center mb-8 transform transition-all duration-700 ease-out
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
              <Ticket className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to TicketPro
          </h1>
          <p className="text-gray-600 text-sm">
            Professional ticket management made simple
          </p>
        </div>

        {/* Features */}
        <div
          className={`grid grid-cols-3 gap-4 mb-8 transform transition-all duration-700 ease-out delay-200
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="text-center">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 mb-2">
              <Shield className="h-5 w-5 text-blue-600 mx-auto" />
            </div>
            <p className="text-xs text-gray-600">Secure</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 mb-2">
              <Users className="h-5 w-5 text-green-600 mx-auto" />
            </div>
            <p className="text-xs text-gray-600">Collaborative</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 mb-2">
              <ArrowRight className="h-5 w-5 text-purple-600 mx-auto" />
            </div>
            <p className="text-xs text-gray-600">Efficient</p>
          </div>
        </div>

        {/* Auth Options */}
        <div
          className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform transition-all duration-700 ease-out delay-300
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="space-y-4">
            <button
              onClick={() => navigate('/signup')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              Sign In to Account
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseAuth;