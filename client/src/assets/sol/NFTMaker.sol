pragma solidity 0.8.7;

import "./safemath.sol";

contract NFTMaker {
    
    using SafeMath for uint256;
    
    address owner;
    uint NFTId = 0;
    mapping (uint => address) NFTToOwner;
    mapping (uint => string) NFTUrl;
    mapping (address => uint) NFTCount;
    
    constructor () {
        owner = msg.sender;
    }
    
    function NFT(address _who, string memory _url) public{
        require(owner == msg.sender);
        NFTToOwner[NFTId] = _who;
        NFTUrl[NFTId] = _url;
        NFTId = NFTId.add(1);
        NFTCount[_who] = NFTCount[_who].add(1);
    }
}
