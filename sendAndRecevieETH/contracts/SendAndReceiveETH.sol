// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthSender {
    address payable public receiver;

    constructor(address payable _receiver) {
        receiver = _receiver;
    }

    function sendEther() public payable {
        require(msg.value == 0.05 ether, "You must send exactly 0.05 ETH");
        require(address(this).balance >= msg.value, "Insufficient balance in contract");

        // Transfer 0.05 ETH to the receiver
        receiver.transfer(msg.value);
    }

    // Function to get the contract's balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}