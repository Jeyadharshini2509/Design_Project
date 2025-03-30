



// import React, { useState } from 'react';

// const HeadmasterDashboard = () => {
//   const [showFacultyForm, setShowFacultyForm] = useState(false); // State to toggle the pop-up form
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     gender: '',
//     phoneNumber: '',
//   });

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     console.log('Faculty Data Submitted:', formData);
//     alert('Faculty added successfully!');
//     setFormData({ name: '', email: '', address: '', gender: '', phoneNumber: '' }); // Reset form
//     setShowFacultyForm(false); // Close the form after submission
//   };

//   return (
//     <div className="dashboard" style={{ padding: '20px' }}>
//       <h1>Headmaster Dashboard</h1>

//       <div className="dashboard-cards" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
//         <div className="card" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', width: '150px' }}>
//           <h3>Total Students</h3>
//           <p>150</p>
//         </div>

//         <div className="card" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', width: '150px' }}>
//           <h3>Total Faculty</h3>
//           <p>20</p>
//         </div>

//         <div className="card" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', width: '150px' }}>
//           <h3>New Notifications</h3>
//           <p>5</p>
//         </div>
//       </div>

//       <div className="dashboard-section" style={{ textAlign: 'center', marginBottom: '20px' }}>
//         <h2>Manage Students and Faculty</h2>
//         <button
//           style={{ padding: '10px 20px', margin: '10px', cursor: 'pointer' }}
//           onClick={() => console.log('Navigating to student registration')}
//         >
//           Add New Student
//         </button>
//         <button
//           style={{ padding: '10px 20px', margin: '10px', cursor: 'pointer' }}
//           onClick={() => setShowFacultyForm(true)}
//         >
//           Add New Faculty
//         </button>
//       </div>

//       {/* Pop-Up Faculty Form */}
//       {showFacultyForm && (
//         <div
//           style={{
//             position: 'fixed',
//             top: '0',
//             left: '0',
//             width: '100vw',
//             height: '100vh',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: '30px',
//               borderRadius: '10px',
//               width: '400px',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Faculty</h2>
//             <form onSubmit={handleFormSubmit}>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '10px',
//                   marginBottom: '10px',
//                   border: '1px solid #ccc',
//                   borderRadius: '5px',
//                 }}
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '10px',
//                   marginBottom: '10px',
//                   border: '1px solid #ccc',
//                   borderRadius: '5px',
//                 }}
//               />
//               <input
//                 type="text"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '10px',
//                   marginBottom: '10px',
//                   border: '1px solid #ccc',
//                   borderRadius: '5px',
//                 }}
//               />
//               <select
//                 value={formData.gender}
//                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '10px',
//                   marginBottom: '10px',
//                   border: '1px solid #ccc',
//                   borderRadius: '5px',
//                 }}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 value={formData.phoneNumber}
//                 onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '10px',
//                   marginBottom: '20px',
//                   border: '1px solid #ccc',
//                   borderRadius: '5px',
//                 }}
//               />
//               <div style={{ textAlign: 'center' }}>
//                 <button
//                   type="submit"
//                   style={{
//                     padding: '10px 20px',
//                     backgroundColor: '#4CAF50',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                     marginRight: '10px',
//                   }}
//                 >
//                   Submit
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowFacultyForm(false)}
//                   style={{
//                     padding: '10px 20px',
//                     backgroundColor: '#f44336',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeadmasterDashboard;



import React, { useState } from 'react';

const HeadmasterDashboard = () => {
  // State to control the pop-up form visibility and form data
  const [showFacultyForm, setShowFacultyForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    gender: '',
    phoneNumber: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Faculty added successfully!');
        setFormData({ name: '', email: '', address: '', gender: '', phoneNumber: '' }); // Reset form
        setShowFacultyForm(false); // Close the form after submission
      } else {
        alert(data.error || 'Failed to add faculty');
      }
    } catch (err) {
      console.error('Error adding faculty:', err);
      alert('An error occurred while adding faculty');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Headmaster Dashboard</h1>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div style={{ border: '1px solid black', padding: '20px', width: '150px' }}>
          <h3>Total Students</h3>
          <p>150</p>
        </div>

        <div style={{ border: '1px solid black', padding: '20px', width: '150px' }}>
          <h3>Total Faculty</h3>
          <p>20</p>
        </div>

        <div style={{ border: '1px solid black', padding: '20px', width: '150px' }}>
          <h3>New Notifications</h3>
          <p>5</p>
        </div>
      </div>

      <div>
        <h2>Manage Students and Faculty</h2>
        <button onClick={() => alert('Navigating to student registration')}>
          Add New Student
        </button>
        <button onClick={() => setShowFacultyForm(true)}>
          Add New Faculty
        </button>
      </div>

      {/* Pop-up Form to Add New Faculty */}
      {showFacultyForm && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
          }}
        >
          <h3>Add New Faculty</h3>
          <form onSubmit={handleFormSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowFacultyForm(false)}
              style={{
                backgroundColor: '#ccc',
                padding: '10px 20px',
                marginLeft: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Overlay behind the pop-up to close it when clicked */}
      {showFacultyForm && (
        <div
          onClick={() => setShowFacultyForm(false)}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '999',
          }}
        ></div>
      )}
    </div>
  );
};

export default HeadmasterDashboard;
