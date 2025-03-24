import React from 'react';
import '../Styles/Dashboard.css';

const ParentDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Parent Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Child's Name</h3>
          <p>John Doe</p>
        </div>

        <div className="card">
          <h3>Growth Percentage</h3>
          <p>78%</p>
        </div>

        <div className="card">
          <h3>Last Activity</h3>
          <p>Completed Math Task</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Insights and Recommendations</h2>
        <p>Encourage your child to work on Language Development tasks for additional growth.</p>
      </div>
    </div>
  );
};

export default ParentDashboard;
