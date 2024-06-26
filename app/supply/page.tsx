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
  const [id, setId] = useState<number | string>('')
  const [Mid, setMid] = useState<number | string>('')
  const [Did, setDid] = useState<number | string>('')
  const [Rid, setRid] = useState<number | string>('')
  const [Sid, setSid] = useState<number | string>('')

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

const moveToSupply = async () => {
  if (contract && window.ethereum !== undefined) {
    try {
      // Check the current stage of the product
      const currentStage = await contract.showStage(id);
      console.log("Current stage:", currentStage);
      if (currentStage === 'Medicine Ordered') {
        // Move the product to the raw material supply stage
        const tx = await contract.RMSupply(id);
        const receipt = await tx.wait();
        console.log('Product moved to supplier. Transaction receipt:', receipt);
        window.alert('The product has been added to the supplier successfully.');
        setMid('');
      } else {
        window.alert('The product is not in the initial stage, cannot move to supply.');
        return;
      }
    } catch (error) {
      console.log('Error moving product to supply:', error);
    }
  }
};

const moveToManufacture = async() => {
  if (contract && window.ethereum !== undefined) {
    try {
      const currentStage = await contract.showStage(Mid);
      if (currentStage === "Medicine on Raw Material Supply Stage") {
        const tx = await contract.MANSupply(Mid);
        const receipt = await tx.wait();
        console.log('Product moved to Manufacture. Transaction receipt:', receipt)
        window.alert('The product has been added to the manufacture successfully.')
        setId('')
      } else {
        window.alert('The product is not in the raw materail supply stage,cannot move to manufacture');
        return;
      }
    } catch (error) {
      console.log('Error on moving to the manufacture:', error)
    }
  }
};

const moveToDistributer = async() => {
  if (contract && window.ethereum !== undefined) {
    try {
      const currentStage = await contract.showStage(Did)
      if (currentStage === "Medicine on Manufacture Stage") {
        const tx = await contract.DSTSupply(Did);
        const receipt = await tx.wait()
        console.log('Product moved to Distributer. Transaction receipt:', receipt)
        window.alert('The product has been added to the distributor successfully')

        setDid('')
      } else {
        window.alert('the Product is not in manufacture stage, cannot move to distributor')
      }
    } catch (error) {
      console.log('Error on moving  the product to distributer')
    }
  }
}

const moveToRetailer = async() => {
  if (contract && window.ethereum !== undefined) {
    try {
      const currentStage = await contract.showStage(Rid)
      if (currentStage === "Medicine on Distribution Stage") {
        const tx = await contract.RTLSupply(Rid)
        const receipt = await tx.wait()
        console.log('Product moved to Retailer. Transaction receipt:', receipt)
        window.alert('The product has been added to the retailer successfully')

        setRid('')
      }
      else{
         window.alert('the Product is not in manufacture stage, cannot move to retailer')
      }
    } catch (error) {
      console.log('Error to move the otduct to retailer:', error)
    }
  }
}

const sold = async() => {
  if(contract && window.ethereum !== undefined) {
    try {
      const soldProduct = await contract.showStage(Sid)
      if (soldProduct === "Medicine on Retail Stage"){
        const tx = await contract.sold(Sid)
        const receipt = await tx.wait()
        console.log('Product sold. Transaction receipt:', receipt)
        window.alert('The product sold successfully')

        setSid('')
      }  else {
        window.alert('the Product is not in retailer stage, cannot move to retailer')
      }
    }
    catch (error) {
      console.log('Error to sold the product', error)
    }
  }
}

  return (
    <div className="w-full mt-6"> 
    <div>
      <h1 className='text-3xl my-3 font-bold text-center'>Product Supply Chain Flow</h1>
      <h2 className='text-1xl my-3 font-bold text-center'>Product order -{'>'} Raw Material Supplier -{'>'} Manufacturer -{'>'} Distributor -{'>'} Retailer -{'>'} Consumer</h2>
        <table className="mt-2 w-full gap-y-5 bg-black-100 text-white">
            <thead className="bg-slate-300 py-3 gap-x-5">
              <tr className="gap-x-5 text-black">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Discription</th>
                <th scope="col">Product Stage</th>
              </tr>
            </thead>
            <tbody >
              {medPro.map((prod, index) => (
                <tr className='bg-black text-white border-b-[2px]' key={index}>
                <td className="text-center py-1 px-2 gap-x-2">{prod.id}</td>
                <td className="text-center">{prod.name}</td>
                <td className="flex justify-center">{prod.discription}</td>
                <td className='text-center'>{prod.Stage}</td>
              </tr>
              ))} 
            </tbody>
          </table>
      </div>
    <div className='w-full m-10'>
      <div className='border-b-[2px] py-2 my-3'>
              <h2 className='tx-2xl font-bold mt-3'>Step 1: Supply Raw Material (Only a registered Raw Material supplier)</h2>
         <input
      className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
       type="text"
       placeholder='Product Id'
       value={id}
       onChange={(e) => setId(e.target.value)} 
       />
       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       onClick={moveToSupply}>
        Supply
       </button>
      </div>
     
       <div className='border-b-[2px] py-2 my-3'>
        <h2 className='tx-2xl font-bold mt-3'>Step 2: Manufacture (Only a registered Manufacturer)</h2>
       <input
       className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
        type="text" 
        placeholder='Product Id'
        value={Mid}
        onChange={(e) => setMid(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={moveToManufacture}>
          Manufacture
        </button>
       </div>
       <div className='border-b-[2px] py-2 my-3'>
         <h2 className='tx-2xl font-bold mt-3'>Step 3: Distribute (Only a registered Distributor)</h2>
        <input
        className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
        type="text"
        placeholder='Product Id'
        value={Did}
        onChange={(e) => setDid(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={moveToDistributer}>
          Distributor
        </button>
       </div>
        <div className='border-b-[2px] py-2 my-3'>
          <h2 className='tx-2xl font-bold mt-3'>Step 4: Retail (Only a registered Retailer)</h2>
        <input
        className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
        type="text"
        placeholder='Product Id'
        value={Rid}
        onChange={(e) => setRid(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={moveToRetailer}>
          Retailer
        </button>
        </div>
        <div className='border-b-[2px] py-2 my-3'>
          <h2 className='tx-2xl font-bold mt-3'>Step 5: Sold (Only a registered Retailer)</h2>
        <input
        className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
        type="text"
        placeholder='Product Id'
        value={Sid}
        onChange={(e) => setSid(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={sold}>
          sold
        </button>
        </div>
    </div>
    </div>
  )
}

export default page