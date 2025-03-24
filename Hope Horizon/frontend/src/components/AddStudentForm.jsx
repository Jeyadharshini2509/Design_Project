import React, { useState } from 'react';
import '../styles/AddStudentForm.css';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    age: '',
    grade: '',
    mentalIllnessSeverity: 'low',
    parentId: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/headmaster/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message) {
        alert('Student added successfully');
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student ID"
        value={formData.studentId}
        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Grade"
        value={formData.grade}
        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
        required
      />
      <select
        value={formData.mentalIllnessSeverity}
        onChange={(e) => setFormData({ ...formData, mentalIllnessSeverity: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="text"
        placeholder="Parent ID"
        value={formData.parentId}
        onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;