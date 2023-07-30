// utils/ethers.js

import { ethers } from 'ethers';
import abi from './election.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const contractABI = abi.abi;
  
export const getContractInstance = async() => {
  try{
    const {ethereum}=window;
    const account = await ethereum.request({
      method:"eth_requestAccounts"
    })

    window.ethereum.on("accountsChanged",()=>{
     window.location.reload()
    })
    // setAccount(account);
    const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
    const signer =  provider.getSigner(); //write the blockchain
    
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    )
    console.log(contract)
   return contract;
  }catch(error){
    console.log(error)
  }
};

