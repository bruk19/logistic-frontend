import React from 'react'

function Front() {
  return (
    <div>
      <h1 className='text-3xl text-center font-bold mt-6'>Product Supply Chain Flows</h1>
      <div>
        <div className='mt-5 bg-gray-300 p-4 rounded-md w-4/5 mx-auto'>
        <h2 className='text-xl font-bold'>Step1:Owner should register Raw Material Supplieres, Manufacturers, Distributors and Retailers</h2>
        <p className='mt-1'>(Note: This is one step. Skip to step 2 if already done)</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Register</button>
      </div>
      <div className='mt-5 bg-gray-300 p-4 rounded-md w-4/5 mx-auto'>
        <h2 className='text-xl font-bold'>Step2: Owner should order product</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Order Product</button>
      </div>
      <div className='mt-5 bg-gray-300 p-4 rounded-md w-4/5 mx-auto '>
        <h2 className='text-xl font-bold'>Step3: Control Supply Chain</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Control Supply Chain</button>
      </div>
      <div className='border-b-[3px] w-full mt-2'></div>
      <div className='mt-5 bg-gray-300 p-4 rounded-md w-4/5 mx-auto'>
        <h2 className='text-xl font-bold'>Track Product</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Track Product</button>
      </div>
      </div>
    </div>
  )
}

export default Front