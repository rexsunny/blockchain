const EthSender = artifacts.require("EthSender");

contract("EthSender", (accounts) => {
    const sender = '0xB6D3167C57612629aeac8Dd566B7Db6659C8D663'; //accounts[0]; // The sender's account
    const receiver = '0x2a5fe228559efB4981aAe058DC55D4a3E5B53320'; //accounts[1]; // The receiver's account
    const transferAmount = web3.utils.toWei("0.05", "ether"); // The amount to be transferred
    
    it("should send 0.05 ETH from the sender to the receiver and check balances", async () => {
        // Deploy the EthSender contract with the receiver's address
        const instance = await EthSender.new(receiver, { from: sender });

        // Get the initial balances of the sender and receiver
        const initialSenderBalance = await web3.eth.getBalance(sender);
        const initialReceiverBalance = await web3.eth.getBalance(receiver);

        // Log the initial balances
        console.log("Initial Sender Balance:", web3.utils.fromWei(initialSenderBalance, "ether"), "ETH");
        console.log("Initial Receiver Balance:", web3.utils.fromWei(initialReceiverBalance, "ether"), "ETH");

        // Call the sendEther function and send 0.05 ETH
        const tx = await instance.sendEther({ from: sender, value: transferAmount });

        // Get the balances after the transfer
        const finalSenderBalance = await web3.eth.getBalance(sender);
        const finalReceiverBalance = await web3.eth.getBalance(receiver);

        // Log the final balances
        console.log("Final Sender Balance:", web3.utils.fromWei(finalSenderBalance, "ether"), "ETH");
        console.log("Final Receiver Balance:", web3.utils.fromWei(finalReceiverBalance, "ether"), "ETH");

        // Log the sender, receiver, and the amount transferred
        console.log("Sender Address:", sender);
        console.log("Receiver Address:", receiver);
        console.log("Amount Transferred:", web3.utils.fromWei(transferAmount, "ether"), "ETH");

        // Assertions to verify the balances
        assert(finalReceiverBalance > initialReceiverBalance, "Receiver balance should have increased by 0.05 ETH");
        assert(finalSenderBalance < initialSenderBalance, "Sender balance should have decreased by 0.05 ETH plus gas cost");

        // Verify the transaction amount in the contract's event logs (if applicable)
        // Example: check that the gas cost didn't use all the funds
        const gasUsed = tx.receipt.gasUsed;
        const txDetails = await web3.eth.getTransaction(tx.tx);
        const gasCost = web3.utils.toBN(gasUsed).mul(web3.utils.toBN(txDetails.gasPrice));

        // Final assertion to check that the gas cost + transfer amount is deducted correctly
        const expectedSenderBalance = web3.utils.toBN(initialSenderBalance).sub(web3.utils.toBN(transferAmount)).sub(gasCost);
        assert(finalSenderBalance.startsWith(expectedSenderBalance.toString()), "Sender balance after transfer and gas cost deduction should match");
    });
});
