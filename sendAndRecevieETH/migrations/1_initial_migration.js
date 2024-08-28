const EthSender = artifacts.require("EthSender");

module.exports = function(deployer) {
  // Define the receiver address
  const receiverAddress = "0xB6D3167C57612629aeac8Dd566B7Db6659C8D663";

  // Deploy the EthSender contract with the receiver address
  deployer.deploy(EthSender, receiverAddress);
};
