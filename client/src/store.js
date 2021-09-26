import Vue from "vue";
import Vuex from "vuex";
import persistedstate from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
    state() {
        return {
            contractName: "",
            contract: {},
            contractInput: "",
            contractBuilt: {},
            web3: "",
            account: "",
            abi: "",
            settingNum: 0,
            show: false,
            ipfs: false
        };
    },
    mutations: {
        showSave(state, a) {
            state.show = a;
        },

        accountSave(state, a) {
            state.account = a;
        },

        web3Save(state, a) {
            state.web3 = a;
        },

        settingNumSave(state, a) {
            state.settingNum = a;
        },

        abiSave(state, a) {
            state.abi = a;
        },

        contractSave(state, a) {
            state.contract = a;
        },
        setContractName(state, a) {
            state.contractName = a;
        },
        setIpfs(state, a) {
            state.ipfs = a;
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
    actions: {},
    modules: {},

    plugins: [
        persistedstate({
            paths: ["account"],
        }),
    ],
});

export default store;
