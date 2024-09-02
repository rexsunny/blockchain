const { Web3 } = require('web3'); // Use named import for Web3 in newer versions

// Initialize Web3 with the correct Ganache CLI URL
const web3 = new Web3('http://127.0.0.1:8545');

async function listAccounts() {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log("Accounts:", accounts);
    } catch (error) {
        console.error("Error fetching accounts:", error);
    }
}

listAccounts();

// node list_accounts-web3.js