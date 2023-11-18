# World Id base voting


```shell
cd blockchain
npm install .
npx hardhat test
npx hardhat run --network op_goerli .\scripts\deploy.ts - deployment wote on op_goerli
npx hardhat run --network goerli .\scripts\deploy-receiver-goerli.ts - deployment receiver on goerli
```


### Deployment
- Receiver Address GOERLI: https://goerli.etherscan.io/address/0x9899EDEB43e52A6ac30EC5979f548BF89db12887#readContract
- Receiver Address SCROLL_SEPOLIA: https://sepolia.scrollscan.dev/address/0xf8fCa17e8fc92AD26Bfa8E5CcD5900Aeb48d751D
- Wote Address on optimism goerli: https://goerli-optimism.etherscan.io/address/0x4E493aFEd872c504147551860aEE036518698F96