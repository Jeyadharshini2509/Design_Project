import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './Pages/Login';
import HeadmasterDashboard from './Pages/HeadmasterDashboard';
import FacultyDashboard from './Pages/FacultyDashboard';
import ParentDashboard from './Pages/ParentDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Store user role after login

  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);  // Assign role after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        
        {/* Role-based Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              role === 'headmaster' ? (
                <HeadmasterDashboard />
              ) : role === 'faculty' ? (
                <FacultyDashboard />
              ) : role === 'parent' ? (
                <ParentDashboard />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect any unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
