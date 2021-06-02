# Files Validations Systems
#### Developed by the Blockchain Paladins :crossed_swords: :shield:

- Diego Karabin
- José Pérez
- Juan Miguel Sanchez Mola

## Instructions

1. Clone the repo and cd into it `git clone https://github.com/DiegoKarabin/files-validation-system.git && cd files-validation-system`
2. Install deps with yarn `yarn` or npm `npm install`
3. Copy the `.env.example` file and fill your mnemonic in the MNEMONIC variable to use your metamask accounts when using the local network.

`cp .env.example .env`

4. Start hardhat `yarn hardhat:node`

This project supports <b>Binance Smart Chain</b> to develop to `testnet` use this:

`yarn hardhat:deploy --network bscTestnet`

To deploy to `mainnet` use this:

`yarn hardhat:deploy --network bscMainnet`

5. Open up a new terminal
6. Enter the frontend directory: `cd frontend`
7. Install dependencies: `npm install`
8. If you are using a local network. Ensure Metamask RPC is set to `http://localhost:8545` and chainID `31337`.
9. Start the React app: `yarn start`

The app also can be started from the root folder with:

`yarn frontend`

The frontend should open at http://localhost:3000/

Because of this default hardhat.config.ts it will first try to connect with an injected provider like Metamask (web3modal package does this).

If nothing found it will try to connect with your hardhat node. On localhost and hardhat nodes it will inject your mnemonic into the frontend so you have a "browser wallet" that can both call and send transactions. NB! Dont ever put a mnemonic with actual value here.
