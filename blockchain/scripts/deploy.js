import hre from "hardhat";

async function main() {
  // Access ethers from Hardhat Runtime Environment
  const { ethers } = hre;

  // Make sure your contract name exactly matches the Solidity contract
  const Counter = await ethers.getContractFactory("Counter");

  // Deploy the contract
  const counter = await Counter.deploy();

  // Wait until deployment is mined
  await counter.deployed();

  console.log("Counter deployed to:", counter.address);
}

// Catch errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
