require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('dotenv').config()

require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy-ethers");
require("hardhat-deploy");
require("@symfoni/hardhat-react");
require("hardhat-typechain");
require("@typechain/ethers-v5");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const mnemonic = process.env.MNEMONIC

module.exports = {
  react: {
    providerPriority: ['web3modal', 'hardhat']
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/DVoO1-qsfYz7eRuyS6He_LAO82-ZWGuQ",
        blockNumber: 12420727
      }
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic }
    },
    bscMainnet: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 20000000000,
      accounts: { mnemonic }
    }
  },
  solidity: {
    compilers: [{
      version: "0.8.4",
      settings: {
        optimizer: {
          enabled: true,
          runs: 50
        }
      }
    }]
  },
  gasReporter: {
    currency: 'USD'
  }
};


/*import * as dotenv from 'dotenv'
import 'hardhat-deploy-ethers'
import 'hardhat-deploy'
import 'hardhat-typechain'
import '@typechain/ethers-v5'

require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("hardhat-gas-reporter");

*/