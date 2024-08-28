const SimpleContract = artifacts.require("SimpleContract");
const AnotherContract = artifacts.require("AnotherContract");
const BlockHashInfo = artifacts.require("BlockHashInfo");
const BlockInfo = artifacts.require("BlockInfo");

module.exports = function (deployer) {
  deployer.deploy(SimpleContract);
  deployer.deploy(AnotherContract, 100);  // Passing an initial value of 100
  deployer.deploy(BlockHashInfo);
  deployer.deploy(BlockInfo);
};
