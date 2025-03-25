import React from 'react';
import '../Styles/FacultyDashboard.css';

const FacultyDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Faculty Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Assigned Students</h3>
          <p>30</p>
        </div>

        <div className="card">
          <h3>Tasks Completed</h3>
          <p>85%</p>
        </div>

        <div className="card">
          <h3>Export Data</h3>
          <button onClick={() => console.log('Exporting CSV')}>Export to CSV</button>
          <button onClick={() => console.log('Exporting Excel')}>Export to Excel</button>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
