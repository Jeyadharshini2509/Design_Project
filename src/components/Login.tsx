import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { School, Users, UserRound } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    const success = login(email, password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <School className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Special Education Progress Tracker</h1>
          <p className="text-gray-600 mt-2">Sign in to access student progress reports</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 py-3 px-4 border"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 py-3 px-4 border"
              placeholder="Enter your password"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            {/* <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
            </div> */}
          </div>
{/*           
          <div className="mt-6 grid grid-cols-1 gap-3">
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="text-sm text-gray-700">
                  <strong>Faculty:</strong> faculty@example.com / password123
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div className="flex items-center">
                <School className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="text-sm text-gray-700">
                  <strong>Headmaster:</strong> headmaster@example.com / password123
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div className="flex items-center">
                <UserRound className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="text-sm text-gray-700">
                  <strong>Parent:</strong> parent@example.com / password123
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;