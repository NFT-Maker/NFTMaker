<template>
    <div>
        <b-card>


            <h3>test1: sol파일과 웹에 저장된 값이 같은지 비교</h3>
            <b-button @click="test1()">test1</b-button>
            <b-textarea class="" rows="10" v-model="this.$store.state.contract"></b-textarea>

            <h3>test2: input값 비교</h3>
            <b-button @click="test2()">test2</b-button>
            <h5>test2a : 컴파일</h5>
            <b-textarea class="" rows="10" v-model="this.test2a"></b-textarea>
            <h5>test2b : 자작</h5>
            <b-textarea class="" rows="10" v-model="this.test2b"></b-textarea>

            <h3>test3: JSON.stringify(input)값 비교</h3>
            <b-button @click="test3()">test3</b-button>
            <h5>test3a : 컴파일</h5>
            <b-textarea class="" rows="10" v-model="this.test3a"></b-textarea>
            <h5>test3b : 자작</h5>
            {{this.test3b}}
            <b-textarea class="" rows="10" v-model="this.test3b"></b-textarea>

            <h3>test4: solc.compile(JSON.stringify(input))값 비교</h3>
            <b-button @click="test4()">test4</b-button>
            <h5>컴파일값은 메모장</h5>

            <section class="mui-container-fluid">
                <div class="mui-row">
                    <div class="mui-col-md-6">
                        <div class="mui-select">
                            <select id="versions"></select>
                        </div>
                    </div>
                </div>
            </section>
        </b-card>
    </div>
</template>
<!-- Include this in your HTML page -->

<script>
    export default {
        name: '',
        components: {},
        data() {
            return {
                // test1 스토어에 저장된 컨트렉트
                sampleData: this.$store.state.contract,
                test2a: null,
                test2b: null,
                test3a: null,
                test3b: null,
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
                // 목적: 파일경로로 만든 inpot값과 스토어로 통해 만든 input값이 같은지를 확인하기 위함
                // 결과: \r\n 이 \n으로만 인식
                var result = {
                    "language": "Solidity",
                    "sources": {
                        "testDo.sol": {
                            "content": "pragma solidity ^0.8.7;\r\n\r\ncontract testDo {\r\n    string name;\r\n    uint num;\r\n    \r\n    function changeName (string memory _name) public {\r\n        name = _name;\r\n    }\r\n    \r\n    function viewName () public view returns (string memory) {\r\n        return name;\r\n    }\r\n    \r\n    function changeNum (uint _num) public {\r\n        num = _num;\r\n    }\r\n    \r\n    function viewNum () public view returns (uint) {\r\n        return num;\r\n    }\r\n    \r\n}"
                        }
                    },
                    "settings": {
                        "outputSelection": {
                            "*": {
                                "*": ["*"]
                            }
                        }
                    }
                }

                // 웹에서 작성한 sampleData 받아서 input
                var input = {
                    language: 'Solidity',
                    sources: {
                        "testDo.sol": {
                            content: this.$store.state.contract
                        }
                    },
                    settings: {
                        outputSelection: {
                            '*': {
                                '*': ['*']
                            }
                        }
                    }
                }
                this.test2a = result
                this.test2b = input


                if (result == input) {
                    console.log(true)
                } else {
                    console.log(false)
                }
            },

            test3() {
                //목적 : JSON.stringify(input)값이 같은지 확인
                // 결과: 역시나 \r이 사라짐

                var compileResult =
                    "{\"language\":\"Solidity\",\"sources\":{\"testDo.sol\":{\"content\":\"pragma solidity ^0.8.7;\\r\\n\\r\\ncontract testDo {\\r\\n    string name;\\r\\n    uint num;\\r\\n    \\r\\n    function changeName (string memory _name) public {\\r\\n        name = _name;\\r\\n    }\\r\\n    \\r\\n    function viewName () public view returns (string memory) {\\r\\n        return name;\\r\\n    }\\r\\n    \\r\\n    function changeNum (uint _num) public {\\r\\n        num = _num;\\r\\n    }\\r\\n    \\r\\n    function viewNum () public view returns (uint) {\\r\\n        return num;\\r\\n    }\\r\\n    \\r\\n}\"}},\"settings\":{\"outputSelection\":{\"*\":{\"*\":[\"*\"]}}}}"
                this.test3a = compileResult


                this.test3b = JSON.stringify(this.test2b)

                if (compileResult == this.test3b) {
                    console.log(true)
                } else {
                    console.log(false)
                }
            },

            test4() {
                //목적 : solc.compile(JSON.stringify(input))값이 같은지 확인
                // 결과: This dependency was not found: To install it, you can run: npm install --save module


            }
        }
    }
</script>