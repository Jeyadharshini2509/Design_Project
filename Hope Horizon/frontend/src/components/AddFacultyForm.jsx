// import React, { useState } from 'react';
// import '../styles/AddFacultyForm.css';

// const AddFacultyForm = () => {
//   const [formData, setFormData] = useState({
//     facultyId: '',
//     name: '',
//     department: '',
//     email: '',
//     phoneNumber: '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/headmaster/faculty', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (data.message) {
//         alert('Faculty added successfully');
//       } else {
//         alert(data.error);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form className="add-faculty-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Faculty ID"
//         value={formData.facultyId}
//         onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Department"
//         value={formData.department}
//         onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//         required
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={formData.phoneNumber}
//         onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//         required
//       />
//       <button type="submit">Add Faculty</button>
//     </form>
//   );
// };

// export default AddFacultyForm;

import React, { useState } from 'react';

const AddFacultyForm = () => {
  const [formData, setFormData] = useState({
    facultyId: '',
    name: '',
    email: '',
    age: '',
    gender: '',
    department: '',
    address: '',
    phoneNumber: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/headmaster/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message) {
        alert('Faculty added successfully');
        setFormData({
          facultyId: '',
          name: '',
          email: '',
          age: '',
          gender: '',
          department: '',
          address: '',
          phoneNumber: '',
        }); // Reset form after submission
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle = {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Faculty</h2>

      <input
        type="text"
        style={inputStyle}
        placeholder="Faculty ID"
        value={formData.facultyId}
        onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
        required
      />

      <input
        type="text"
        style={inputStyle}
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <input
        type="email"
        style={inputStyle}
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        type="number"
        style={inputStyle}
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        required
      />

      <select
        style={inputStyle}
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <input
        type="text"
        style={inputStyle}
        placeholder="Department"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        required
      />

      <textarea
        style={{ ...inputStyle, height: '80px' }}
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        required
      ></textarea>

      <input
        type="text"
        style={inputStyle}
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        required
      />

      <button type="submit" style={buttonStyle}>
        Add Faculty
      </button>
    </form>
  );
};

export default AddFacultyForm;
