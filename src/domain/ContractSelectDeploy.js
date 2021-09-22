const path = require("path");
const solc = require("solc");
const fileSystem = require("fs-extra");


//생성할 파일 경로
const buildPath = path.resolve(__dirname, "build");
fileSystem.removeSync(buildPath);

//컨트렉트를 얻어낼 경로
const contractsPath = path.resolve(__dirname, "contracts");

//컨트렉트 패스로부터 얻어낸 경로에 있는 파일의 내용
const testDoSource = fileSystem.readFileSync(contractsPath, "utf8");

var input = {
    language: 'Solidity',
    sources: testDoSource

        ,
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}

try {
    const output = JSON.parse(solc.compile(JSON.stringify(input)), 1);

    for (let contract in output.contracts[testDoSource]) {

        // save "abi" in interface property of the output file
        let abi = output.contracts[testDoSource][contract].abi;
        // save "evm.bytecode.object" in bytecode property of the output file
        let bytecode = output.contracts[testDoSource][contract].evm.bytecode.object;
        const built = {
            abi: JSON.stringify(abi),
            bytecode: bytecode
        }

        fileSystem.outputJSONSync(
            path.resolve(buildPath, "Payments.json"),
            built
        );

        fileSystem.outputJSONSync(
            path.resolve(buildPath, "testDo.json"),
            built
        );
    }

} catch (error) {
    console.log(error);
}