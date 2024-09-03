**Description:**  
This project implements an ERC-721 non-fungible token (NFT) smart contract named `MyNFT`. The project includes a set of Truffle tests that validate the contract's core functionality, including deploying the contract, minting new tokens, and verifying token ownership.

**Key Features:**
- **ERC-721 Compliance:** Implements the ERC-721 standard for NFTs, ensuring each token is unique and can be transferred or owned by different accounts.
- **Token Minting:** Allows minting of new tokens, with each token being assigned a unique ID and associated with a specific owner.
- **Base URI Management:** Supports setting and retrieving a base URI for token metadata.
- **Comprehensive Testing:** Includes automated tests for deployment, minting, ownership verification, and URI management.

**Test Scenarios:**
   - **Contract Deployment:** Ensures the `MyNFT` contract is deployed with the correct name (`MyNFT`) and symbol (`MNFT`).
   - **Minting Tokens:** Verifies that a new token can be minted and assigned to the correct owner.
   - **Token ID Management:** Confirms that the `nextTokenId` increases correctly after each minting.
   - **Base URI Retrieval:** Checks that the base URI for metadata is correctly returned.

**Requirements:**
- Node.js and npm
- Truffle Suite
- Ganache or any Ethereum-compatible blockchain for testing

**License:**
This project is licensed under the MIT License.
