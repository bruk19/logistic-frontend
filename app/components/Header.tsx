'use client';
import React, { useEffect, useState } from 'react'
import { getWeb3, setUpWeb3 } from '../web3';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../constants/logestics';

function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div className='flex-end '>
      {walletAddress? (
        <p className=' text-lg font-bold mb-4 absolute mt-3 top-4 right-6 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 '>Account: {walletAddress.slice(0,4)}...{walletAddress.slice(walletAddress.length-4)}</p>
      ): (
        <button>Connect Wallet</button>
      )}
    </div>
      <div className='w-full flex py-4 bg-zinc-600 px-20 justify justify-between'>
      <div>
        <h1 className='text-slate-50 text-lg font-sans font-bold'>Logistic-Supply</h1>
      </div>
      <div>
        <ul className={`text-slate-50 gap-y-4 ${showMenu ? 'block' : 'hidden'} sm:flex sm:gap-x-10 sm:visible`}>
          <li>Register</li>
          <li>Order Product</li>
          <li>Control Supply Chain</li>
          <li>Track Product</li>
        </ul>
      </div>
      <div className='visible sm:invisible'>
        <button className='bg-white p-3' onClick={toggleMenu}>{showMenu? 'X' : "Hamburger"}</button>
      </div>
    </div>
    </div>
  )
}

export default Header;