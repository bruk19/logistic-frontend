import React from 'react'

function Front() {
  return (
    <div>
      <h1>Product Supply Chain Flows</h1>
      <div>
        <h2>Step1:Owner should register Raw Material Supplieres, Manufacturers, Distributors and Retailers</h2>
        <p>(Note: This is one step. Skip to step 2 if already done)</p>
        <button>Register</button>
      </div>
      <div>
        <h2>Step2: Owner should order product</h2>
        <button>Order Product</button>
      </div>
      <div>
        <h2>Step3: Control Supply Chain</h2>
        <button>Control Supply Chain</button>
      </div>
      <div>
        <h2>Track Product</h2>
        <button>Track Product</button>
      </div>
    </div>
  )
}

export default Front