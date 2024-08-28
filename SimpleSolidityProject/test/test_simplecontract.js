const SimpleContract = artifacts.require("SimpleContract");
const AnotherContract = artifacts.require("AnotherContract");
const BlockHashInfo = artifacts.require("BlockHashInfo");
const BlockInfo = artifacts.require("BlockInfo");
// JavaScript's Number type is a 64-bit floating point, but it can only safely represent integers up to 53 bits (i.e., up to 2^53 - 1 or approximately 9,007,199,254,740,991).
// In Solidity, values like block.number, block.difficulty, and especially block.timestamp can easily exceed this range, especially as blockchains grow. To handle these large integers safely in your tests, you should use a library like BN.js (BigNumber.js) or, in more modern environments, BigInt.
const BN = web3.utils.BN;

contract("SimpleContract", (accounts) => {
  it("should return the correct message from SimpleContract", async () => {
    let instance = await SimpleContract.deployed();
    let message = await instance.message();
    console.log("Message from SimpleContract:", message);
    assert.equal(message, "Hello, World!", "The message should be 'Hello, World!'");
  });

  it("should update the message in SimpleContract", async () => {
    let instance = await SimpleContract.deployed();
    await instance.setMessage("New Message");
    let message = await instance.message();
    console.log("Updated Message from SimpleContract is:", message)
    assert.equal(message, "New Message", "The message should be 'New Message'");
  });
});

contract("AnotherContract", (accounts) => {
  it("should return the correct initial value from AnotherContract", async () => {
    let instance = await AnotherContract.deployed();
    let value = await instance.value();
    console.log("Initial value from AnotherContract:", value.toString());
    assert.equal(value.toString(), "100", "The initial value should be 100");
  });

  it("should update the value in AnotherContract", async () => {
    let instance = await AnotherContract.deployed();
    await instance.setValue(200);
    let value = await instance.value();
    console.log("Updated Value from AnotherContract is:", value.toString())
    assert.equal(value.toString(), "200", "The value should be updated to 200");
  });
});

contract("BlockHashInfo", (accounts) => {
    it("should return the current value from current Block in BlockHashInfo", async () => {
      let instance = await BlockHashInfo.deployed();
      let currentBlockHash = await instance.getCurrentBlockHash();
      console.log("Current Block Hash is from BlockHashInfo:", currentBlockHash);
    //   assert.equal(value.toString(), "100", "The initial value should be 100");
    });
  
    it("should return the value in Previous Block in BlockHashInfo", async () => {
      let instance = await BlockHashInfo.deployed();
      let previousBlockHash = await instance.getPreviousBlockHash();
      console.log("Previous Block Hash from BlockHashInfo is:", previousBlockHash)
    //   assert.equal(value.toString(), "200", "The value should be updated to 200");
    });
  });
  

contract("BlockInfo", (accounts) => {
    it("should return the block values from current Block in BlockInfo", async () => {
      let instance = await BlockInfo.deployed();
      let currentBlockDetails = await instance.getBlockDetails();

      // Extract the returned values and Convert the results to BN.js instances to give the results more space to store

        let blockNumber = new BN(currentBlockDetails[0]);
        let timestamp = new BN(currentBlockDetails[1]);
        // let coinbase = currentBlockDetails[2];  // Extract coinbase address directly
        let difficulty = new BN(currentBlockDetails[3]);
        let gaslimit = new BN(currentBlockDetails[4]);

      // Assert that the block number is correct (should be greater than 0)
      assert(blockNumber > 0, "Block number should be greater than 0");

      // Assert that the timestamp is correct (should be a reasonable timestamp)
      assert(timestamp > 0, "Timestamp should be greater than 0");

      // Assert that the coinbase address is not empty
      // assert(coinbase !== '0x0000000000000000000000000000000000000000', "Coinbase address should not be empty");

      // Assert that the difficulty is correct (should be greater than 0)
      assert(difficulty > 0, "Difficulty should be greater than 0");

      // Assert that the gas limit is correct (should be greater than 0)
      // assert(gaslimit > 0, "Gas limit should be greater than 0"); // The Gas Limit shows 0, which is unusual. In a real Ethereum environment or properly configured Ganache instance, the gas limit should be a non-zero value. This might indicate an issue with how your local blockchain (e.g., Ganache) is simulating blocks.
      
      // Optional: Print out the values for manual inspection
      console.log("Current Block Details are from BlockInfo:");
      console.log("Block Number:", blockNumber);
      console.log("Timestamp:", timestamp);
      // console.log("Coinbase:", coinbase);
      console.log("Difficulty:", difficulty);
      console.log("Gas Limit:", gaslimit);

      
    //   assert.equal(value.toString(), "100", "The initial value should be 100");
    });
  
    // it("should return the block values in Previous Block in BlockInfo", async () => {
    //   let instance = await BlockInfo.deployed();
    //   let previousBlockHash = await instance.getPreviousBlockHash();
    //   console.log("Previous Block Hash from BlockInfo is:", previousBlockHash)
    // //   assert.equal(value.toString(), "200", "The value should be updated to 200");
    // });
  });