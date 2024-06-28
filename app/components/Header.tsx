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
  const[isLoading, setIsLoading] = useState<boolean>(true)

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
  }, [walletAddress]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

 const connectWallet = async() => {
    setIsLoading(true);
    try {
      await setUpWeb3();
      const web3Instance = getWeb3();
      const signer = await web3Instance.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);

      const wallet = await signer.getAddress();
      setWalletAddress(wallet);
    } catch (error) {
      console.log('Error connecting wallet: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className='w-full flex py-4 bg-zinc-600 px-20 justify justify-between'>
      <div>
        <h1 className='text-slate-50 text-lg font-sans font-bold'><a href="/">Logistic-Supply</a></h1>
      </div>
      <div>
        <ul className={`text-slate-50 relative left-40 gap-y-4 ${showMenu ? 'block' : 'hidden'} sm:flex sm:gap-x-10 sm:visible`}>
          <li><a href="/register"> Register</a></li>
          <li><a href="/order"> Order Product</a></li>
          <li><a href="/supply"> Control Supply Chain</a></li>
          <li><a href="/track">Track Product</a></li>
        </ul>
      </div>
      <div className='visible sm:invisible'>
        <button className='bg-white p-3' onClick={toggleMenu}>{showMenu? 'X' : "Hamburger"}</button>
      </div>
    </div>
   <div className='flex-end '>
        {walletAddress ? (
          <p className=' text-lg font-bold mb-4 absolute mt-3 right-6 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 '>
            Account: {walletAddress.slice(0, 4)}...{walletAddress.slice(walletAddress.length - 4)}
          </p>
        ) : (
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold absolute mt-3 right-6 py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={connectWallet}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center ">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              'Connect Wallet'
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Header;