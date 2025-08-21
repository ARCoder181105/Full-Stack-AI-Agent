import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket } from "lucide-react";

function CheckAuth({ children, protected: isProtectedRoute }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isProtectedRoute) {
      if (!token) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    } else {
      if (token) {
        navigate("/tickets");
      } else {
        setLoading(false);
      }
    }
  }, [navigate, isProtectedRoute]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          {/* Logo with animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg animate-pulse">
                <Ticket className="h-10 w-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-blue-400 rounded-2xl animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Loading text */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading TicketPro</h2>
          <p className="text-gray-600 mb-6">Please wait while we prepare your experience</p>

          {/* Loading spinner */}
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default CheckAuth;