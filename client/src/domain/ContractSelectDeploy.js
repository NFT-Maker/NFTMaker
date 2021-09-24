import axios from "axios"
import solc from "solc"



function compileCode (contractName, contractCode){
  


    var input = {
        language: 'Solidity',
        sources: {
            [contractName]: {
                content: contractCode
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
    
        for (let contract in output.contracts[contractName]) {
    
            // save "abi" in interface property of the output file
            let abi = output.contracts[contractName][contract].abi;
            // save "evm.bytecode.object" in bytecode property of the output file
            let bytecode = output.contracts[contractName][contract].evm.bytecode.object;
            const built = {
                abi: JSON.stringify(abi),
                bytecode: bytecode
            }
            
            // built를 빼내야해요!
            console.log(built)
          }
    
    }catch(error){
        console.log(error);
    }
}

export {compileCode};