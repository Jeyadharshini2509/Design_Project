import React, { useState } from 'react';

const RegistrationForm = ({ onSubmit }) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    dob: '',
    guardianContact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(personalInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={personalInfo.name}
        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={personalInfo.dob}
        onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
      />
      <input
        type="text"
        placeholder="Guardian Contact"
        value={personalInfo.guardianContact}
        onChange={(e) => setPersonalInfo({ ...personalInfo, guardianContact: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;