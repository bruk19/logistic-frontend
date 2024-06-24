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

type MANData = {
  id: number;
  name: string;
  addr: string;
  place: string;
};

type DSTData = {
  id: number;
  name: string;
  addr: string;
  place: string;
};

type RTLData = {
  id: number;
  name: string;
  addr: string;
  place: string;
}

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
  const [manData, setManData] = useState<MANData[]>([]);
  const [distData, setDistData] = useState<DSTData[]>([]);
  const [ritData, setRitData] = useState<RTLData[]>([])

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
    const fetchRMSData = async () => {
      if (contract) {
        try {
          const totalSupply = await contract.rawMatCount();
          const allSupply = [];
          for (let i = 1; i <= totalSupply; i++) {
            const rms = await contract.RMS(i);
            allSupply.push({
              id: i,
              name: rms.name,
              addr: rms._addr,
              place: rms.place,
            });
          }
          setRmsData(allSupply);
        } catch (error) {
          console.error('Error retrieving RMS data:', error);
        }
      }
    };

    fetchRMSData();
  }, [contract]);

  useEffect(() => {
    const fetchMANData = async () => {
      if (contract) {
        try {
          const totalManSupply = await contract.manuCount();
          const allManSupply = [];
          for (let i = 1; i <= totalManSupply; i++) {
            const man = await contract.MAN(i);
            allManSupply.push({
              id: i,
              name: man.name,
              addr: man._addr,
              place: man.place,
            });
          }
          setManData(allManSupply);
        } catch (error) {
          console.error('Error retrieving MAN data:', error);
        }
      }
    };
    fetchMANData();
  }, [contract]);

  useEffect(() => {
    const fetchDSTData = async () => {
      if (contract) {
        try {
          const totalDSTSupply = await contract.distCount();
          const allDSTSupply = [];
          for (let i = 1; i <= totalDSTSupply; i++) {
            const dst = await contract.DST(i);
            allDSTSupply.push({
              id: i,
              name: dst.name,
              addr: dst._addr,
              place: dst.place,
            });
          }
          setDistData(allDSTSupply);
        } catch (error) {
          console.error('Error retreiving DST data:', error);
        }
      }
    };
    fetchDSTData();
  }, [contract]);

  const addRMS = async () => {
    if (contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.addRMS(nameRMS, addressRMS, placeRMS);
        const receipt = await tx.wait();
        console.log(
          'Raw Material Supplier Registered. Transaction receipt:',
          receipt
        );
        window.alert('Raw Material Supplier registered successfully');

        const totalSupply = await contract.rawMatCount();
        const totalSupplyNumber = parseInt(totalSupply.toString(), 10);
        const newRmsData = [...rmsData];
        const newRms = {
          id: totalSupplyNumber,
          name: nameRMS,
          addr: addressRMS,
          place: placeRMS,
        };
        newRmsData.push(newRms);
        setRmsData(newRmsData);

        setNameRMS('');
        setAddressRMS('');
        setPlaceRMS('');
      } catch (error) {
        console.log('Error on creating raw material supplier:', error);
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

        const totalMAN = await contract.manuCount();
        const totalManNumber = parseInt(totalMAN.toString(), 10);
        const newManData = [...manData];
        const newMan = {
          id: totalManNumber,
          name: nameMAN,
          addr: addressMAN,
          place: placeMAN,
        };

        newManData.push(newMan);
        setManData(newManData);

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

        const totalDST = await contract.distCount();
        const totalDSTNumber = parseInt(totalDST.toString(), 10);
        const newDST = [...distData];
        const newDSTData = {
          id: totalDSTNumber,
          name: nameDST,
          addr: addressDST,
          place: placeDST,
        };

        newDST.push(newDSTData);
        setDistData(newDST);

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
        window.alert('Retailer registred successfully');

        const totalRTL = await contract.retailCount()
        const totalRTLNumber = parseInt(totalRTL.toString(), 10)
        const newRTL = [...ritData]
        const newRTLData = {
          id: totalRTLNumber,
          name: nameRTL,
          addr: addressDST,
          place: placeRTL
        };

        newRTL.push(newRTLData);
        setRitData(newRTL);

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
        <h1 className="text-3xl mx-4 font-bold my-7 mb-4">registeration</h1>
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
          <table className="mt-2 w-4/5 gap-y-5">
            <thead className="bg-slate-50 py-3 gap-x-5">
              <tr className="gap-x-5">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Place</th>
                <th scope="col">Ethereum Address</th>
              </tr>
            </thead>
            <tbody>
              {rmsData.map((rms, index) => (
                <tr className="even:bg-gray-100" key={index}>
                  <td className="py-1 px-2 gap-x-2">{rms.id}</td>
                  <td>{rms.name}</td>
                  <td>{rms.place}</td>
                  <td className="flex justify-center">{rms.addr}</td>
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
        <div>
          <table className="mt-2 w-4/5 gap-y-5">
            <thead className="bg-slate-50 py-3 gap-x-5">
              <tr className="gap-x-5">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Place</th>
                <th scope="col">Ethereum Address</th>
              </tr>
            </thead>
            <tbody>
              {manData.map((man, index) => (
                <tr className="even:bg-gray-100" key={index}>
                  <td className="py-1 px-2 gap-x-2">{man.id}</td>
                  <td>{man.name}</td>
                  <td>{man.place}</td>
                  <td className="flex justify-center">{man.addr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <div>
          <table className="mt-2 w-4/5 gap-y-5">
            <thead className="bg-slate-50 py-3 gap-x-5">
              <tr className="gap-x-5">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Place</th>
                <th scope="col">Ethereum Address</th>
              </tr>
            </thead>
            <tbody>
              {distData.map((dst, index) => (
                <tr className="even:bg-gray-100" key={index}>
                  <td className="py-1 px-2 gap-x-2">{dst.id}</td>
                  <td>{dst.name}</td>
                  <td>{dst.place}</td>
                  <td className="flex justify-center">{dst.addr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
