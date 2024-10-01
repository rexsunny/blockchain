const SimpleENS = artifacts.require("SimpleENS");

module.exports = function(deployer) {
  deployer.deploy(SimpleENS);
};
