'use client';
import React, { useEffect, useState } from 'react';
import { getWeb3, setUpWeb3 } from '../web3';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../constants/logestics';

type RMSData = {
  id: number;
  name: string;
  addr: string;
  place: string;
};

function Register() {
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [nameRMS, setNameRMS] = useState<string>('');
  const [addressRMS, setAddressRMS] = useState<string>('');
  const [placeRMS, setPlaceRMS] = useState<string>('');
  const [nameMAN, setNameMAN] = useState<string>('');
  const [addressMAN, setAddressMAN] = useState<string>('');
  const [placeMAN, setPlaceMAN] = useState<string>('');
  const [nameDST, setNameDST] = useState<string>('');
  const [addressDST, setAddressDST] = useState<string>('');
  const [placeDST, setPlaceDST] = useState<string>('');
  const [nameRTL, setNameRTL] = useState<string>('');
  const [addressRTL, setAddressRTL] = useState<string>('');
  const [placeRTL, setPlaceRTL] = useState<string>('');
  const [rmsData, setRmsData] = useState<RMSData[]>([]);
  const [nextId, setNextId] = useState(1);

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

    useEffect(() => {
    // Fetch the RMS data from the contract
    const fetchRMSData = async () => {
      try {
        if (contract) {
          const numRMS = await contract.getRMSCount();
          const rmsData: RMSData[] = [];

          for (let i = 0; i < numRMS; i++) {
            const rms = await contract.RMS(i);
            rmsData.push({
              id: rms.id,
              name: rms.name,
              addr: rms._addr,
              place: rms.place
            });
          }

          setRmsData(rmsData);
        }
      } catch (error) {
        console.error('Error fetching RMS data:', error);
      }
    };

    fetchRMSData();
  }, [contract]);

  const addRMS = async () => {
    if (contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.addRMS(nameRMS, addressRMS, placeRMS);
        const receipt = await tx.wait();
        console.log(
          'Raw Material Supplier Registared. Transaction receipt:',
          receipt
        );
        window.alert('Raw Material Supplier registred successfully');

        const newRmsData = [
          ...rmsData,
          {
            id: nextId,
            name: nameRMS,
            place: placeRMS,
            addr: addressRMS,
          },
        ];

        setRmsData(newRmsData);
        localStorage.setItem('rmsData', JSON.stringify(newRmsData));

        setNextId((prevId) => prevId + 1);
        localStorage.setItem('nextID', JSON.stringify(nextId + 1));

        setNameRMS('');
        setAddressRMS('');
        setPlaceRMS('');
      } catch (error) {
        console.log('Error on creating raw material supplier');
      }
    }
  };

  const addMAN = async () => {
    if (contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.addMAN(nameMAN, addressMAN, placeMAN);
        const receipt = await tx.wait();
        console.log('Manufacutred Registered. Transction receipt:', receipt);
        window.alert('Manufacutre registred successfully');

        setNameMAN('');
        setAddressMAN('');
        setPlaceMAN('');
      } catch (error) {
        console.log('Error on registering manufacture');
      }
    }
  };

  const addDST = async () => {
    if (contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.addDST(nameDST, addressDST, placeDST);
        const receipt = await tx.wait();
        console.log('Distributor Registered. Transaction receipt:', receipt);
        window.alert('Distributor registred successfully');

        setNameDST('');
        setAddressDST('');
        setPlaceDST('');
      } catch (error) {
        console.log('Error on registering manufacture');
      }
    }
  };

  const addRTL = async () => {
    if (contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.addRTL(nameRTL, addressRTL, placeRTL);
        const receipt = await tx.wait();
        console.log('Retailer Registered. Transaction receipt:', receipt);
        window.alert('Distributor registred successfully');

        setNameRTL('');
        setAddressRTL('');
        setPlaceRTL('');
      } catch (error) {
        console.log('Error on resitering retailer');
      }
    }
  };

  return (
    <div className="mx-8">
      <div>
        <h1 className="text-3xl mx-4 font-bold my-5 mb-4">registeration</h1>
      </div>
      <div className="mb-12">
        <p className="flex justify-center font-bold bg-slate-100 py-2 px-auto text center my-3">
          Register Raw Material Supplier
        </p>
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Name"
          value={nameRMS}
          onChange={(e) => setNameRMS(e.target.value)}
        />
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Address"
          value={addressRMS}
          onChange={(e) => setAddressRMS(e.target.value)}
        />
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="place"
          value={placeRMS}
          onChange={(e) => setPlaceRMS(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addRMS}
        >
          Register RMS
        </button>
        <div>
        <table>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Place</th>
          <th scope="col">Ethereum Address</th>
        </tr>
      </thead>
      <tbody>
       {rmsData.map((rms, index) => (
      <tr key={index}>
        <td>{rms.id}</td>
        <td>{rms.name}</td>
        <td>{rms.place}</td>
        <td>{rms.addr}</td>
      </tr>
    ))}
      </tbody>
    </table>
        </div>

      </div>
      <div className="mb-12">
        <p className="flex justify-center bg-slate-100 font-bold py-2 px-auto text center my-3">
          Register Manufacture
        </p>
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Name"
          value={nameMAN}
          onChange={(e) => setNameMAN(e.target.value)}
        />
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Address"
          value={addressMAN}
          onChange={(e) => setAddressMAN(e.target.value)}
        />
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Place"
          value={placeMAN}
          onChange={(e) => setPlaceMAN(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addMAN}
        >
          register Manufacture
        </button>
      </div>
      <div className="mb-12">
        <p className="flex justify-center bg-slate-100 font-bold py-2 px-auto text center my-3">
          Register Distributor
        </p>
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Name"
          value={nameDST}
          onChange={(e) => setNameDST(e.target.value)}
        />
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Address"
          value={addressDST}
          onChange={(e) => setAddressDST(e.target.value)}
        />
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Place"
          value={placeDST}
          onChange={(e) => setPlaceDST(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addDST}
        >
          Register Distributor
        </button>
      </div>
      <div className="mb-12">
        <p className="flex justify-center bg-slate-100 font-bold py-2 text-l px-auto text center my-3">
          Register Retailer
        </p>
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1"
          type="text"
          placeholder="Name"
          value={nameRTL}
          onChange={(e) => setNameRTL(e.target.value)}
        />
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Address"
          value={addressRTL}
          onChange={(e) => setAddressRTL(e.target.value)}
        />
        <input
          className="border-gray-300 border rounded px-3 py-2 flex-1 mx-2"
          type="text"
          placeholder="Place"
          value={placeRTL}
          onChange={(e) => setAddressRTL(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addRTL}
        >
          Register Retailer
        </button>
      </div>
    </div>
  );
}

export default Register;
