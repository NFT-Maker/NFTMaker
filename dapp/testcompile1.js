const path = require("path");
const solc = require("solc");
const fileSystem = require("fs-extra");


//Preparing for build folder
const exportPath = path.resolve(__dirname, "build");
fileSystem.removeSync(exportPath);

//Get contract path
const testDoContract = path.resolve(__dirname, "contracts", "testDo.sol");

//Read the contract from testDo path
const testDoSource = fileSystem.readFileSync(testDoContract, "utf8");

var input = {
    language: 'Solidity',
    sources: {
        'testDo.sol': {
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
    const output = JSON.parse(solc.compile(JSON.stringify(input)),1);

    for (let contract in output.contracts["testDo.sol"]) {
        fileSystem.outputJSONSync(
          path.resolve(exportPath, "testDoABI.json"),
          output.contracts["testDo.sol"][contract].abi
        );
    
        fileSystem.outputJSONSync(
          path.resolve(exportPath, "testDoBytecode.json"),
          output.contracts["testDo.sol"][contract].evm.bytecode.object
        );
      }

}catch(error){
    console.log(error);
}