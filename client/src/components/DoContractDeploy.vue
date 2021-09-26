<template>
    <div>
        <!-- 지갑연결 -->
        <b-card-group class="mx-2 my-2" deck>

            <b-card class="mx-2 my-2" header-bg-variant="warning" header-text-variant="dark">
                <template #header>
                    <h6 class="mb-0">NFT 컨트렉트</h6>
                </template>
                <b-textarea class="" rows="30" v-model="contractComplete"></b-textarea>


            </b-card>

            <div>
                <b-card body-class="text-center" class="mx-2 my-2" header-bg-variant="warning"
                    header-text-variant="dark" no-body>
                    <template #header>
                        <h5>NFT 컨트렉트 선택</h5>
                    </template>
                    <b-tabs card>
                        <b-tab no-body title="Only Owner">
                           <b-card-text>
                               컨트렉트에 대한 설명
                            </b-card-text>
                            <b-card-footer>
                                <b-button variant="warning" class="mx-1 my-1" @click="contract_Owner()">주인만 발행</b-button>
                            </b-card-footer>
                        </b-tab>

                        <b-tab no-body title="상장">
                           <b-card-text>
                               컨트렉트에 대한 설명
                            </b-card-text>
        
                            <b-card-footer>
                                <b-button variant="warning" class="mx-1 my-1" @click="contract_schoolAwads()">상장</b-button>
                            </b-card-footer>
                        </b-tab>

                        <b-tab no-body title="봉사증">
                            <b-card-text>
                               컨트렉트에 대한 설명
                            </b-card-text>
                            <b-card-footer>Picture 3 footer</b-card-footer>
                        </b-tab>

                        <b-tab title="Text">
                            <b-card-title>This tab does not have the prop set</b-card-title>
                            <b-card-text>
                               asdasd
                            </b-card-text>
                        </b-tab>
                    </b-tabs>

                </b-card>

                <b-card class="mx-2 my-2" header-bg-variant="warning" header-text-variant="dark">

                    <template #header>
                        <h5 class="mb-0">NFT 컨트렉트 생성</h5>
                    </template>
                    <b-button variant="dark" class="mx-1 my-1" @click="init()">지갑연결</b-button>
                    <!-- <b-button variant="dark" class="mx-1 my-1" @click="contractSaveStore()">컨트렉트 스토어에 저장</b-button> -->
                    <b-button variant="dark" class="mx-1 my-1" @click="contractCompile()">컨트렉트 컴파일</b-button>
                    <b-button variant="dark" class="mx-1 my-1" @click="contractDeploy()">컨트렉트 발행</b-button>
                    <b-button variant="dark" class="mx-1 my-1" @click="[show=true]">NFT 컨트렉트 보기</b-button>
                </b-card>
            </div>
            <!-- contractLibrary<input type="text" v-model="contractLibrary"><br> -->
            <!-- contractName<input type="text" v-model="contractName"><br> -->
            <!-- contractUsing<input type="text" v-model="contractUsing"><br> -->
            <!-- contractContentVariable<input type="text" v-model="contractContentVariable"><br> -->
            <!-- contractMapping<input type="text" v-model="contractMapping"><br> -->
            <!-- contractConstructor<input type="text" v-model="contractConstructor"><br> -->
            <!-- contractContentFunction<input type="text" v-model="contractContentFunction"><br> -->


        </b-card-group>



        <!-- ---------------------- 모달 --------------------------------- -->
        <b-modal v-model="show" title="NFT 컨트렉트 코드" header-bg-variant="warning" header-text-variant="dark"
            body-bg-variant="light" body-text-variant="dark" footer-bg-variant="dark" footer-text-variant="light">


            <b-card title="NFT 컨트렉트 코드" class="mt-2">
                <!-- 컨트렉트를 보여줄 textarea -->
            </b-card>
            <template #modal-footer>
                <div class="w-100">
                    <h5 class="float-left">NFT Maker</h5>

                    <b-button variant="warning" size="sm" class="float-right" @click="show=false">
                        닫기
                    </b-button>
                </div>
            </template>
        </b-modal>

    </div>
</template>
<script>
    import Web3 from "web3";


    export default {
        name: '',
        components: {},
        data() {
            return {
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
                show: false,
                // ------------컨트렉트 작성 -------------
                // 컨트렉트 코드
                contractVer: "pragma solidity ^0.8.7;",

                // 컨트렉트 라이브러리(ex import "./safemath.sol";)
                // contractLibrary: 'import "./contract/safemath.sol";',

                // 컨트렉트 이름
                contractName: "nftMaker",

                // 컨트렉트 라이브러리에서 사용한 것 (ex using SafeMath for uint256;)
                // contractUsing: "using SafeMath for uint256;",

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

                var contractCode = this.contractComplete;

                await this.$api("/compile", "post", {
                    param: [contractCode],
                }).then((res) => {
                    console.log("123", res);
                    console.log(res.err)

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
            // -----------------------------------------------------
            contractCompleteGet() {
                var space = " "
                var space4 = " " + " " + " " + " "
                return this.contractComplete = this.contractVer + "\r\n\r\n" +
                    // this.contractLibrary + "\r\n\r\n" + 
                    "contract" + space +
                    this.contractName + space + "{\r\n\r\n" + space4 +
                    // this.contractUsing + "\r\n\r\n" + space4 + 
                    this.contractContentVariable + "\r\n\r\n" + space4 +
                    this.contractMapping + "\r\n\r\n" + space4 + this.contractConstructor + "\r\n\r\n" + space4 + this
                    .contractContentFunction +
                    "\r\n\r\n}"
            },

            contract_Owner() {
                this.contractContentVariable = "address public owner;\r\n    uint public NFTId = 0;",
                    this.contractMapping =
                    "mapping(uint => address) public NFTToOwner;\r\n    mapping(uint => string) public NFTUrl;\r\n    mapping(address => uint) public NFTCount;",
                    this.contractConstructor = "constructor () {\r\n        owner = msg.sender;\r\n    }",
                    this.contractContentVariable = "address public owner;\r\n    uint public NFTId = 0;"
                this.contractContentFunction =
                    "function NFT(address _who, string memory _url) public{\r\n        require(owner == msg.sender);\r\n\r\n        NFTToOwner[NFTId] = _who;\r\n        NFTUrl[NFTId] = _url;\r\n        NFTId = NFTId + 1;\r\n        NFTCount[_who] = NFTCount[_who] + 1;\r\n    }"
                this.contractCompleteGet()
            },

            contract_schoolAwads() {
                var space4 = " " + " " + " " + " "
                var space8 = space4 + space4

                this.contractContentVariable =
                    "address public owner;\r\n    address public awadsMaker1;\r\n    address public awadsMaker2;\r\n    uint public rightNow;\r\n    uint public schoolAwadsId = 0;\r\n    uint public checkTime;\r\n    uint public openTime;\r\n    uint public cheak = 0;\r\n    uint public check1 = 1;\r\n    string public schoolAwadsName;"
                this.contractMapping =
                    "mapping(uint => address) public schoolAwadsIdToOwner;\r\n    mapping(uint => address) public changerApprovals;",
                    this.contractConstructor =
                    "constructor (uint _openTime, address _awadsMaker1, address _awadsMaker2, string memory _schoolAwadsName) {\r\n        owner = msg.sender;\r\n        checkTime = 330 days;\r\n        openTime = _openTime;\r\n        awadsMaker1 = _awadsMaker1;\r\n        awadsMaker2 = _awadsMaker2;\r\n        schoolAwadsName = _schoolAwadsName;\r\n    }",
                    this.contractContentFunction = "function start () public  {\r\n" + space8 +
                    "require(owner == msg.sender || awadsMaker1 == msg.sender || awadsMaker2 == msg.sender);\r\n" +
                    space8 + "require(openTime <= (block.timestamp - rightNow));\r\n" + space8 +
                    "require(checkTime < block.timestamp - rightNow);\r\n" + space8 +
                    "rightNow = block.timestamp;\r\n" + space4 + "}\r\n"
                this.contractContentFunction += "function createAwads (address _student) public {\r\n" + space8 +
                    "require(owner == msg.sender || awadsMaker1 == msg.sender || awadsMaker2 == msg.sender);\r\n" +
                    space8 + "if(schoolAwadsId == 0){\r\n" + space8 + space4 +
                    "schoolAwadsId = schoolAwadsId + 1;\r\n" + space8 + space4 +
                    "schoolAwadsIdToOwner[schoolAwadsId] = _student;\r\n" + space8 + space4 +
                    "rightNow = block.timestamp;\r\n" + space8 +
                    "} else if (openTime > (block.timestamp - rightNow)) {\r\n" + space8 + space4 +
                    "schoolAwadsId = schoolAwadsId + 1;\r\n" + space8 + space4 +
                    "schoolAwadsIdToOwner[schoolAwadsId] = _student;\r\n" + space8 + "}\r\n" + space4 + "}\r\n\r\n"
                this.contractContentFunction += "function change (address _to) public  {\r\n" + space8 +
                    "if(owner == msg.sender){\r\n" + space8 + "changerApprovals[0] = _to;\r\n" + space8 +
                    "} else if( awadsMaker1 == msg.sender ){\r\n" + space8 + "changerApprovals[1] = _to;\r\n" + space8 +
                    "} else if( awadsMaker2 == msg.sender) {\r\n" + space8 + "changerApprovals[2] = _to;\r\n" + space8 +
                    "}\r\n" + space4 + "}\r\n\r\n"
                this.contractContentFunction += "function changeMaker () public {\r\n" + space8 +
                    "if(changerApprovals[0] == msg.sender){\r\n" + space8 + space4 + " owner = msg.sender;\r\n" +
                    space8 + "} else if(changerApprovals[1] == msg.sender){\r\n" + space8 + space4 +
                    "awadsMaker1 = msg.sender;\r\n" + space8 + "} else if(changerApprovals[2] == msg.sender){\r\n" +
                    space8 + space4 + "awadsMaker2 = msg.sender;\r\n" + space8 + "}\r\n" + space4 + "}\r\n\r\n"

                this.contractCompleteGet()
            }



        }
    }
</script>