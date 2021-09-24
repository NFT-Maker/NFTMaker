<template>
    <div>
        <b-card>


            <h3>test1: sol파일과 웹에 저장된 값이 같은지 비교</h3>
            <b-button @click="test1()">test1</b-button>
            <b-textarea class="" rows="10" v-model="this.$store.state.contract"></b-textarea>
            <b-button @click="test2()">test2</b-button>
            <b-button @click="test3()">test3</b-button>
            <b-button @click="test4()">test4</b-button>
            <b-button @click="test5()">test5</b-button>

            

           
        </b-card>
    </div>
</template>


<script>
// import compileCode from "../domain/ContractSelectDeploy"

    export default {
        name: '',
        components: {},
        data() {
            return {
                // test1 스토어에 저장된 컨트렉트
                sampleData: this.$store.state.contract,
            }
        },
        created() {},
        mounted() {
            
        },
        updated() {},
        unmounted() {},
        methods: {
            test1() {
                //목적: 파일경로로 받은것과 스토어에 저장된 값이 같은지를 확인하기 위함

                //파일경로 코드 받은것
                var a =
                    "pragma solidity ^0.8.7;\r\n\r\ncontract testDo {\r\n    string name;\r\n    uint num;\r\n    \r\n    function changeName (string memory _name) public {\r\n        name = _name;\r\n    }\r\n    \r\n    function viewName () public view returns (string memory) {\r\n        return name;\r\n    }\r\n    \r\n    function changeNum (uint _num) public {\r\n        num = _num;\r\n    }\r\n    \r\n    function viewNum () public view returns (uint) {\r\n        return num;\r\n    }\r\n    \r\n}"

                //스토어를 통해 저장된 값
                var b = this.$store.state.contract

                console.log("a: sol 파일")
                console.log(a)
                console.log("b: 스토어에 저장된 값")
                console.log(b)
            },
            test2() {
                // setContractName 확인
                 this.$store.commit("setContractName", "testDo.sol")
                 console.log(this.$store.state.contractName)
            },
            test3() {
                // setContractInput 확인
                 this.$store.commit("setContractInput")
                 console.log(this.$store.state.contractInput)
            },
            test4() {
                // contractCompile 확인
                 this.$store.commit("contractCompile")
                 console.log(this.$store.state.contractBuilt)
            },
            // async test5() {
            //     var name = this.$store.state.contractName
            //     var code = this.$store.state.contract

            //     await compileCode(name, code);
            // }

          
        }
    }
</script>