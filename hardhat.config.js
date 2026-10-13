// ═══════════════════════════════════════════════════════════════════════════
//  ▓▒░ HARDHAT CONFIG · ARKHÉ ZERO · ◯_● ░▒▓
// ═══════════════════════════════════════════════════════════════════════════

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    mainnet: {
      url: process.env.ETHEREUM_RPC || '',
      accounts: process.env.DEPLOYER_KEY ? [process.env.DEPLOYER_KEY] : [],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC || 'https://rpc.sepolia.org',
      accounts: process.env.DEPLOYER_KEY ? [process.env.DEPLOYER_KEY] : [],
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  arkhe: {
    seal: '◯_● · 51/49/100',
    pact: '51/49/100',
    indexZeroSha256: 'f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112',
  },
};

export default config;