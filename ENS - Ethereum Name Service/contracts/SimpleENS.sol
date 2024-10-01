// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SimpleENS {
    mapping(string => address) public nameToAddress;
    //For example, by declaring mapping(string => address) public nameToAddress;, Solidity will generate the following getter function for free:
    //    function nameToAddress(string memory name) public view returns (address) {
    //    return nameToAddress[name];
    //}



    function registerName(string memory name, address addr) public {
        require(nameToAddress[name] == address(0), "Name already taken");
        nameToAddress[name] = addr;
    }

    function resolveName(string memory name) public view returns (address) {
        return nameToAddress[name];
    }
}
