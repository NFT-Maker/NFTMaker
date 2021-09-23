<template>
    <div>
        <!-- <h2>testDo.sol을 버튼으로 만들어보자</h2>
        contractLibrary<input type="text" v-model="contractLibrary"><br>
        contractName<input type="text" v-model="contractName"><br>
        contractUsing<input type="text" v-model="contractUsing"><br>
        contractContentVariable<input type="text" v-model="contractContentVariable"><br>
        contractMapping<input type="text" v-model="contractMapping"><br>
        contractConstructor<input type="text" v-model="contractConstructor"><br>
        contractContentFunction<input type="text" v-model="contractContentFunction"><br> -->
        <b-button @click="contractCompleteGet">컨트렉트 완성</b-button>
        <b-button @click="contractCompleteGetConsole">컨트렉트 완성 콘솔로그</b-button>
                <h1>test01</h1>
        <textarea name="" id="" cols="100" rows="30" v-model="test01"></textarea>


        <h1>생성된 컨트렉트</h1>
        <textarea name="" id="" cols="100" rows="30" v-model="contractComplete"></textarea>

        <h1>store에 저장된 컨트렉트</h1>
        <textarea name="" id="" cols="100" rows="30" v-model="$store.state.contract"></textarea>
        <b-button @click="contractCompleteSave()">컨트렉트 Store 저장</b-button>
        <b-button @click="contractCompleteSave1()">컨트렉트 Store 저장된거 확인하기</b-button>





    </div>
</template>
<script>
    export default {
        name: 'ContractSelect',
        components: {},
        data() {
            return {
                // 컨트렉트 버전
                contractVer: "pragma solidity ^0.8.7;",
                // 컨트렉트 라이브러리(ex import "./safemath.sol";)
                contractLibrary: "",
                // 컨트렉트 이름
                contractName: "testDo",
                // 컨트렉트 라이브러리에서 사용한 것 (ex using SafeMath for uint256;)
                contractUsing: "",
                // 컨트렉트 변수 선언 (ex address public owner;)
                contractContentVariable: "",
                // 컨트렉트 매핑 (ex mapping (uint => uint) public abc)
                contractMapping: "",
                // 컨트렉트 constructor
                contractConstructor: "",
                // 컨트렉트 함수 선언 (ex function abc (uint _num) public {num = _num})
                contractContentFunction: "",
                // 완성된 컨트렉트
                contractComplete: "",
                test01: "pragma solidity ^0.8.7;\r\n\r\ncontract testDo {\r\n    string name;\r\n    uint num;\r\n    \r\n    function changeName (string memory _name) public {\r\n        name = _name;\r\n    }\r\n    \r\n    function viewName () public view returns (string memory) {\r\n        return name;\r\n    }\r\n    \r\n    function changeNum (uint _num) public {\r\n        num = _num;\r\n    }\r\n    \r\n    function viewNum () public view returns (uint) {\r\n        return num;\r\n    }\r\n    \r\n}"

            }
        },
        created() {},
        mounted() {},
        updated() {},
        unmounted() {},
        computed: {

        },
        methods: {
           

            contractCompleteGet() {
                var space = " "
                var space4 = " " + " " + " " + " "
                return this.contractComplete = this.contractVer + "\r\n\r\n" + this.contractLibrary + "\r\n\r\n" + "contract" + space +
                    this.contractName + space + "{\r\n\r\n" + space4 + this.contractUsing + "\r\n\r\n" + space4 + this.contractContentVariable + "\r\n\r\n" + space4 +
                    this.contractMapping + "\r\n\r\n" + space4 + this.contractConstructor + "\r\n\r\n" + space4 + this.contractContentFunction +
                    "\r\n\r\n}"
            },

            contractCompleteGetConsole() {
                return console.log(this.contractComplete)
            },

            contractCompleteSave() {
                console.log("스토어에 저장한 것", this.contractComplete )
                this.$store.commit("contractSave", this.contractComplete)
            },

            contractCompleteSave1() {
                // contractCompleteSave에서 저장이 잘 되었는지 확인
                var a = this.$store.state.contract
                console.log("스토어에 저장된 것", a )

            },

        }
    }
</script>