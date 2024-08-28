const MyERC20Token = artifacts.require("MyERC20Token");

module.exports = function (deployer) {
  // const initialSupply = web3.utils.toWei('1000', 'ether'); // 1000 tokens with 18 decimals
  const initialSupply = 1000; // 1000 tokens 
  deployer.deploy(MyERC20Token, initialSupply);
};
