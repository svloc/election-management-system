const hre = require("hardhat");

async function main() {
  const Election = await hre.ethers.getContractFactory("election"); //fetching bytecode and ABI
  const election = await Election.deploy(); //creating an instance of our smart contract

  await election.waitForDeployment();//deploying your smart contract

  const address = await election.getAddress();
  console.log(`Contract Address: ${address}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});