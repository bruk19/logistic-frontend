'use client'
import React, { useEffect, useState } from 'react'
import { getWeb3, setUpWeb3 } from '../web3'
import { ethers } from 'ethers'
import { abi, contractAddress } from '../constants/logestics'
import { STAGE } from '../order/abi'

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

  const [contract, setContract] = useState<ethers.Contract | undefined>(undefined)
  const [wallletAddress, setWalletAddress] = useState<string | null>(null)
  const [medPro, setMedPro] = useState<ProductData[]>([])

  useEffect(() =>{
    async function initialize () {
      await setUpWeb3()
      const web3Instance = getWeb3()
      const signer = await web3Instance.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, abi, signer)

      setContract(contractInstance)

      const wallet = await signer.getAddress()
      setWalletAddress(wallet)
    }
    initialize()
  }, [])

  useEffect(() => {
    async function fetchProduct () {
      if(contract && window.ethereum !== undefined) {
        try {
          const totalProductList = await contract.medCount();
          const allProduct = [];
          for(let i=1; i<=totalProductList; i++) {
            const prod = await contract.medicineInfo(i);
            const stage = await contract.showStage(i);
            allProduct.push({
              id: i,
              name: prod.name,
              discription: prod.discription,
              RMSid: prod.RMSid,
              MANid: prod.MANid,
              DSTid: prod.DSTid,
              RTLid: prod.RTLid,
              Stage: stage,
            })
          } setMedPro(allProduct)
          }
          catch (error) {
          console.log('Error to display a product list', error)
        }
      }
    }
    fetchProduct()
  }, [contract])
  return (
    <div className="m-10"> 
      <div>
        <table className="mt-2 w-4/5 gap-y-5">
            <thead className="bg-slate-50 py-3 gap-x-5">
              <tr className="gap-x-5">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Discription</th>
                <th scope="col">Product Stage</th>
              </tr>
            </thead>
            <tbody>
              {medPro.map((prod, index) => (
                <tr className="even:bg-gray-100" key={index}>
                <td className="text-center py-1 px-2 gap-x-2">{prod.id}</td>
                <td className="text-center">{prod.name}</td>
                <td className="flex justify-center">{prod.discription}</td>
                <td className='text-center'>{prod.Stage}</td>
              </tr>
              ))} 
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default page