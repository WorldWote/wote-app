import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const config: HardhatUserConfig = {
  solidity: "0.8.21",
  networks: {
    mumbai: {
      url: process.env.MUMBAI,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
    op_goerli: {
      url: process.env.OP_GOERLI,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
    scroll_sepholia: {
      url: process.env.SCROLL_SEPHOLIA,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: {
      optimisticGoerli: process.env.OP_GOERLI_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY
    }
  },

};

export default config;
