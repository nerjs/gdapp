const checkOwner = require('./custom/owned')

const TestOwned = artifacts.require('TestOwned')

contract('TestOwned', accounts => {

    checkOwner(TestOwned, accounts)

})