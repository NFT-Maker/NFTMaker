pragma solidity ^0.8.7;

contract nftMaker {

    address public owner;
    uint public NFTId = 0;

    mapping(uint => address) public NFTToOwner;
    mapping(uint => string) public NFTUrl;
    mapping(address => uint) public NFTCount;

    constructor () {
        owner = msg.sender;
    }

    function NFT(address _who, string memory _url) public{
        NFTToOwner[NFTId] = _who;
        NFTUrl[NFTId] = _url;
        NFTId = NFTId + 1;
        NFTCount[_who] = NFTCount[_who] + 1;
    }

}