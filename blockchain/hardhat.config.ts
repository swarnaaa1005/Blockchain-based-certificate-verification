import "@nomicfoundation/hardhat-ethers";
import { defineConfig } from "hardhat/config";
import "dotenv/config";

export default defineConfig({
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    ganache: {
      type: "http",
      url: "http://127.0.0.1:7545",
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },

    // sepolia: {
    //   type: "http",
    //   url: process.env.SEPOLIA_RPC_URL || "",
    //   accounts: process.env.SEPOLIA_PRIVATE_KEY
    //     ? [process.env.SEPOLIA_PRIVATE_KEY]
    //     : [],
    // },
  },
});
