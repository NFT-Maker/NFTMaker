<template>
  <div>
    안녕
    <br />
    <button @click="init()">지갑연결</button>
  </div>
</template>
<script>
import Web3 from "web3";
export default {
  name: "",
  components: {},
  data() {
    return {
      sampleData: "",
      web3: "",
      accounts: [],
      account: null,
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    // async getAccounts() {
    //   this.accounts = await this.web3.eth.getAccounts().then();
    //   console.log("accounts", this.accounts);
    // },
    async init() {
      if (window.ethereum) {
        this.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          this.web3.eth.getAccounts().then(function(accounts) {
            console.log(accounts);
            this.account = accounts;
            console.log(this.account);
          });
        } catch (error) {
          console.log("error");
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        this.web3 = window.web3;
        console.log("Injected web3 detected.");
      }
    },
  },
};
</script>
