var solc = require("solc");

var testCode = JSON.parse(window.localStorage.getItem('arr'))

var input = {
    language: 'Solidity',
    sources: {
        'testCode': {
            content: testCode
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}

try {
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    for (let contract in output.contracts[testCode]) {

        // save "abi" in interface property of the output file
        let abi = output.contracts[testCode][contract].abi;
        // save "evm.bytecode.object" in bytecode property of the output file
        let bytecode = output.contracts[testCode][contract].evm.bytecode.object;
        const built = {
            abi: JSON.stringify(abi),
            bytecode: bytecode
        }
        console.log(built)

    //    window.localStorage.setItem('testCode', built);
    }

} catch (error) {
    console.log(error);
}