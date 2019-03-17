require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');

const utils = require('web3-utils');

// https://ethgasstation.info/
const gasPrice = n => utils.toWei(n.toString(), 'gwei')
// console.log(gasPrice(123), process.env.PRIVATE_KEY, process.env.INFURA_API_KEY, `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`) 
// console.log(new HDWalletProvider([process.env.PRIVATE_KEY], `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`))

const getProvider = type => () => {
  const provider = new HDWalletProvider(
    [process.env.PRIVATE_KEY], 
    `https://${type}.infura.io/v3/${process.env.INFURA_API_KEY}`
  )  
  

  return provider
}

module.exports = {
  contracts_directory: './contracts',
  contracts_build_directory: "./build/contracts",
  mocha: {
    useColors: true
  },
  compilers: {
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
      provider: getProvider('mainnet'),
      gas: 5000000,
      gasPrice: gasPrice(Number(process.env.GAS_PRICE_MAIN_NETWORK)),
      confirmations: 2,
      network_id: 1
    },
    rinkeby: {
      provider: getProvider('rinkeby'),
      gas: 5000000,
      gasPrice: gasPrice(12),
      network_id: 4
    },
    ropsten: {
      provider: getProvider('ropsten'),
      gas: 5000000,
      gasPrice: gasPrice(12),
      network_id: 3
    }
  }
}