import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { getWeb3, setUpWeb3 } from '../web3'
import { abi, contractAddress } from '../constants/logestics'

function page() {
  const [contract, setContract] = useState<ethers.Contract | undefined>(undefined)
  const [wallet, setWalletAddress] = useState<string | null>(null)

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
  }, [])
  return (
    <div>page</div>
  )
}

export default page