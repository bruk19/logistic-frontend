import React, { useEffect, useState } from 'react'
import { getWeb3, setUpWeb3 } from '../web3';
import { abi, contractAddress } from '../constants/logestics';
import { ethers } from 'ethers';
import { STAGE } from './abi';

type ProductData = {
  id: number,
  name: string,
  discription: string,
  RMSid: number,
  MANid: number,
  DSTid: number,
  RTLid: number,
  Stage: STAGE,
}

function page() {
  const [name, setName] = useState<string>('');
  const [discription, setDiscription] = useState<string>('');
  const [contract, setContract] = useState<ethers.Contract | undefined>(undefined)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [proData, setProData] = useState<ProductData[]>([])

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

        const totalProduct = await contract.medCount();
         const totalProductNumber = parseInt(totalProduct.toString(), 10);
         const newProData = [...proData]

         const newAddedProData = {
          id: totalProductNumber,
          name: name,
          discription: discription,
          RMSid: 0,
          MANid: 0,
          DSTid: 0,
          RTLid: 0,
          Stage: STAGE.Init
         }
         newProData.push(newAddedProData);
         setProData(newProData);

         setName('')
         setDiscription('')
      }
      catch (error) {
        console.log('Error on adding a product', error);
      }
    }
  }

  return (
    <div>page</div>
  )
}

export default page