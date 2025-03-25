import React from 'react';
import '../Styles/HeadmasterDashboard.css';

const HeadmasterDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Headmaster Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>150</p>
        </div>

        <div className="card">
          <h3>Total Faculty</h3>
          <p>20</p>
        </div>

        <div className="card">
          <h3>New Notifications</h3>
          <p>5</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Manage Students and Faculty</h2>
        <button onClick={() => console.log('Navigating to student registration')}>
          Add New Student
        </button>
        <button onClick={() => console.log('Navigating to faculty registration')}>
          Add New Faculty
        </button>
      </div>
    </div>
  );
};

export default HeadmasterDashboard;
