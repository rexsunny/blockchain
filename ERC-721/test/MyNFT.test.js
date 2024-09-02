const MyNFT = artifacts.require("MyNFT");

contract("MyNFT", (accounts) => {
  let myNFT;

  before(async () => {
    myNFT = await MyNFT.deployed();
  });

  it("should deploy the contract and set the correct name and symbol", async () => {
    const name = await myNFT.name();
    const symbol = await myNFT.symbol();
    assert.equal(name, "MyNFT");
    assert.equal(symbol, "MNFT");

    console.log("Name of NFT: ", name)
    console.log("Symbol of NFT: ", symbol)
  });

  it("should mint a new token and assign it to the correct owner", async () => {
    const recipient = accounts[1];
    await myNFT.mint(recipient);

    console.log("Receipient address: ", recipient)
    
    const tokenId = 0;
    const owner = await myNFT.ownerOf(tokenId);

    console.log("Owner of NFT address: ", owner)

    assert.equal(owner, recipient, "The owner of the first token should be the recipient");
  });

  it("should increase the nextTokenId after minting", async () => {
    const initialTokenId = await myNFT.nextTokenId();
    
    console.log("Initial Token Id: ", initialTokenId.toNumber())

    await myNFT.mint(accounts[2]);
    
    console.log("Next receipient of NFT: ", accounts[2])
    
    const newTokenId = await myNFT.nextTokenId();
    
    console.log("New Token Id: ", newTokenId.toNumber())
    
    assert.equal(newTokenId.toNumber(), initialTokenId.toNumber() + 1, "The nextTokenId should increase by 1 after minting");
  });

  it("should return the correct base URI", async () => {
    const baseURI = await myNFT.getBaseURI();
    
    console.log("baseURI is: ", baseURI)

    assert.equal(baseURI, "https://api.mynft.com/metadata/");
  });
});
