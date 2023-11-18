// SPDX-License-Identifier: UNLICENSED

import { IWorldIDGroups } from "./interfaces/IWorldID.sol";
import { ByteHasher } from './libs/ByteHasher.sol';
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity 0.8.21;

contract Receiver is Ownable {
    event ReceivedMessage(uint32 origin, bytes32 indexed sender, uint256 value, string data);

    address public mailbox;
    bytes32 public lastSender;
    bytes public lastData;

    constructor(
        address mailbox_
    ) Ownable(msg.sender)
    {
        mailbox = mailbox_;
    }

    modifier onlyMailbox() {
        require(
            msg.sender == address(mailbox),
            "MailboxClient: sender not mailbox"
        );
        _;
    }

    function handle(
        uint32 origin,
        bytes32 sender,
        bytes calldata data
    ) external payable {
        emit ReceivedMessage(origin, sender, msg.value, string(data));
        lastSender = sender;
        lastData = data;
        (bool success, bytes memory result) = address(this).call(data);
    }

}
