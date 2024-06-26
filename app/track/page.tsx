'use client'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { getWeb3, setUpWeb3 } from '../web3'
import { abi, contractAddress } from '../constants/logestics'
import { STAGE } from '../order/abi'

type TrackedProduct = {
  id: number;
  name: string;
  description: string;
  Stage: STAGE;
  supplier: { id: number; name: string; place: string };
  manufacturer: { id: number; name: string; place: string };
  distributor: { id: number; name: string; place: string };
  retailer: { id: number; name: string; place: string };
};

function page() {
  const [contract, setContract] = useState<ethers.Contract | undefined>(undefined)
  const [wallet, setWalletAddress] = useState<string | null>(null)
  const [trackedProduct, setTrackedProduct] = useState<TrackedProduct | null>(null);
  const [id, setId] = useState<string | number >('');

  useEffect(() => {
    async function initialize() {
      await setUpWeb3();
      const web3Instance = getWeb3();
      const signer = await web3Instance.getSigner()
      const contractInstance = new ethers.Contract(contractAddress, abi, signer)

      setContract(contractInstance)
      const wallet = await signer.getAddress()
      setWalletAddress(wallet)
    }
    initialize()
  }, [])

  const trackProduct = async () => {
    if(contract && window.ethereum !== undefined) {
      try {
        const productInfo = await contract.medicineInfo(id)
        const stage = await contract.showStage(id)

        const supplierInfo = await contract.RMS(productInfo.RMSid)
        const manufactureInfo = await contract.MAN(productInfo.MANid)
        const distributorInfo = await contract.DST(productInfo.DISTid)
        const retailerInfo = await contract.RTL(productInfo.RTLid)

        setTrackedProduct({
          id: Number(id),
          name: productInfo.name,
          description: productInfo.discription,
          Stage: stage,
          supplier: {
            id: Number(supplierInfo.id),
            name: supplierInfo.name,
            place: supplierInfo.place
          },
          manufacturer: {
            id: Number(manufactureInfo.id),
            name: manufactureInfo.name,
            place: manufactureInfo.place
          },
          distributor: {
            id: Number(distributorInfo.id),
            name: distributorInfo.name,
            place: distributorInfo.place
          },
          retailer: {
            id: Number(retailerInfo.id),
            name: retailerInfo.name,
            place: retailerInfo.place
          }
        })
        setId('')
      }
      catch (error) {
        console.log('Error to track the product', error)
        window.alert('Error tracking product. Please check the ID and try again.');
      }
    }
  }


  return (
    <div>
    <div className="border-b-[2px] py-2 my-3">
          <h2 className="tx-2xl font-bold mt-3">Track Product</h2>
          <input
            className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
            type="text"
            placeholder="Product Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={trackProduct}
          >
            Track
          </button>
        </div>

      </div>
  )
}

export default page