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

  const TrackedProductInfo = ({ product }: { product: TrackedProduct }) => (
  <div className="mt-4 mx-4 p-4 border rounded border-b-[2px]">
    <h3 className="text-2xl font-bold mb-2 text-center">Tracked Product Information</h3>
    <h3 className="text-xl font-bold mb-2">Product:</h3>
    <div className="bg-gray-300 px-5 py-2 gap-y-2 grid gap-y-4">
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Current Stage:</strong> {product.Stage}</p>
    </div>
    <h4 className="font-bold text-xl mt-3">Supply Chain:</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-300 p-4 rounded-md">
        <h5 className="text-lg font-bold mb-2 text-center">Supplier</h5>
        <p><strong>Supplier ID:</strong> {product.supplier.id}</p>
        <p><strong>Supplier Name:</strong> {product.supplier.name}</p>
        <p><strong>Supplier Place:</strong> {product.supplier.place}</p>
      </div>
      <div className="bg-gray-300 p-4 rounded-md">
        <h5 className="text-lg font-bold mb-2 text-center">Manufacturer</h5>
        <p><strong>Manufacturer ID:</strong> {product.manufacturer.id}</p>
        <p><strong>Manufacturer Name:</strong> {product.manufacturer.name}</p>
        <p><strong>Manufacturer Place:</strong> {product.manufacturer.place}</p>
      </div>
      <div className="bg-gray-300 p-4 rounded-md">
        <h5 className="text-lg font-bold mb-2 text-center">Distributor</h5>
        <p><strong>Distributor ID:</strong> {product.distributor.id}</p>
        <p><strong>Distributor Name:</strong> {product.distributor.name}</p>
        <p><strong>Distributor Place:</strong> {product.distributor.place}</p>
      </div>
      <div className="bg-gray-300 p-4 rounded-md">
        <h5 className="text-lg font-bold mb-2 text-center">Retailer</h5>
        <p><strong>Retailer ID:</strong> {product.retailer.id}</p>
        <p><strong>Retailer Name:</strong> {product.retailer.name}</p>
        <p><strong>Retailer Place:</strong> {product.retailer.place}</p>
      </div>
    </div>
  </div>
);

  return (
    <div>
    <div className="border-b-[2px] py-2 my-5">
          <h1 className="text-3xl font-bold mt-3 py-3 px-5 text-center">Track Product</h1>
          <h2 className="text-2xl font-bold mt-3 py-3 px-5">Enter Product ID to track it</h2>
          <input
            className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
            type="text"
            placeholder="Product Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={trackProduct}
          >
            Track
          </button>
        </div>
        {trackedProduct && <TrackedProductInfo product={trackedProduct} />}
      </div>
  )
}

export default page