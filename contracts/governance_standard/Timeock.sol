//We want to wait for a new vote to be executed
//Give time to users to "get out" if they don't like governance update

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timeock is TimelockController{
      // minDelay is how long you have to wait before executing
      // proposers is the list of addresses that can propose
      // executors is the list of addresses that can execute
    constructor(uint256 minDelay, address[] memory proposers, address[] memory executors, address admin)
     TimelockController(minDelay, proposers, executors, 0x0000000000000000000000000000000000000000){ }
}