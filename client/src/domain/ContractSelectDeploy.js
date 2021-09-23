const solc = require("solc");


// 여기에 코드를 넣어주면 되는거네
var testDoSource = "pragma solidity ^0.8.7;\
\
contract testDo {\
    string name;\
    uint num;\
    \
    function changeName (string memory _name) public {\
        name = _name;\
    }\
    \
    function viewName () public view returns (string memory) {\
        return name;\
    }\
    \
    function changeNum (uint _num) public {\
        num = _num;\
    }\
    \
    function viewNum () public view returns (uint) {\
        return num;\
    }\
    \
}"
var dingdong = "testDo.sol"
var input = {
    language: 'Solidity',
    sources: {
        [dingdong]: {
            content: testDoSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}

try{
    var output = JSON.parse(solc.compile(JSON.stringify(input)),1);

    for (let contract in output.contracts[dingdong]) {

        // save "abi" in interface property of the output file
        let abi = output.contracts[dingdong][contract].abi;
        // save "evm.bytecode.object" in bytecode property of the output file
        let bytecode = output.contracts[dingdong][contract].evm.bytecode.object;
        const built = {
            abi: JSON.stringify(abi),
            bytecode: bytecode
        }
        
        console.log(built)
      }

}catch(error){
    console.log(error);
}

