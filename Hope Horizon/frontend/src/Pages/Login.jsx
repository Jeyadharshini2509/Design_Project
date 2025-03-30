import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before the request

    try {
      const response = await fetch('http://localhost:2000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data and token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.user.role);

        // Pass the user role to parent App's handleLogin (if needed)
        handleLogin(data.user.role);

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="Heading">Login</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          className="email-place"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="password-place"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
