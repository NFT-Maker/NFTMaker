pragma solidity 0.8.7;

import "./safemath.sol";

contract NFTMaker {
    
    using SafeMath for uint256;
    
    // 컨트랙트 주인
    address public owner;
    
    // 지금까지 발행된 NFT 갯수, 다음 발행될 NFT 번호
    uint public NFTId = 0;

    // NFT의 주인(NFT id => nft주인 주소)
    mapping (uint => address) public NFTToOwner;
    // NFT의 이미지 url 주소(nft id => 이미지 ipfs 주소)
    mapping (uint => string) public NFTUrl;
    // EOA 가 갖고있는 nft 갯수
    mapping (address => uint) public NFTCount;
    
    constructor () {
        // 처음 만들때 주인설정
        owner = msg.sender;
    }
    
    // 주인이 NFT 발행해주는 함수
    function NFT(address _who, string memory _url) public{
        // 주인만 nft 만들수 있음
        require(owner == msg.sender);
        
        NFTToOwner[NFTId] = _who;
        NFTUrl[NFTId] = _url;
        NFTId = NFTId.add(1);
        NFTCount[_who] = NFTCount[_who].add(1);
    }
}
