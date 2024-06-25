import React, { useEffect, useState } from 'react'
import { getWeb3, setUpWeb3 } from '../web3'
import { ethers } from 'ethers'
import { abi, contractAddress } from '../constants/logestics'
import { STAGE } from '../order/abi'

type productData = {
  id: number,
  name: string,
  discription: string,
  RMSid: number,
  MANid: number,
  DSTid: number,
  RTLid: number,
  STAGE: STAGE
}

function page() {

  const [contract, setContract] = useState<ethers.Contract | undefined>(undefined)
  const [wallletAddress, setWalletAddress] = useState<string | null>(null)

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
    async function fetchProudct () {
      if(contract && window.ethereum !== undefined) {
        try{
        }
        catch (error) {
          console.log('Error to display a product list', error)
        }
      }
    }
  })
  return (
    <div>page</div>
  )
}

export default page