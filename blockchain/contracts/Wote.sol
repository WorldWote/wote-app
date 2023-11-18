// SPDX-License-Identifier: UNLICENSED

import { IWorldIDGroups } from "./interfaces/IWorldID.sol";
import { ByteHasher } from './libs/ByteHasher.sol';
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IMailbox } from "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";
import { TypeCasts } from "@hyperlane-xyz/core/contracts/libs/TypeCasts.sol";


pragma solidity 0.8.21;

struct Candidate {
    uint256 id;
    string name;
    string description;
    string imageUrl;
}

struct Receiver {
    uint32 chainId;
    address contractAddress;
}

contract Wote is Ownable {
    using ByteHasher for bytes;
    using TypeCasts for address;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    uint256 public constant fee = 0.01 ether;

    /// @dev The address of the World ID Router contract that will be used for verifying proofs
    IWorldIDGroups public immutable worldId;

    /// @dev The keccak256 hash of the externalNullifier (unique identifier of the action performed), combination of appId and action
    uint256 public immutable externalNullifierHash;

    /// @dev The World ID group ID (1 for Orb-verified)
    uint256 internal immutable groupId = 1;

    /// @dev mailbox address
    address public mailboxAddress;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    /// @dev candidates array
    Candidate[] public candidates;

    /// @dev receiver contracts
    Receiver[] public receivers;

    /// @dev used ids
    mapping(uint256 => bool) usedId;

    /// @dev count of the votes of the candidates
    mapping(uint256 => uint256) public votes;

    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    /// @param _action The World ID action ID
    constructor(
        IWorldIDGroups _worldId,
        string memory _appId,
        string memory _action,
        address _mailboxAddress
    ) Ownable(msg.sender)
    {
        mailboxAddress = _mailboxAddress;
        worldId = _worldId;
        externalNullifierHash = abi
        .encodePacked(abi.encodePacked(_appId).hashToField(), _action)
        .hashToField();
    }

    // alignment preserving cast
    function addressToBytes32(address _addr) external pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }


    function hashToField(bytes memory value) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(value))) >> 8;
    }

    /// @param signal An arbitrary input from the user that cannot be tampered with. In this case, it is the user's wallet address.
    /// @param root The root (returned by the IDKit widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the IDKit widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the IDKit widget).
    function verifyAndExecute(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        uint256 candidateId
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId, // set to "1" in the constructor
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifierHash,
            proof
        );

        // We now record the user has done this, so they can't do it again (sybil-resistance)
        nullifierHashes[nullifierHash] = true;

        // actual vote logic
        require(usedId[candidateId], "Wote: invalid candidate Id");

        // increasing option's vote count
        votes[candidateId] += 1;

        for (uint256 k = 0; k < receivers.length; ++ k ) {
            // send message  recipient
            IMailbox(mailboxAddress).dispatch{value: fee}(
                receivers[k].chainId,
                receivers[k].contractAddress.addressToBytes32(),
                abi.encodeWithSignature("addVote(uint256)", candidateId)
            );
        }
    }

    /// @dev this method is added for testing
    function eraseNullifierHash(uint256 nullifierHash) external {
        nullifierHashes[nullifierHash] = false;
    }

    /// @param _candidates list of candidates the owner wants to add
    function registerCandidates(Candidate[] memory _candidates) public onlyOwner {
        for (uint256 k = 0; k < _candidates.length; ++ k){
            Candidate memory candidate = _candidates[k];
            require(!usedId[candidate.id], "Wote: can't register candidate, already used id");
            usedId[candidate.id] = true;
            candidates.push(candidate);
        }
    }

    /// @param _receivers receiver contracts
    function addReceivers(Receiver[] memory _receivers) public onlyOwner {
        for (uint256 k = 0; k < _receivers.length; ++ k){
            receivers.push(_receivers[k]);
        }
    }


    /// @dev gets all candidates
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    /// @dev receive the money
    receive() external payable {
        // This function is executed when a contract receives plain Ether (without data)
    }

}
