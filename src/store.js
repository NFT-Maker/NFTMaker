import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contract: "",
        web3: "",
        account: "",
        abi: "",
    },
    mutations: {
        contractSave(state, a) {
            return (state.contract = a);
        },
    },
    getters: {},
    actions: {},
});
