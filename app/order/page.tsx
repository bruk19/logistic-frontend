'use client'
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

  useEffect(() => {
    async function fetchProduct() {
      if(contract && window.ethereum !== undefined) {
        try {
          const totalProductList = await contract.medCount();
          const allProduct = [];
          for(let i=1; i<=totalProductList; i++) {
            const prod = await contract.medicineInfo(i);
            allProduct.push({
              id: i,
              name: prod.name,
              discription: prod.discription,
              RMSid: prod.RMSid,
              MANid: prod.MANid,
              DSTid: prod.DSTid,
              RTLid: prod.RTLid,
              Stage: prod.STAGE,
            })
          }
          setProData(allProduct)
        }
        catch (error) {
          console.log('Error to display a product', error)
        }
      }
    }
    fetchProduct()
  }, [contract])

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
    <div>
      <div>
        <input 
        type='text'
        placeholder='Product Name'
        value={name}
        onChange={(e)=> setName(e.target.value)}
        />
        <input
        type='text'
        placeholder='Discription'
        value={discription}
        onChange={(e) => setDiscription(e.target.value)} 
        />
        <button onClick={addProduct}>
          Add Product
        </button>
        <div>
          <table className="mt-2 w-4/5 gap-y-5">
            <thead className="bg-slate-50 py-3 gap-x-5">
              <tr className="gap-x-5">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Discription</th>
              </tr>
            </thead>
            <tbody>
              {proData.map((prod, index) => (
                <tr className="even:bg-gray-100" key={index}>
                <td className="py-1 px-2 gap-x-2">{prod.id}</td>
                <td className="text-center">{prod.name}</td>
                <td className="flex justify-center">{prod.discription}</td>
              </tr>
              ))} 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page