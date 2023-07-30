pragma solidity ^0.8.9;

contract election {
    // Structure to represent a candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Structure to represent a voter
    struct Voter {
        bool hasVoted;
    }

    // Store the owner address (who deploys the contract)
    address public owner;

    // Mapping to store candidates
    mapping(uint256 => Candidate) public candidates;

    // Mapping to store voters
    mapping(address => Voter) public voters;

    // Variable to keep track of the total number of candidates
    uint256 public totalCandidates;

    // Modifier to restrict certain functions to be accessed only by the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Function to add a candidate
    function addCandidate(string memory name) public onlyOwner {
        totalCandidates++;
        candidates[totalCandidates] = Candidate(totalCandidates, name, 0);
    }

    // Function to cast a vote
    function vote(uint256 candidateId) public {
        require(candidateId > 0 && candidateId <= totalCandidates, "Invalid candidate ID");
        require(!voters[msg.sender].hasVoted, "You have already voted");

        // Increment the vote count of the candidate
        candidates[candidateId].voteCount++;

        // Mark the voter as having voted
        voters[msg.sender].hasVoted = true;
    }

    // Function to get the total number of candidates
    function getTotalCandidates() public view returns (uint256) {
        return totalCandidates;
    }

    // Function to get the details of a candidate by ID
    function getCandidateById(uint256 candidateId) public view returns (string memory name, uint256 voteCount) {
        require(candidateId > 0 && candidateId <= totalCandidates, "Invalid candidate ID");

        Candidate memory candidate = candidates[candidateId];
        name = candidate.name;
        voteCount = candidate.voteCount;
    }

    // Function to check if a voter has already voted
    function hasVoted() public view returns (bool) {
        return voters[msg.sender].hasVoted;
    }
}
