'use client';
import React, { useState } from 'react'

function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
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
  )
}

export default Header;