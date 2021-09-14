pragma solidity ^0.8.7;

contract testDo {
    string name;
    uint num;
    
    function changeName (string memory _name) public {
        name = _name;
    }
    
    function viewName () public view returns (string memory) {
        return name;
    }
    
    function changeNum (uint _num) public {
        num = _num;
    }
    
    function viewNum () public view returns (uint) {
        return num;
    }
    
}