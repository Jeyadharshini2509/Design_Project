import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Login from './Pages/Login';
import HeadmasterDashboard from './Pages/HeadmasterDashboard';
import FacultyDashboard from './Pages/FacultyDashboard';
import ParentDashboard from './Pages/ParentDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    if (authToken && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.clear();
  };

  // Function to control header rendering (hides it on the login page)
  function HeaderWithConditionalRender() {
    const location = useLocation(); // Access current location
    return location.pathname !== '/login' && (
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
    );
  }

  return (
    <Router>
      <HeaderWithConditionalRender /> {/* Header will be hidden on the login page */}

      <Routes>
        {/* Redirect to Dashboard if already logged in */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login handleLogin={handleLogin} />
          }
        />
        
        {/* Protected route for dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {role === 'headmaster' ? (
                <HeadmasterDashboard />
              ) : role === 'faculty' ? (
                <FacultyDashboard />
              ) : role === 'parent' ? (
                <ParentDashboard />
              ) : (
                <Navigate to="/login" />
              )}
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
