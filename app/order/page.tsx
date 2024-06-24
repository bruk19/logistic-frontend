import React, { useEffect, useState } from 'react'
import { getWeb3, setUpWeb3 } from '../web3';
import { abi, contractAddress } from '../constants/logestics';
import { ethers } from 'ethers';

type ProductData = {
  id: number,
  name: string,
  discription: string,
  RMSid: number,
  MANid: number,
  DSTid: number,
  RTLid: number
}

function page() {
  const [name, setName] = useState<string>('');
  const [discription, setDiscription] = useState<string>('');
  const [contract, setContract] = useState<ethers.Contract | undefined>(undefined)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    async function initialize() {
      await setUpWeb3()
      const web3Instance = getWeb3()
      const signer = await web3Instance.getSigner()
      const contractInstance = new ethers.Contract(contractAddress, abi, signer)

      setContract(contractInstance);

      const wallet = await signer.getAddress();
      setWalletAddress(wallet)
    }
    initialize()
  }, [])

  const addProduct = async () => {
    if(contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.addMedicine(name, discription)
        const receipt = await tx.wait();
        console.log('Raw Material supplier registered. Transaction receipt:', receipt);
        window.alert('The product is Added succesfully')
      }
      catch (error) {
        console.log('Error on adding a product', error);

         const totalProduct = await contract.medCount();
         const totalProductNumber = parseInt(totalProduct.toString(), 10);
         const 
      }
    }
  }

  return (
    <div>page</div>
  )
}

export default page