import React, { useEffect, useState } from 'react'
import { getWeb3, setUpWeb3 } from '../web3';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../constants/logestics';

function Register() {
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [address, setAddress] = useState<address| null>(null);
  const [place, setPlace] = useState<string | null>(null);

   useEffect(() => {
    async function initialize() {
      await setUpWeb3();
      const web3Instance = getWeb3();
      console.log(web3Instance);

      const signer = await web3Instance.getSigner();
      console.log(signer);

      const contractInstance = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      setContract(contractInstance);

      const wallet = await signer.getAddress();
      setWalletAddress(wallet);
    }
    initialize();
  }, []);

  const addRMS = async () =>{
    if(contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.addRMS(name, address, place);
        const receipt = await tx.wait()
        console.log('Raw Material Supplier Registared. Transaction receipt:', receipt);
        window.alert("Raw Material Supplier registred successfully")

      setName('');
      setAddress('');
      setPlace('')
      } catch (error) {
        console.log("Error on creating raw material supplier")
      }
    }
  }
  return (
    <div>Register</div>
  )
}

export default Register