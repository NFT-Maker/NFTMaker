<template>
    <div>
        <h2>testDo.sol을 버튼으로 만들어보자</h2>
        <input type="text" name="" id="" v-model="contractName">
        <h3>전체 컨트렉트</h3>
        <b-textarea class="" rows="10" v-model="createContractCode"></b-textarea>
        <div>{{createContractCode}}</div>
        <h3>컨트렉트 내용</h3>
        <b-textarea class="" rows="10" v-model="contractContent"></b-textarea>

        <div>
            <b-button variant="outline-primary" @click="contractContentEdit()">초기화</b-button>
            <b-button variant="outline-primary" @click="contractContentEdit1()">string name;</b-button>
            <b-button variant="outline-primary" @click="contractContentEdit2()">uint num;</b-button>
            <b-button variant="outline-primary" @click="contractContentEdit3()">function changeName</b-button>
            <b-button variant="outline-primary" @click="contractContentEdit4()">function viewName</b-button>
            <b-button variant="outline-primary" @click="contractContentEdit5()">function changeNum</b-button>
            <b-button variant="outline-primary" @click="contractContentEdit6()">function viewNum</b-button>
        </div>

        <div>
            <b-button @click="contractCodeEdit()">create Contract!!</b-button>
            <b-button @click="localStorageSave()">localStorageSave!!</b-button>
            <b-button @click="localStorageConsole()">localStorageConsole!!</b-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ContractSelect',
        components: {},
        data() {
            return {
                // 컨트렉트 코드
                createContractCode: "",
                // 코드 이름
                contractName: "testDo",
                // 코드 내용
                contractContent: "",
                arr: []
            }
        },
        created() {},
        mounted() {},
        updated() {},
        unmounted() {},
        methods: {

            localStorageSave: function () {
                const data = JSON.stringify(this.createContractCode)
                // 나중에 서버로 전송하는 것으로 바꿀것
                window.localStorage.setItem('arr', data);
                // window.localStorage.removeItem('arr', data);
            },
            localStorageConsole: function () {
                console.log(JSON.parse(window.localStorage.getItem('arr')))
            },

            // 이름, 컨트렉트 내용을 정리해서 출력
            contractCodeEdit() {
                this.createContractCode += "pragma solidity ^0.8.7;\n\n"
                this.createContractCode += "contract " + this.contractName + "{\n"
                this.createContractCode += this.contractContent + "\n"
                this.createContractCode += "}"
                console.log(this.createContractCode)
            },
            // 초기화
            contractContentEdit() {
                this.contractContent = ""
            },

            // string name;
            contractContentEdit1() {
                this.contractContent += "string name;\n"
            },
            // uint num;
            contractContentEdit2() {
                this.contractContent += "uint num;\n\n"
            },
            // function changeName
            contractContentEdit3() {
                this.contractContent += "function changeName (string memory _name) public {\n\
    name = _name;\n\
    }\n\n"
            },
            // function viewName
            contractContentEdit4() {
                this.contractContent += "function viewName () public view returns (string memory) {\n\
    return name;\n\
    }\n\n"
            },
            // function changeNum
            contractContentEdit5() {
                this.contractContent += "function changeNum (uint _num) public {\n\
    num = _num;\n\
    }\n\n"
            },
            //  function viewNum
            contractContentEdit6() {
                this.contractContent += "function viewNum () public view returns (uint) {\n\
    return num;\n\
    }\n\n"
            },
        }
    }
</script>