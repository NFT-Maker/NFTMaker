pragma solidity 0.8.7;

import "./safemath.sol";

contract schoolAwads {
    
    address public owner;
    address public awadsMaker1;
    address public awadsMaker2;
    
    uint public rightNow;
    uint public schoolAwadsId;
    uint public checkTime;
    uint public openTime;
    
    string public schoolAwadsName;
    
    mapping (uint => address) public schoolAwadsIdToOwner;
    
    constructor(uint _checkTime, uint _openTime, address _awadsMaker1, address _awadsMaker2, string memory _schoolAwadsName) {
        owner = msg.sender;
        checkTime = _checkTime;
        openTime = _openTime;
        awadsMaker1 = _awadsMaker1;
        awadsMaker2 = _awadsMaker2;
        schoolAwadsName = _schoolAwadsName;
    }
    
    function createAwads () public {
        require(owner == msg.sender || awadsMaker1 == msg.sender || awadsMaker2 == msg.sender);
        rightNow = block.timestamp;
    }
    
}
