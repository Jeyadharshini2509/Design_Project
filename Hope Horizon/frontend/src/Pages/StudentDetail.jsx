import React, { useEffect, useState } from 'react';

const StudentDetail = ({ studentId }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await fetch(`/api/teacher/students/${studentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setStudent(data);
    };
    fetchStudent();
  }, [studentId]);

  const updateTaskStatus = async (domainId, taskId, status) => {
    await fetch(`/api/teacher/students/${studentId}/domains/${domainId}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    });
    // Refresh data
    const updatedStudent = { ...student };
    const domain = updatedStudent.domains.find(d => d._id === domainId);
    const task = domain.tasks.find(t => t._id === taskId);
    task.status = status;
    setStudent(updatedStudent);
  };

  return (
    <div className="p-4">
      {student?.domains.map((domain) => (
        <div key={domain._id} className="mb-6">
          <h3 className="text-xl font-bold">{domain.domainName}</h3>
          <div className="grid grid-cols-4 gap-2">
            {domain.tasks.map((task) => (
              <button
                key={task._id}
                onClick={() => updateTaskStatus(domain._id, task._id, task.status === 'red' ? 'blue' : 'red')}
                className={`p-2 rounded ${task.status === 'blue' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
              >
                {task.taskName}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentDetail;