require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-pkey');

const utils = require('web3-utils');

// https://ethgasstation.info/
const gasPrice = n => utils.toWei(n.toString(), 'gwei')

module.exports = {
  contracts_directory: './contracts',
  contracts_build_directory: "./build/contracts",
  // plugins: [ "truffle-analyze" ],
  mocha: {
    useColors: true
  },
  compilers: {
    // external: {
    //   command: "./compile-contracts",
    //   targets: [{
    //     properties: {
    //       contractName: "MyContract",
    //       /* other literal properties */
    //     },
    //     fileProperties: {
    //       abi: "./output/contract.abi",
    //       bytecode: "./output/contract.bytecode",
    //       /* other properties encoded in output files */
    //     }
    //   }]
    // },
      solc: {
          version: "0.5.0", 
          settings: {
            optimizer: {
              enabled: true,
              runs: 200   // Optimize for how many times you intend to run the code
            }
          }
      }
  },
  networks: {
    development: {
      host: process.env.HOST_RPC,
      port: Number(process.env.PORT_RPC),
      network_id: "*", // Match any network id
      gas: 6500000,
      gasPrice: gasPrice(10),
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,
      gasPrice: gasPrice(Number(process.env.GAS_PRICE_MAIN_NETWORK)),
      confirmations: 2,
      network_id: 1
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,
      gasPrice: gasPrice(12),
      network_id: 4
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,
      gasPrice: gasPrice(12),
      network_id: 3
    }
  }
}