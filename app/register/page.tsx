'use client';
import React, { useEffect, useState } from 'react'
import { getWeb3, setUpWeb3 } from '../web3';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../constants/logestics';

function Register() {
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [nameRMS, setNameRMS] = useState<string>('');
  const [addressRMS, setAddressRMS] = useState<string>('');
  const [placeRMS, setPlaceRMS] = useState<string>('');
  const [nameMAN, setNameMAN] = useState<string>('');
  const [addressMAN, setAddressMAN] = useState<string>('');
  const [placeMAN, setPlaceMAN] = useState<string>('');

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
        const tx = await contract.addRMS(nameRMS, addressRMS, placeRMS);
        const receipt = await tx.wait()
        console.log('Raw Material Supplier Registared. Transaction receipt:', receipt);
        window.alert("Raw Material Supplier registred successfully")

      setNameRMS('');
      setAddressRMS('');
      setPlaceRMS('')
      } catch (error) {
        console.log("Error on creating raw material supplier")
      }
    }
  }

  const addMAN = async () => {
    if(contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.addMAN(nameMAN, addressMAN, placeMAN);
        const receipt = await tx.wait()
        console.log("Manufacutred Registered. Transction receipt:", receipt);
        window.alert("Manufacutre registred successfully");
      }
      catch (error) {
        console.log("Error on registering manufacture")
      }
    }
  }


  return (
    <div>
      <div>
        <h1 className="text-3xl mx-4 font-bold my-5 mb-4">registor</h1>
      </div>
      <div>
        <input
        type='text'
        placeholder='Name'
        value={nameRMS}
        onChange={(e) => setNameRMS(e.target.value)}
        />
        <input
        type='text'
        placeholder='Address'
        value={addressRMS}
        onChange={(e) => setAddressRMS(e.target.value)}
        />
        <input
        type='text'
        placeholder='place'
        value={placeRMS}
        onChange={(e) => setPlaceRMS(e.target.value)}
        />
        <button 
        onClick={addRMS}>
          Register RMS
        </button>
      </div>
    </div>
  )
}

export default Register