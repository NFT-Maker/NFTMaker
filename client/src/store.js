import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contract: "",
        built: {},
        web3: "",
        account: "",
        abi: "",
    },
    mutations: {
        contractSave(state, a) {
            state.contract = a;
        },
        builtSave(state,a){
            state.built = a;
        }
    },
    getters: {},
    actions: {},
});
