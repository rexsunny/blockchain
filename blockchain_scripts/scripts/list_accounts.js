module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log("Available Accounts:");
        accounts.forEach((account, index) => {
            console.log(`Account ${index + 1}: ${account}`);
        });
        callback();
    } catch (error) {
        console.error("Error fetching accounts:", error);
        callback(error);
    }
};
