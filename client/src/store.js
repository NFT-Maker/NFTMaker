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
    },
    getters: {},
    actions: {},
});
