const { ethers } = require("ethers");
const { CONTRACT_ADDRESS } = require("./contractAddress.cjs");
const abi = require("./artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json").abi;

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // ✅ Hardhat
const wallet = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  abi,
  wallet
);

module.exports = contract;
