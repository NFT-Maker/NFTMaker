var solc = require('solc');

var input = {
  language: 'Solidity',
  sources: {
    'testDo.sol': {
        content: 
        "pragma solidity ^0.8.7;\
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
      }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['testDo.sol']) {
  console.log(
    contractName +
      ': ' +
      output.contracts['testDo.sol'][contractName].evm.bytecode.object
  );
}