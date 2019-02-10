const TestOwned = artifacts.require('TestOwned')

module.exports = function(deployer, network, accounts) {
  if (process.env.NODE_ENV === 'test' && network === 'development') {

    deployer.deploy(TestOwned);

  }
};
