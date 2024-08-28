const MyToken = artifacts.require("MyERC20Token");

contract("MyToken", (accounts) => {
    const [owner, recipient, spender] = accounts;

    it("should mint tokens to the owner", async () => {
        const instance = await MyToken.deployed();
        let balance = await instance.balanceOf(owner);
        
        console.log("Onwer address is: ", owner);
        console.log("Owner's current balance is: ", balance.toString());

        // assert.equal(balance.toString(), '1000', "Initial supply should be 1000 MTK");
        assert.equal(balance.toString(), web3.utils.toWei('1000','ether'), "Initial supply should be 1000 MTK");

    });

    it("should transfer tokens correctly", async () => {
        const instance = await MyToken.deployed();
        await instance.transfer(recipient, web3.utils.toWei('100', 'ether'), { from: owner });
        let balance = await instance.balanceOf(recipient);
        
        console.log("Recipient address is: ", recipient);
        console.log("Recipient's current balance is: ", balance.toString());
        
        assert.equal(web3.utils.fromWei(balance, 'ether'), '100', "Recipient should have 100 MTK");

        balance = await instance.balanceOf(owner);
        console.log("Owner's current balance is: ", balance.toString());
    });

    it("should approve and transfer tokens on behalf", async () => {
        const instance = await MyToken.deployed();
        await instance.approve(spender, web3.utils.toWei('50', 'ether'), { from: owner });
        let allowance = await instance.allowance(owner, spender);
        
        console.log("Spender address is: ", spender);
        console.log("Spender's current balance is: ", allowance.toString());
        
        assert.equal(web3.utils.fromWei(allowance, 'ether'), '50', "Spender should have an allowance of 50 MTK");

        await instance.transferFrom(owner, recipient, web3.utils.toWei('50', 'ether'), { from: spender });
        let balance = await instance.balanceOf(recipient);

        console.log("Balance of recipient's address :",recipient, balance.toString())

        assert.equal(web3.utils.fromWei(balance, 'ether'), '150', "Recipient should have 150 MTK after transfer");

        balance = await instance.balanceOf(spender);

        console.log("Balance of spender's address :",spender, balance.toString())

        balance = await instance.balanceOf(owner);
        console.log("Owner's current balance is: ", balance.toString());
    });

    it("should burn tokens correctly", async () => {
        const instance = await MyToken.deployed();
        await instance.burn(web3.utils.toWei('10', 'ether'), { from: recipient });
        let balance = await instance.balanceOf(recipient);
        
        console.log("Recipient address is: ", recipient);
        console.log("Recipient's current balance is: ", balance.toString());
        
        assert.equal(web3.utils.fromWei(balance, 'ether'), '140', "Recipient should have 140 MTK after burning 10 MTK");

        balance = await instance.balanceOf(owner);
        console.log("Owner's current balance is: ", balance.toString());
    });
});
