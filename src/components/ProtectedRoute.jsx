// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // Check if user is already logged in
    const currentUser = netlifyIdentity.currentUser();
    setUser(currentUser);
    setLoading(false);

    // Listen for login/logout events
    netlifyIdentity.on('login', user => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
    });

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const handleLogin = () => {
    netlifyIdentity.open('login');
  };

  const handleLogout = () => {
    netlifyIdentity.logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-secondary-dark">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-secondary-dark">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">BACHELOR CUP 2026</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-700 mb-8">
            This site is private. Please log in to continue.
          </p>
          <button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary-dark text-black font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform 
hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Optional: Add logout button to header */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
}
