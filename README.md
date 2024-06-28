# Supply Chain Management Frontend

> This is a decentralized supply chain management application built with Next.js and Solidity Ethereum smart contracts. It allows tracking of products through various stages of the supply chain, from raw material supply to retail sale.

## Features
- Features

- Connect with MetaMask wallet to interact with the application
- Owner can register supply chain participants:

  - Raw Material Suppliers
  - Manufacturers
  - Distributors
  - Retailers


- Owner can add new products to the system
- Track product stages:

  - Raw Material Supply
  - Manufacture
  - Distribution
  - Retail
  - Sold


- View detailed information about a product using its ID
- Participants can update the stage of a product as it moves through the supply chain

## Technologies Used
#### Frontend:
Next.js 13 (with app directory)
React 18
TypeScript
Tailwind CSS for styling


#### Backend:
Solidity for smart contracts
Ethers.js for interacting with Ethereum blockchain
Web3.js for additional Ethereum interactions


#### Development Tools:
Hardhat (assumed, for smart contract development and testing)

## Live Demo ()

[Live Demo Link]()

## Prerequisites

- Node.js (version 14 or later recommended)
- MetaMask browser extension
- Basic understanding of React, Next.js, and Ethereum blockchain

## Getting Started
1. Clone the repository:
Copy code `git clone git@github.com:bruk19/logistic-frontend.git`
cd votingsystem-frontend

2. Install dependencies:
Copy code npm install
# or
yarn install

3. Set up environment variables:

Create a .env.local file in the root directory.
Add the following variables:
Copy codeNEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
Replace your_contract_address with the deployed Voting System smart contract address.


4. Run the development server:
Copy codenpm run dev
# or
yarn dev

5. Open http://localhost:3000 in your browser to see the application.


## Usage
1. Connect your MetaMask wallet to the application.
Create a new voting system:

2. If you're the owner:
Register supply chain participants (Raw Material Suppliers, Manufacturers, Distributors, Retailers)
Add new products to the system


3. For participants:
Update the stage of products as they move through the supply chain


4. For anyone:
Track a product's current stage and history using its ID


## Smart Contract
The application interacts with a Solidity smart contract named VotingSystem. The contract's ABI and address are imported from the constants/voting.ts file. Make sure your smart contract is deployed on a compatible Ethereum network (e.g., Sepolia testnet) and update the contract address in the .env.local file.

### Prerequisites
- Have a computer and internet connection
- Have a basic knowledge of TypeScript
- Have a basic knowledge of Solidity
- Have a general understanding of what testing is
- Have visual-studio code or any other code editor installed on your computer.

### Smart Contract
The application interacts with a Solidity smart contract named LogisticSupply. Ensure that your smart contract is deployed on a compatible Ethereum network and update the contract address in the .env.local file.

### Setup
- Open your terminal in the folder where you want to have the project and run `git clone git@github.com:bruk19/logistic-frontend.git` to clone the project.
- Run `logistic-frontend` to move to the project directory.

### 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

### License
This project is open-source and available under the MIT License.

### Acknowledgements
- The Ethereum community for providing tools and resources.
- Next.js and React communities for the fantastic frameworks.

## Author
👤 **Bruk Teshome**

- GitHub: [@githubhandle](https://github.com/bruk19)
- Twitter: [@twitterhandle](https://twitter.com/Bruktesh)
- LinkedIn: [LinkedIn](https://linkedin.com/in/bruk-teshome)


Feel free to check the [issues page](https://github.com/bruk19/logistic-frontend/issues).

## Show your support

Give a ⭐️ if you like this project!


## 📝 License

This project is [MIT](./LICENSE) licensed.

_NOTE: we recommend using the [MIT license](https://choosealicense.com/licenses/mit/) - you can set it up quickly by [using templates available on GitHub](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository). You can also use [any other license](https://choosealicense.com/licenses/) if you wish._
