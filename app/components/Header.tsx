'use client';
import React from 'react'

function Header() {
  return (
    <div className='w-full flex py-4 bg-zinc-600 px-32 justify justify-between'>
      <div>
        <h1 className='text-slate-50 text-lg font-sans font-bold'>Logistic-Supply</h1>
      </div>
      <div>
        <ul className="flex text-slate-50 gap-x-10">
        <li>Register</li>
        <li>Order Product</li>
        <li>Control Supply Chain</li>
        <li>Track Product</li>
      </ul>
      </div>
    </div>
  )
}

export default Header;