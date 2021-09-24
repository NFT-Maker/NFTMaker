<template>
    <div>
        <b-card>
            <b-textarea name="" id="" cols="100" rows="30" v-model="test01"></b-textarea>

            <!-- 이건 나중에 네비게이션으로 뺄것 -->
            <b-button @click="init()">지갑연결</b-button>

            <!-- 컨트렉트 옵션 설정 -->
            <div>

            </div>

            <!-- 컨트렉트를 보여줄 textarea -->
            <b-textarea class="" rows="30" v-model="contractCreating"></b-textarea>

            <!-- 컨트렉트 배포하기 -->
            <div>
                <!-- 나중에 합치기 -->
                <b-button @click="contractSaveStore()">컨트렉트 스토어에 저장</b-button>
                <b-button @click="contractCompile()">컨트렉트 컴파일</b-button>
                <b-button @click="contractDeploy()">컨트렉트 생성</b-button>
            </div>

        </b-card>
    </div>
</template>
<script>
    import Web3 from "web3";


    export default {
        name: '',
        components: {},
        data() {
            return {
                // test01은 배포되는지 확인하는 용도 나중에 삭제
                test01: "pragma solidity ^0.8.7;\r\n\r\ncontract nftMaker {\r\n    string name;\r\n    uint num;\r\n    \r\n    function changeName (string memory _name) public {\r\n        name = _name;\r\n    }\r\n    \r\n    function viewName () public view returns (string memory) {\r\n        return name;\r\n    }\r\n    \r\n    function changeNum (uint _num) public {\r\n        num = _num;\r\n    }\r\n    \r\n    function viewNum () public view returns (uint) {\r\n        return num;\r\n    }\r\n    \r\n}",

                // 내 지갑 주소
                account: "",
                // 생성중인 컨트렉트
                contractCreating: "",
                // 컨트렉트
                contract: {},
                // abi
                abi: null,
                // bytecode
                bytecode: null,
                // 생성된 컨트렉트 주소
                contractAddress: "",

            }
        },
        created() {},
        mounted() {},
        updated() {},
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

            contractSaveStore() {
                this.$store.commit("contractSave", this.contractCreating)
                console.log(this.$store.state.contract)
            },

            // 컨트렉트 컴파일
            async contractCompile() {

                var contractCode = this.$store.state.contract;

                var input = {
                    language: "Solidity",
                    sources: {
                        "nftMaker.sol": {
                            content: contractCode,
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

                await this.$api("/compile", "post", {
                    param: [input],
                }).then((res) => {
                    console.log("123", res);

                    this.abi = res.abi;
                    this.bytecode = res.bytecode;
                    console.log(this.abi);
                    console.log(this.bytecode);
                });
            },

            // 컨트렉트 생성
            contractDeploy() {
                new this.web3.eth.Contract(this.abi)
                    .deploy({
                        data: this.bytecode
                    })
                    .send({
                        from: this.account
                    })
                    .then((result) => {
                        // 컨트렉트 주소 가져오기
                        this.contractAddress = result.options.address
                        console.log(result.options.address);
                        // 컨트렉트 정보 가져오기 (확인해보기)
                        // this.contract = result;
                    });
            },


        }
    }
</script>