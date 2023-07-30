// components/CandidateList.js

import React, { useEffect, useState } from 'react';
// import { getContractInstance } from '../utils/ethers';

const CandidateList = ({state}) => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            const {contract}=state;

            try {
                const totalCandidates = await contract.getTotalCandidates();
                const candidateList = [];

                for (let i = 1; i <= totalCandidates; i++) {
                    const candidate = await contract.getCandidateById(i);
                    candidateList.push(candidate);
                }

                setCandidates(candidateList);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, []);

    return (
        <div>
            <h2>Candidates</h2>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate.id}>
                        {candidate.name} - Votes: {candidate.voteCount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateList;
