// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.3.2 (token/ERC20/ERC20.sol)

pragma solidity ^0.6.7;

import "./ERC20.sol";

contract ERC20WithSupply is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
    ) public ERC20(name_, symbol_) {
        _mint(msg.sender, initialSupply);
    }
}
