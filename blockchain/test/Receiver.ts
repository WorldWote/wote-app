import {
    loadFixture,
} from "@nomicfoundation/hardhat-network-helpers";
import { ethers, network  } from "hardhat";
import { expect } from "chai";

const WORLD_ID_ADDRESS = "0x38f6e15d86574b2d12ddc119b411C7027bcE349c";
const APP_ID = "test"
const ACTION_ID = "test"
const MAILBOX_ADDRESS = "0x38f6e15d86574b2d12ddc119b411C7027bcE349c";

describe("Wote", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {

        // Contracts are deployed using the first signer/account by default
        const [owner, second, third] = await ethers.getSigners();


        const Receiver = await ethers.getContractFactory("Receiver");
        const receiver = await Receiver.deploy(MAILBOX_ADDRESS);

        return {owner, second, third, receiver};
    }

    describe("Deployment", function () {
        it("testing receiving", async function () {
            const {owner, receiver} = await loadFixture(deployOneYearLockFixture)

            await receiver.addVote(1);
            await receiver.handle(
                420,
                "0x000000000000000000000000412b975a47f1f0a021f4368fc92b1e21e9356f9c",
                "0x0383badc0000000000000000000000000000000000000000000000000000000000000001"
            )

            expect(await receiver.vote(1))
                .to.be.equal(2)
        });
    });
});

