<template>
    <div>
        <Nav />
        안녕
        <br />
        <button @click="init()">지갑연결</button>
        <div>{{ account }}</div>
        <br />
        <button @click="getContract()">컨트랙트 연결</button>
        <div>{{ contract._address }}</div>
        <br />
        <button @click="getName()">getName</button>
        <div>{{ sampleData }}</div>
        <br />
        <button @click="setName()">setName</button>
        <input type="text" v-model="name" />
        <br />
        <button @click="test">test</button>
        <br />
        <div>{{ listening }}</div>
        <br />
        <!-- <button @click="createContract()">create</button>
    <div>{{ contract1 }}</div> -->
    </div>
</template>
<script>
import Web3 from "web3";
import Nav from "../components/Nav123.vue";
export default {
    name: "",
    components: {
        Nav,
    },
    data() {
        return {
            sampleData: "",
            web3: "",
            accounts: [],
            account: "",
            contract: {},
            // 변수 선언할때 오브젝트, 배열, 숫자, 문자 잘 확인해두자
            contract1: {},
            abi: [],
            name: "",
            test0: "",
            listening: "",
        };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
        // 메타마스크 연결
        async init() {
            if (window.ethereum) {
                this.web3 = new Web3(window.ethereum);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    // Acccounts now exposed
                    this.web3.eth.getAccounts().then((accounts) => {
                        // console.log(accounts[0]);
                        // window.account = accounts[0];
                        this.account = accounts[0];
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

        //컨트랙트 연결
        getContract() {
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
            console.log("abi", this.abi);
            // console.log(window.web3);
            // console.log(this.web3);
            // console.log(this.contract);
            console.log(this.contract);
            this.contract = 12345;
            console.log(this.contract);
            console.log(this.web3);
            // let contract2 = 2;
            this.contract = new this.web3.eth.Contract(
                this.abi,
                "0x625acB8EC10fAFf07df49B742C30C781092b7013"
            );
            console.log(this.contract);
            // this.contract1 = window.contract;
            // console.log(this.contract1);

            // 이벤트 리슨
            this.contract.events.SetName({}, (error, event) => {
                console.log(event);
                this.listening =
                    event.returnValues.name + ", " + event.returnValues.sender;
            });
            this.listening = "Listening...";
        },

        //window , this this가 먹어야 되는데 왜 안되지?
        // 이름 가져오기
        getName() {
            this.contract.methods
                .getName()
                .call()
                .then((result) => {
                    console.log(result);
                    this.sampleData = result;
                });
        },

        // 이름 저장하기
        async setName() {
            await this.contract.methods
                .setName(this.name)
                .send({ from: this.account });
            this.getName();
        },

        test() {
            alert(this.name);
        },
    },
};
</script>
