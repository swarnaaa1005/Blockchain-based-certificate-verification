require("dotenv").config();
const { ethers } = require("ethers");
const { CONTRACT_ADDRESS } = require("./contractAddress.cjs");
const abi = require("./artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json").abi;
console.log("RPC URL:", process.env.RPC_URL);
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);// ✅ Hardhat
const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  abi,
  wallet
);

/* 🔽 ADD THIS HERE (BOTTOM) */
(async () => {
  const balance = await provider.getBalance(wallet.address);
  console.log("Wallet address:", wallet.address);
  console.log("Balance:", ethers.formatEther(balance));
})();

module.exports = contract;
