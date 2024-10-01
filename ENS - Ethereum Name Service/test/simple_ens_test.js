const SimpleENS = artifacts.require("SimpleENS");

contract("SimpleENS", (accounts) => {
  it("should register a name", async () => {
    const ens = await SimpleENS.deployed();
    await ens.registerName("test.eth", accounts[0]);
    const registeredAddress = await ens.resolveName("test.eth");
    console.log("Registered address for test.eth is: ", registeredAddress,'\n\n\n')
    
    assert.equal(registeredAddress, accounts[0], "The address should be registered for the name");
  });

  it("should not allow registering the same name twice", async () => {
    const ens = await SimpleENS.deployed();
    try {
      await ens.registerName("test2.eth", accounts[1]);
    //   assert.fail("The name should already be taken"); // no need. The line assert.fail("The name should already be taken"); is placed inside the try block. Since the transaction fails and the error is thrown, the flow jumps directly into the catch block, and this line is never reached.
    } catch (err) {
      assert.ok(/Name already taken/.test(err.message), "Expected error not thrown");
    }
  });
});
