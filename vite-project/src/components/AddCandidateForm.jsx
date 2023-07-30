// components/AddCandidateForm.jsx

import React, { useState } from 'react';

const AddCandidateForm = ({ state }) => {
  const [candidateName, setCandidateName] = useState('');

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const { contract } = state;

    try {
      if (contract) {
        await contract.addCandidate(candidateName);
        alert('Candidate added successfully!');
        setCandidateName('');
      } else {
        console.error('Contract instance not available.');
      }
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <form onSubmit={handleAddCandidate}>
      <input className='form-input'
        type="text"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
        placeholder="Enter candidate name"
        required
      />
      <button type="submit" className='btn btn-black '>Add Candidate</button>
    </form>
  );
};

export default AddCandidateForm;
