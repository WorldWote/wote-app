import { ethers } from "hardhat";

const hre = require("hardhat");

const MAILBOX_ADDRESS = "0x3C5154a193D6e2955650f9305c8d80c18C814A68"

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


async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deployer address: ${deployer.address}`)

    // deploying receiver
    const Receiver = await ethers.getContractFactory("Receiver");
    const receiver = await Receiver.deploy(MAILBOX_ADDRESS);
    console.log(`Receivers address: ${receiver.address}`)

    // verifying contracts
    await verifyContract(receiver.address, [MAILBOX_ADDRESS]);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});