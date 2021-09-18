pragma solidity 0.8.7;

import "./safemath.sol";

contract schoolAwads {
    
    using SafeMath for uint256;
    
    address public owner;
    address public awadsMaker1;
    address public awadsMaker2;
    
    uint public rightNow;
    uint public schoolAwadsId = 0;
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
    
    function openMake () {
        
    }
    
    
    function createAwads (address _student) public {
        require(owner == msg.sender || awadsMaker1 == msg.sender || awadsMaker2 == msg.sender);
        if(schoolAwadsId == 0){
            schoolAwadsId = schoolAwadsId.add(1);
            schoolAwadsIdToOwner[schoolAwadsId] = _student;
            rightNow = block.timestamp;
        } else {
            require(openTime > (block.timestamp - rightNow));
            schoolAwadsId = schoolAwadsId.add(1);
            schoolAwadsIdToOwner[schoolAwadsId] = _student;
        }
        
    }
    
}