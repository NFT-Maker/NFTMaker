<template>
    <div>
        <h2>testDo.sol을 버튼으로 만들어보자</h2>
        contractLibrary<input type="text" v-model="contractLibrary"><br>
        contractName<input type="text" v-model="contractName"><br>
        contractUsing<input type="text" v-model="contractUsing"><br>
        contractContentVariable<input type="text" v-model="contractContentVariable"><br>
        contractMapping<input type="text" v-model="contractMapping"><br>
        contractConstructor<input type="text" v-model="contractConstructor"><br>
        contractContentFunction<input type="text" v-model="contractContentFunction"><br>
        <b-button @click="contractCompleteGet">컨트렉트 완성</b-button>
        <b-button @click="contractCompleteGetConsole">컨트렉트 완성 콘솔로그</b-button>


        <h1>생성된 컨트렉트</h1>
        <textarea name="" id="" cols="100" rows="30" v-model="contractComplete"></textarea>
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
                contractName: "",
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
                var space = "\xa0"
                var space4 = "\xa0\xa0\xa0\xa0"
                return this.contractComplete = this.contractVer + "\n\n" + this.contractLibrary + "\n\n" + "contract" + space +
                    this.contractName + "{\n\n" + space4 + this.contractUsing + "\n\n" + space4 + this.contractContentVariable + "\n\n" + space4 +
                    this.contractMapping + "\n\n" + space4 + this.contractConstructor + "\n\n" + space4 + this.contractContentFunction +
                    "\n\n}"
            },

            contractCompleteGetConsole() {
                return console.log(this.contractComplete)
            }

        }
    }
</script>