pragma solidity >=0.6.7;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Airdrop is Ownable {
    using SafeMath for uint256;

    // Storage
    address public tokenAddr; // ERC20 token used for the airdrop
    address public transferOperator; // Address that is allowed to send airdrop transfers

    // Events
    event AirdropTokens(
        address indexed sender,
        uint256 recipientsCount,
        uint256 totalTokensAmount
    );
    event WithdrawTokens(
        address indexed sender,
        address indexed beneficiary,
        uint256 stakeAmount
    );

    // Modifiers
    modifier onlyOperator() {
        require(
            msg.sender == transferOperator,
            "Only operator can call this function."
        );
        _;
    }

    constructor(address _tokenAddr, address _transferOperator) public {
        tokenAddr = _tokenAddr;
        transferOperator = _transferOperator;
    }

    /**
     * Sends tokens to recipients, with a specific amount for each recipient.
     * Only callable by the operator (emails.com).
     */
    function airdropTokens(
        address[] memory _recipients,
        uint256[] memory _amounts
    ) public onlyOperator returns (bool) {
        require(
            _recipients.length == _amounts.length,
            "Invalid input parameters, recipients and amounts have different lengths"
        );

        // Transfer to all recipients one by one
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _recipients.length; i++) {
            require(
                _recipients[i] != address(0),
                "Cannot airdrop the burn address"
            );
            require(
                ERC20(tokenAddr).transfer(_recipients[i], _amounts[i]),
                "Unable to transfer token to the account"
            );

            totalAmount += _amounts[i];
        }

        // Emit a specific airdrop event with total number of recipients and total amount of tokens spent
        emit AirdropTokens(msg.sender, _recipients.length, totalAmount);

        return true;
    }

    /**
     * Returns all remaining tokens to the beneficiary.
     * Only callable by the operator (emails.com).
     */
    function withdrawTokens(address beneficiary)
        public
        onlyOperator
        returns (bool)
    {
        uint256 balance = ERC20(tokenAddr).balanceOf(address(this));

        // Transfer tokens
        require(ERC20(tokenAddr).transfer(beneficiary, balance));

        // Emit a specific withdraw event
        emit WithdrawTokens(msg.sender, beneficiary, balance);

        return true;
    }
}
