import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Header.css';

const Header = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();  // Logout function passed as a prop
    navigate('/login');  // Redirect to login after logout
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Hope Horizon</h1>
      </div>

      {isAuthenticated && (
        <nav className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      )}

      {isAuthenticated && (
        <div className="header-right">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
