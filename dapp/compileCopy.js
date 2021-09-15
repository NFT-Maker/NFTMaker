const path = require("path");
const solc = require("solc");
const fileSystem = require("fs-extra");


//Preparing for build folder
const buildPath = path.resolve(__dirname, "build");
fileSystem.removeSync(buildPath);

//Get contract path
const contractsPath = path.resolve(__dirname, "contracts", "testDo.sol");

//Read the contract from testDo path
const testDoSource = fileSystem.readFileSync(contractsPath, "utf8");

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

        // save "abi" in interface property of the output file
        let abi = output.contracts["testDo.sol"][contract].abi;
        // save "evm.bytecode.object" in bytecode property of the output file
        let bytecode = output.contracts["testDo.sol"][contract].evm.bytecode.object;
        const built = {
            abi: JSON.stringify(abi),
            bytecode: bytecode
        }

        fileSystem.outputJSONSync(
            path.resolve(buildPath, "Payments.json"),
            built
          );

        fileSystem.outputJSONSync(
          path.resolve(buildPath, "testDoABI.json"),
          output.contracts["testDo.sol"][contract].abi
        );
    
        fileSystem.outputJSONSync(
          path.resolve(buildPath, "testDoBytecode.json"),
          output.contracts["testDo.sol"][contract].evm.bytecode.object
        );
      }

}catch(error){
    console.log(error);
}