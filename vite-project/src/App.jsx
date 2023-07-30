import React, { useEffect, useState } from 'react';
import AddCandidateForm from './components/AddCandidateForm';
import CandidateList from './components/CandidateList';
import VoteComponent from './components/VoteComponent';
import abi from "./utils/election.json";
import { ethers } from "ethers"

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState('Not connected');

  useEffect(() => {
    const template = async () => {

      const contractAddres = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;
      
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.error('Ethereum provider not available.');
          return;
        }  
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
        setState({ provider, signer, contract });

      } catch (error) {
        console.log(error)
      }
    }
    template();
  }, [])
  console.log(state.contract);
  return (
    <div className='container'>
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      <h1>Election Management System</h1>
      {state.contract ? (
        <>
          <AddCandidateForm state={state} />
          <CandidateList state={state} />
          <VoteComponent state={state} />
        </>
      ) : (
        <p>Loading contract...</p>
      )}
    </div>
  );
}

export default App;
