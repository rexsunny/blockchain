// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract SimpleContract {
    string public message;

    constructor() {
        message = "Hello, World!";
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}

contract AnotherContract {
    uint public value;

    constructor(uint initialValue) {
        value = initialValue;
    }

    function setValue(uint newValue) public {
        value = newValue;
    }
}

contract BlockHashInfo {
    function getPreviousBlockHash() public view returns (bytes32) {
        // Fetch the hash of the previous Block
        return blockhash(block.number - 1);
    }

    function getCurrentBlockHash() public view returns (bytes32) {
        // Fetch the hash of the current block
        return blockhash(block.number);
    }
}

contract BlockInfo {
    function getBlockDetails() public view returns (
        uint256 blockNumber,
        uint256 timestamp,
        // address coinbase,
        uint256 difficulty,
        uint256 gaslimit
    ) {
        return (
            block.number,      // Returns the block number
            block.timestamp,   // Returns the block timestamp
            // block.coinbase,    // Returns the address of the miner/validator
            block.difficulty,  // Returns the difficulty of the current block
            block.gaslimit    // Returns the gas limit of the current block
        );
    }
}