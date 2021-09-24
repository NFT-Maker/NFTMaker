import Vue from "vue";
import Vuex from "vuex";
// import solc from "solc";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contractName: "",
        contract: "",
        contractInput: "",
        contractBuilt: {},
        web3: "",
        account: "",
        abi: "",
        settingNum: 0,
    },
    mutations: {
        contractSave(state, a) {
            state.contract = a;
        },
        setContractName(state, a) {
            state.contractName = a;
        },
        setContractInput(state) {
            state.contractInput = {
                language: "Solidity",
                sources: {
                    [state.contractName]: {
                        content: state.contract,
                    },
                },
                settings: {
                    outputSelection: {
                        "*": {
                            "*": ["*"],
                        },
                    },
                },
            };
        },
        // contractCompile(state) {
        //     try{
        //         var output = JSON.parse(solc.compile(JSON.stringify(state.contractInput)),1);

        //         for (let contract in output.contracts[state.contractName]) {

        //             // save "abi" in interface property of the output file
        //             let abi = output.contracts[state.contractName][contract].abi;
        //             // save "evm.bytecode.object" in bytecode property of the output file
        //             let bytecode = output.contracts[state.contractName][contract].evm.bytecode.object;
        //             const built = {
        //                 abi: JSON.stringify(abi),
        //                 bytecode: bytecode
        //             }
        //             state.contractBuilt = built

        //           }

        //     }catch(error){
        //         console.log(error);
        //     }
        // }
    },
    getters: {},
    actions: {},
});
