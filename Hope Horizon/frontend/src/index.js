import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Adjust the path if necessary
import './Styles/Login.css'; // Example for importing global CSS

const root = ReactDOM.createRoot(document.getElementById('root')); // Connects to index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
