import {
    loadFixture,
} from "@nomicfoundation/hardhat-network-helpers";
import { ethers, network  } from "hardhat";
import { expect } from "chai";

const WORLD_ID_ADDRESS = "0x38f6e15d86574b2d12ddc119b411C7027bcE349c";
const APP_ID = "test"
const ACTION_ID = "test"

describe("Wote", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {

        // Contracts are deployed using the first signer/account by default
        const [owner, second, third] = await ethers.getSigners();


        const Wote = await ethers.getContractFactory("Wote");
        const vote = await Wote.deploy(WORLD_ID_ADDRESS, APP_ID, ACTION_ID);

        return {owner, second, third, vote};
    }

    describe("Deployment", function () {
        it("Should set the right arguments", async function () {
            const {owner, vote} = await loadFixture(deployOneYearLockFixture)

            expect(await vote.owner()).to.be.equal(owner.address)
            expect(await vote.worldId()).to.be.equal(WORLD_ID_ADDRESS)
        });
    });

    describe("Register Candidate", function () {
        it("Should get error while connecting without the deployer address", async function () {
            const {second, vote} = await loadFixture(deployOneYearLockFixture)

            await expect(vote.connect(second).registerCandidates([{
                id: 1,
                description: "test1",
                imageUrl: "test2",
                name: "test3"
            }])).to.be.revertedWithCustomError(vote, "OwnableUnauthorizedAccount")
        });

        it("Should get error while adding the same ids", async function () {
            const {vote} = await loadFixture(deployOneYearLockFixture)

            const candidate = {
                id: 1,
                description: "test1",
                imageUrl: "test2",
                name: "test3"
            }

            await vote.registerCandidates([candidate])

            await expect(vote.registerCandidates([candidate]))
                .to.be.revertedWith("Wote: can't register candidate, already used id")
        });

        it("Should register correctly", async function () {
            const {vote} = await loadFixture(deployOneYearLockFixture)

            const candidate = {
                id: 1,
                description: "test1",
                imageUrl: "test2",
                name: "test3"
            }

            await vote.registerCandidates([candidate])

            const candidates = await vote.getCandidates();

            expect(candidates.length).to.be.equal(1)
            expect(candidates[0].id).to.be.equal(candidate.id)
            expect(candidates[0].name).to.be.equal(candidate.name)
            expect(candidates[0].description).to.be.equal(candidate.description)
            expect(candidates[0].imageUrl).to.be.equal(candidate.imageUrl)
        });

        it("Should increase vote correctly", async function () {
            const {vote, owner} = await loadFixture(deployOneYearLockFixture)

            const candidate = {
                id: 1,
                description: "test1",
                imageUrl: "test2",
                name: "test3"
            }

            await vote.registerCandidates([candidate])

            const candidates = await vote.getCandidates();

            const id = candidates[0].id

            await vote.verifyAndExecute(
                owner.address,
                "0x123123",
                "123213213",
                [0,1,2,3,4,5,6,7],
                id
            )

            expect(await vote.votes(id))
                .to.be.equal(1)
        });

        it("Should fail while increasing without fail id", async function () {
            const {vote, owner} = await loadFixture(deployOneYearLockFixture)

            const candidate = {
                id: 1,
                description: "test1",
                imageUrl: "test2",
                name: "test3"
            }

            await vote.registerCandidates([candidate])

            const candidates = await vote.getCandidates();

            await expect(vote.verifyAndExecute(
                owner.address,
                "0x123123",
                "123213213",
                [0,1,2,3,4,5,6,7],
                0
            )).to.be.revertedWith("Wote: invalid candidate Id")

        });

        it("Should increase vote correctly, with multtiple candidates", async function () {
            const {vote, owner} = await loadFixture(deployOneYearLockFixture)

            const candidate = {
                id: 1,
                description: "test1",
                imageUrl: "test2",
                name: "test3"
            }

            const candidate1 = {
                id: 2,
                description: "test1",
                imageUrl: "test2",
                name: "test3"
            }
            await vote.registerCandidates([candidate, candidate1])

            const candidates = await vote.getCandidates();

            const id = candidates[0].id
            const id1 = candidates[1].id

            await vote.verifyAndExecute(
                owner.address,
                "0x123123",
                "123213213",
                [0,1,2,3,4,5,6,7],
                id
            )

            await vote.verifyAndExecute(
                owner.address,
                "0x123123",
                "1232132123",
                [0,1,2,3,4,5,6,7],
                id1
            )

            expect(await vote.votes(id))
                .to.be.equal(1)
            expect(await vote.votes(id1))
                .to.be.equal(1)
        });

    });

});

