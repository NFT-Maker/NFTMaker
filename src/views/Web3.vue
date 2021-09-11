<template>
  <div>
    안녕
    <br />
    <button @click="init()">지갑연결</button>
    <br />
    <button @click="getContract()">컨트랙트 연결</button>
    <div>{{ contract }}</div>
    <br />
    <button @click="getName()">getName</button>
    <div>{{ sampleData }}</div>
    <br />
    <button @click="setName()">setName</button>
    <input type="text" v-model="name" />
  </div>
</template>
<script>
import Web3 from "web3";
export default {
  name: "",
  components: {},
  data() {
    return {
      sampleData: "hello",
      web3: "",
      accounts: [],
      account: 0,
      contract: "",
      abi: [],
      name: "",
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
            console.log(accounts[0]);
            window.account = accounts[0];
            console.log(window.account);
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

    async getContract() {
      this.abi = [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "sender",
              type: "address",
            },
          ],
          name: "SetName",
          type: "event",
        },
        {
          inputs: [],
          name: "getName",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "setName",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      console.log(this.abi);
      console.log(window.web3);
      console.log(this.web3);
      console.log(this.contract);

      window.contract = new this.web3.eth.Contract(
        this.abi,
        "0x625acB8EC10fAFf07df49B742C30C781092b7013"
      );
      console.log(window.contract);
    },

    getName() {
      window.contract.methods
        .getName()
        .call()
        .then(function(result) {
          console.log(result);
        });
    },

    async setName() {
      await window.contract.methods
        .setName(this.name)
        .send({ from: window.account });
      this.getName();
    },
  },
};
</script>
