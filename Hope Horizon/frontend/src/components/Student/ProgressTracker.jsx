import React from 'react';

const ProgressTracker = ({ student, onUpdate }) => {
  const toggleStatus = (domain, taskIndex) => {
    const updated = { ...student };
    updated.progress[domain][taskIndex].status = 
      updated.progress[domain][taskIndex].status === 'completed' 
        ? 'pending' 
        : 'completed';
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      {Object.entries(student.progress).map(([domain, tasks]) => (
        <div key={domain} className="border p-4 rounded">
          <h3 className="font-bold capitalize">{domain} Skills</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {tasks.map((task, index) => (
              <button
                key={task.name}
                onClick={() => toggleStatus(domain, index)}
                className={`p-2 rounded ${
                  task.status === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                {task.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;