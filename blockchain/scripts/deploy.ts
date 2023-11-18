import { ethers } from "hardhat";

import * as fs from 'fs';
import * as path from 'path';

const hre = require("hardhat");

const WORLD_ID_ADDRESS = "0x38f6e15d86574b2d12ddc119b411C7027bcE349c";
const APP_ID = "app_staging_8e51b49daa766cfd178b3c6495f0d61a"
const ACTION_ID = "ioseb-x"


const FRONTEND_ABI_DIR = (process.env.FRONTEND_ABI_DIR) ? process.env.FRONTEND_ABI_DIR:"../frontend/src/contracts/abis"
const FRONTEND_ADDRESSES_DIR = (process.env.FRONTEND_ADDRESSES_DIR) ? process.env.FRONTEND_ADDRESSES_DIR:"../frontend/src/contracts"

function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s*1000));
}

async function verifyContract(contractAddress, args) {
  await sleep(120)
  try{
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    });
    console.log("Source Verified");

  }
  catch (err) {
    console.log("error verify", err.message);
  }

}

async function getAbi(contractName: string) {
  const dir = path.resolve(`./artifacts/contracts/${contractName}.sol/${contractName}.json`)
  const file = fs.readFileSync(dir, "utf8")
  const json = JSON.parse(file)
  return json.abi
}

async function main() {
  const [deployer] = await ethers.getSigners();

  const Wote = await ethers.getContractFactory("Wote");

  const vote = await Wote.deploy(WORLD_ID_ADDRESS, APP_ID, ACTION_ID);
  console.log(`Deployer address: ${deployer.address}`)
  console.log(`Wote address: ${vote.address}`)
  await verifyContract(vote.address, [WORLD_ID_ADDRESS, APP_ID, ACTION_ID]);

  const contracts = JSON.stringify({
    Wote: vote.address
  }, null, 4)

  const woteAbi = JSON.stringify(await getAbi("Wote"), null, 4)

  fs.writeFile(`${FRONTEND_ABI_DIR}/Wote.json`, woteAbi, function (err  ){
    if (err) {
      console.log("error while writing in Wote.json", err)
    }
  });

  fs.writeFile(`${FRONTEND_ADDRESSES_DIR}/addresses.json`, contracts, function (err  ){
    if (err) {
      console.log("error while writing in Wote.json", err)
    }
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});