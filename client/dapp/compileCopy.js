const path = require("path");
const solc = require("solc");
const fileSystem = require("fs-extra");


//Preparing for build folder
const buildPath = path.resolve(__dirname, "build");
// fileSystem.removeSync(buildPath);

//Get contract path
const contractsPath = path.resolve(__dirname, "contracts", "nftMaker.sol");

//Read the contract from testDo path
const testDoSource = fileSystem.readFileSync(contractsPath, "utf8");

var input = {
    language: 'Solidity',
    sources: {
        'nftMaker.sol': {
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

    for (let contract in output.contracts["nftMaker.sol"]) {

        // save "abi" in interface property of the output file
        let abi = output.contracts["nftMaker.sol"][contract].abi;
        // save "evm.bytecode.object" in bytecode property of the output file
        let bytecode = output.contracts["nftMaker.sol"][contract].evm.bytecode.object;
        const built = {
            abi: JSON.stringify(abi),
            bytecode: bytecode
        }

          fileSystem.outputJSONSync(
            path.resolve(buildPath, "nftMaker.json"),
            built
          );
      }

}catch(error){
    console.log(error);
}