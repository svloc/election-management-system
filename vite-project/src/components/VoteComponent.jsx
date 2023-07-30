// components/VoteComponent.js

import React, { useState } from 'react';
// import { getContractInstance } from '../utils/ethers';

const VoteComponent = ({state}) => {
    const [selectedCandidate, setSelectedCandidate] = useState('');

    const handleVote = async (e) => {
        e.preventDefault();
        const {contract}=state;

        try {
            await contract.vote(selectedCandidate);
            alert('Vote cast successfully!');
            setSelectedCandidate('');
        } catch (error) {
            console.error('Error casting vote:', error);
        }
    };

    return (
        <form onSubmit={handleVote}>
            <h2>Vote</h2>
            <select
                value={selectedCandidate}
                onChange={(e) => setSelectedCandidate(e.target.value)}
                className='form-input'>
                <option value="">Select candidate</option>
                {/* Assume the list of candidates is passed as a prop */}
                {/* For example: candidates.map(candidate => <option value={candidate.id}>{candidate.name}</option>) */}
            </select>
            <button type="submit" className='btn btn-black '>Vote</button>
        </form>
    );
};

export default VoteComponent;
