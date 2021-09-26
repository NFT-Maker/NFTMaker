<template>
    <div>
        <!-- 지갑연결 -->
        <div class="mx-2 my-2 row" deck>
            <div class="col-5">
                <b-card
                    class="mx-2 my-2"
                    header-bg-variant="warning"
                    header-text-variant="dark"
                >
                    <template #header>
                        <h5 class="mb-0">NFT 컨트렉트</h5>
                    </template>
                    <b-textarea
                        class=""
                        rows="30"
                        v-model="contractComplete"
                    ></b-textarea>
                </b-card>
            </div>
            <div class="col-7">
                <b-card
                    body-class="text-center"
                    class="mx-2 my-2"
                    header-bg-variant="warning"
                    header-text-variant="dark"
                    no-body
                >
                    <template #header>
                        <h5 class="mb-0">NFT 컨트렉트 기능</h5>
                    </template>
                    <b-tabs
                        card
                        active-nav-item-class="font-weight-bold text-uppercase text-dark"
                        nav-class="font-weight-bold"
                    >
                        <!------------------- 관리자 ----------------->
                        <b-tab title="관리자">
                            <b-card-title
                                >컨트렉트 관리자를 설정합니다.</b-card-title
                            >

                            <b-form-group v-slot="{ selectedManager }">
                                <b-form-radio-group
                                    v-model="sel_man"
                                    :options="opt_man"
                                    :aria-describedby="selectedManager"
                                    stacked
                                >
                                </b-form-radio-group>
                            </b-form-group>

                            <div class="mt-3">
                                Selected: <strong>{{ sel_man }}</strong>
                            </div>

                            <b-form-tags
                                input-id="tags-basic"
                                v-model="val_man"
                            ></b-form-tags>
                            <p class="mt-2">Value: {{ val_man }}</p>
                            <b-button @click="funMan()">콘솔</b-button>
                            <!--  -->
                        </b-tab>

                        <!------------------- 발행량 ----------------->
                        <b-tab title="발행량">
                            <b-card-title
                                >NFT 발행량을 설정합니다.</b-card-title
                            >

                            <b-form-group v-slot="{ selectedLimit }">
                                <b-form-radio-group
                                    v-model="sel_lim"
                                    :options="opt_lim"
                                    :aria-describedby="selectedLimit"
                                    stacked
                                >
                                </b-form-radio-group>
                            </b-form-group>

                            <!-- 추후 삭제 -->
                            <div class="mt-3">
                                Selected: <strong>{{ sel_lim }}</strong>
                            </div>

                            <b-input-group
                                v-show="sel_lim == 'first'"
                                prepend="수량"
                            >
                                <b-form-input
                                    type="number"
                                    min="0"
                                    v-model="val_lim"
                                    placeholder="Enter your name"
                                >
                                </b-form-input>
                            </b-input-group>

                            <!-- 추후 삭제 -->
                            <p class="mt-2">Value: {{ val_lim }}</p>
                            <b-button @click="funLim()">콘솔</b-button>
                        </b-tab>
                        <!-- -------------------발행주기 ------------->
                        <b-tab title="발행 주기">
                            <b-card-title
                                >NFT 발행 주기를 설정합니다.</b-card-title
                            >

                            <b-form-group v-slot="{ selectedPeriod }">
                                <b-form-radio-group
                                    v-model="sel_per"
                                    :options="opt_per"
                                    :aria-describedby="selectedPeriod"
                                    stacked
                                >
                                </b-form-radio-group>
                            </b-form-group>

                            <!-- 추후 삭제 -->
                            <div class="mt-3">
                                Selected: <strong>{{ sel_per }}</strong>
                            </div>

                            <b-input-group
                                v-show="sel_per == 'first'"
                                prepend="기간(일)"
                            >
                                <b-form-input
                                    type="number"
                                    min="0"
                                    v-model="val_per"
                                    placeholder="Enter your name"
                                >
                                </b-form-input>
                            </b-input-group>

                            <!-- 추후 삭제 -->
                            <p class="mt-2">Value: {{ val_per }}</p>
                            <b-button @click="funPer()">콘솔</b-button>
                        </b-tab>

                        <!------------------- 발행권한 ----------------->

                        <b-tab title="발행 권한">
                            <b-card-title
                                >NFT 발행 권한을 설정합니다.</b-card-title
                            >

                            <b-form-group v-slot="{ selectedAuthenticationt }">
                                <b-form-radio-group
                                    v-model="sel_aut"
                                    :options="opt_aut"
                                    :aria-describedby="selectedAuthenticationt"
                                    stacked
                                >
                                </b-form-radio-group>
                            </b-form-group>

                            <div class="mt-3">
                                Selected: <strong>{{ sel_aut }}</strong>
                            </div>
                            <b-button @click="funAut()">콘솔</b-button>
                        </b-tab>

                        <!------------------- 여기다가 선택값 ----------------->
                        <b-tab title="준비 중...">
                            <b-card-title
                                >업데이트를 기다려주세요!</b-card-title
                            >
                        </b-tab>
                    </b-tabs>
                </b-card>

                <b-card
                    class="mx-2 my-2"
                    header-bg-variant="warning"
                    header-text-variant="dark"
                >
                    <template #header>
                        <h5 class="mb-0">NFT 컨트렉트 생성</h5>
                    </template>
                    <b-button
                        variant="warning"
                        class="mx-1 my-1 "
                        @click="contract_Owner()"
                        >기본
                    </b-button>
                    <!-- <b-button variant="warning" class="mx-1 my-1" @click="contract_schoolAwads()">상장</b-button> -->
                    <br />
                    <!-- <b-button variant="dark" class="mx-1 my-1" @click="init()">지갑연결</b-button> -->
                    <!-- <b-button variant="dark" class="mx-1 my-1" @click="contractSaveStore()">컨트렉트 스토어에 저장</b-button> -->
                    <b-button
                        variant="dark"
                        class="mx-1 my-1"
                        @click="contractCompile()"
                        >컨트렉트 컴파일</b-button
                    >
                    <b-button
                        variant="dark"
                        class="mx-1 my-1"
                        @click="contractDeploy()"
                        >컨트렉트 발행</b-button
                    >
                    <b-button
                        variant="dark"
                        class="mx-1 my-1"
                        @click="[(show = true)]"
                        >NFT 컨트렉트 보기</b-button
                    >
                </b-card>
            </div>
            <!-- contractLibrary<input type="text" v-model="contractLibrary"><br> -->
            <!-- contractName<input type="text" v-model="contractName"><br> -->
            <!-- contractUsing<input type="text" v-model="contractUsing"><br> -->
            <!-- contractContentVariable<input type="text" v-model="contractContentVariable"><br> -->
            <!-- contractMapping<input type="text" v-model="contractMapping"><br> -->
            <!-- contractConstructor<input type="text" v-model="contractConstructor"><br> -->
            <!-- contractContentFunction<input type="text" v-model="contractContentFunction"><br> -->
        </div>

        <!-- ---------------------- 모달 --------------------------------- -->
        <b-modal
            v-model="show"
            title="NFT 컨트렉트 코드"
            header-bg-variant="warning"
            header-text-variant="dark"
            body-bg-variant="light"
            body-text-variant="dark"
            footer-bg-variant="dark"
            footer-text-variant="light"
        >
            <b-card title="NFT 컨트렉트 코드" class="mt-2">
                <!-- 컨트렉트를 보여줄 textarea -->
            </b-card>
            <template #modal-footer>
                <div class="w-100">
                    <h5 class="float-left">NFT Maker</h5>

                    <b-button
                        variant="warning"
                        size="sm"
                        class="float-right"
                        @click="show = false"
                    >
                        닫기
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>
<script>
// import Web3 from "web3";

export default {
    name: "",
    components: {},
    computed: {
        account() {
            return this.$store.state.account;
        },
    },
    data() {
        return {
            // 내 지갑 주소

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
            // ======================== 컨트렉트 선택 ===================
            // 서브관리자
            sel_man: "first",
            opt_man: [
                {
                    text: "관리자를 설정하고, 변경할 수 있습니다.",
                    value: "first",
                },
                {
                    text: "관리자를 설정하고, 변경할 수 없습니다.",
                    value: "second",
                },
                {
                    text: "관리자를 추가하지않습니다.",
                    value: "third",
                },
            ],
            val_man: [],
            tex_man: "",
            tex_man1: "",
            tex_man2: "",
            tex_man3: "",
            // 발행량 제한
            sel_lim: "first",
            opt_lim: [
                {
                    text: "발행량을 제한합니다.",
                    value: "first",
                },
                {
                    text: "발행량을 제한하지 않습니다.",
                    value: "second",
                },
            ],
            val_lim: "",
            tex_lim: "",
            // 발행 주기
            sel_per: "first",
            opt_per: [
                {
                    text: "발행주기를 설정합니다.",
                    value: "first",
                },
                {
                    text: "발행주기를 설정하지 않습니다.",
                    value: "second",
                },
                {
                    text: "발행주기를 관리자가 제어합니다.",
                    value: "third",
                },
            ],
            val_per: "first",
            tex_per1: "",
            tex_per3: "",
            tex_per4: "",
            tex_per5: "",
            // 발행 권한
            sel_aut: "first",
            opt_aut: [
                {
                    text: "관리자만 발행할 수 있습니다.",
                    value: "first",
                },
                {
                    text: "누구나 발행할 수 있습니다.",
                    value: "second",
                },
            ],
            tex_aut: "",
        };
    },
    created() {},
    mounted() {},
    updated() {},
    unmounted() {},
    methods: {
        serverGo() {
            this.$api("/api/imageDelete", "post", {
                param: [
                    {
                        EOA: this.$store.state.account,
                        CA_abi: this.abi,
                        CA: "",
                    },
                ],
            });
        },

        contractSaveStore() {
            this.$store.commit("contractSave", this.contractCreating);
            console.log(this.$store.state.contract);
        },

        // 컨트렉트 컴파일
        async contractCompile() {
            var contractCode = this.contractComplete;

            await this.$api("/compile", "post", {
                param: [contractCode],
            }).then((res) => {
                console.log("123", res);
                console.log(res.err);

                this.abi = res.abi;
                this.bytecode = res.bytecode;
                console.log(this.abi);
                console.log(this.bytecode);
            });
        },

        // 컨트렉트 생성
        contractDeploy() {
            new this.$store.state.web3.eth.Contract(this.abi)
                .deploy({
                    data: this.bytecode,
                })
                .send({
                    // from: this.account
                    from: this.$store.state.account,
                })
                .then((result) => {
                    // 컨트렉트 주소 가져오기
                    this.contractAddress = result.options.address;
                    console.log(result.options.address);
                    // 컨트렉트 정보 가져오기 (확인해보기)
                    // this.contract = result;
                });
        },
        // -----------------------------------------------------
        contractCompleteGet() {
            var space = " ";
            var space4 = " " + " " + " " + " ";
            return (this.contractComplete =
                this.contractVer +
                "\r\n\r\n" +
                // this.contractLibrary + "\r\n\r\n" +
                "contract" +
                space +
                this.contractName +
                space +
                "{\r\n\r\n" +
                space4 +
                // this.contractUsing + "\r\n\r\n" + space4 +
                this.contractContentVariable +
                "\r\n\r\n" +
                space4 +
                this.contractMapping +
                "\r\n\r\n" +
                space4 +
                this.contractConstructor +
                "\r\n\r\n" +
                space4 +
                this.contractContentFunction +
                "\r\n\r\n}");
        },

        contract_Owner() {
            this.contractContentVariable =
                "    uint public NFTId = 0;\r\n" + this.tex_per + this.tex_per3;
            this.contractMapping =
                "mapping(uint => address) public NFTToOwner;\r\n    mapping(uint => string) public NFTUrl;\r\n    mapping(address => uint) public NFTCount;\r\n" +
                this.tex_man;
            (this.contractConstructor =
                "    constructor () {\r\n" +
                this.tex_man1 +
                "          NFTToOwner[NFTId] = msg.sender;\r\n            NFTUrl[NFTId] = " +
                '"' +
                localStorage.getItem("ipfsCidImgLink") +
                '"' +
                ";\r\n            NFTId = NFTId + 1;\r\n            NFTCount[msg.sender] = NFTCount[msg.sender] + 1;    }"),
                (this.contractContentFunction =
                    "function NFT(address _who, string memory _url) public{\r\n" +
                    this.tex_lim +
                    this.tex_per1 +
                    this.tex_aut +
                    this.tex_per5 +
                    "        NFTToOwner[NFTId] = _who;\r\n        NFTUrl[NFTId] = _url;\r\n        NFTId = NFTId + 1;\r\n        NFTCount[_who] = NFTCount[_who] + 1;\r\n    }\r\n\r\n" +
                    this.tex_man2 +
                    this.tex_per4);
            this.contractCompleteGet();
        },

        contract_schoolAwads() {
            var space4 = " " + " " + " " + " ";
            var space8 = space4 + space4;

            this.contractContentVariable =
                "address public owner;\r\n    address public awadsMaker1;\r\n    address public awadsMaker2;\r\n    uint public rightNow;\r\n    uint public schoolAwadsId = 0;\r\n    uint public checkTime;\r\n    uint public openTime;\r\n    uint public check = 0;\r\n    uint public check1 = 1;\r\n    string public schoolAwadsName;";
            (this.contractMapping =
                "mapping(uint => address) public schoolAwadsIdToOwner;\r\n    mapping(uint => address) public changerApprovals;"),
                (this.contractConstructor =
                    "constructor (uint _openTime, address _awadsMaker1, address _awadsMaker2, string memory _schoolAwadsName) {\r\n        owner = msg.sender;\r\n        checkTime = 330 days;\r\n        openTime = _openTime;\r\n        awadsMaker1 = _awadsMaker1;\r\n        awadsMaker2 = _awadsMaker2;\r\n        schoolAwadsName = _schoolAwadsName;\r\n    }"),
                (this.contractContentFunction =
                    "function start () public  {\r\n" +
                    space8 +
                    "require(owner == msg.sender || awadsMaker1 == msg.sender || awadsMaker2 == msg.sender);\r\n" +
                    space8 +
                    "require(openTime <= (block.timestamp - rightNow));\r\n" +
                    space8 +
                    "require(checkTime < block.timestamp - rightNow);\r\n" +
                    space8 +
                    "rightNow = block.timestamp;\r\n" +
                    space4 +
                    "}\r\n");
            this.contractContentFunction +=
                "function createAwads (address _student) public {\r\n" +
                space8 +
                "require(owner == msg.sender || awadsMaker1 == msg.sender || awadsMaker2 == msg.sender);\r\n" +
                space8 +
                "if(schoolAwadsId == 0){\r\n" +
                space8 +
                space4 +
                "schoolAwadsId = schoolAwadsId + 1;\r\n" +
                space8 +
                space4 +
                "schoolAwadsIdToOwner[schoolAwadsId] = _student;\r\n" +
                space8 +
                space4 +
                "rightNow = block.timestamp;\r\n" +
                space8 +
                "} else if (openTime > (block.timestamp - rightNow)) {\r\n" +
                space8 +
                space4 +
                "schoolAwadsId = schoolAwadsId + 1;\r\n" +
                space8 +
                space4 +
                "schoolAwadsIdToOwner[schoolAwadsId] = _student;\r\n" +
                space8 +
                "}\r\n" +
                space4 +
                "}\r\n\r\n";
            this.contractContentFunction +=
                "function change (address _to) public  {\r\n" +
                space8 +
                "if(owner == msg.sender){\r\n" +
                space8 +
                "changerApprovals[0] = _to;\r\n" +
                space8 +
                "} else if( awadsMaker1 == msg.sender ){\r\n" +
                space8 +
                "changerApprovals[1] = _to;\r\n" +
                space8 +
                "} else if( awadsMaker2 == msg.sender) {\r\n" +
                space8 +
                "changerApprovals[2] = _to;\r\n" +
                space8 +
                "}\r\n" +
                space4 +
                "}\r\n\r\n";
            this.contractContentFunction +=
                "function changeMaker () public {\r\n" +
                space8 +
                "if(changerApprovals[0] == msg.sender){\r\n" +
                space8 +
                space4 +
                " owner = msg.sender;\r\n" +
                space8 +
                "} else if(changerApprovals[1] == msg.sender){\r\n" +
                space8 +
                space4 +
                "awadsMaker1 = msg.sender;\r\n" +
                space8 +
                "} else if(changerApprovals[2] == msg.sender){\r\n" +
                space8 +
                space4 +
                "awadsMaker2 = msg.sender;\r\n" +
                space8 +
                "}\r\n" +
                space4 +
                "}\r\n\r\n";

            this.contractCompleteGet();
        },

        // ==============NFT 컨트렉트 기능 ======================

        funMan() {
            // first, second, third
            console.log(this.sel_man);
            // 입력한 값
            console.log(this.val_man);

            this.tex_man = "";
            this.tex_man1 = "";
            this.tex_man2 = "";
            this.tex_man3 = "";

            if (this.sel_man == "first") {
                this.tex_man = "    mapping(address => bool) public owner;\r\n";
                // construct에 넣을 것
                this.tex_man1 = "        owner[msg.sender] = true;\r\n";
                // 관리자 추가하는 함수
                this.tex_man2 =
                    "    function getOwner(address _add, bool _bool) public {\r\n        require(owner[msg.sender] == true);\r\n        owner[_add] = _bool;\r\n    }\r\n\r\n";
                // require
                this.tex_man3 =
                    "        require(owner[msg.sender] = true);\r\n";
            } else if (this.sel_man == "second") {
                this.tex_man = "    mapping(address => bool) public owner;\r\n";
                this.tex_man1 = "        owner[msg.sender] = true\r\n";
                this.tex_man3 =
                    "        require(owner[msg.sender] = true);\r\n";
                //  for문 돌려야지
            } else {
                this.tex_man = "";
                this.tex_man1 = "";
                this.tex_man2 = "";
                this.tex_man3 = "";
            }
        },
        funLim() {
            // first, second, third
            console.log(this.sel_lim);
            // 입력한 값
            console.log(this.val_lim);

            this.tex_lim = "";
            if (this.sel_lim == "first") {
                this.tex_lim =
                    "        require(NFTId < " + this.val_lim + ");\r\n";
                console.log("update: ", this.tex_lim);
            } else {
                this.tex_lim = "";
                console.log("update: ", this.tex_lim);
            }
        },
        funPer() {
            // first, second, third
            console.log(this.sel_per);
            // 입력한 값
            console.log(this.val_per);

            this.tex_per = "";
            this.tex_per1 = "";
            this.tex_per3 = "";
            this.tex_per4 = "";
            this.tex_per5 = "";

            if (this.sel_per == "first") {
                // 함수 설정
                this.tex_per =
                    "    uint public rightNow;\r\n    uint public checkTime;\r\n    uint public openTime;\r\n";
                this.tex_per1 =
                    "        require(openTime <= (block.timestamp - rightNow));\r\n        require(checkTime < (block.timestamp - rightNow));\r\n        rightNow = block.timestamp;";

                console.log("update: ", this.tex_per);
            } else if (this.sel_per == "third") {
                // 관리자가 제어
                this.tex_per3 = "    bool public open;\r\n";
                this.tex_per4 =
                    "    function openAndClose() public {\r\n        " +
                    this.tex_man3 +
                    "    if(open == true){\r\n            open = false;\r\n        } else {\r\n        open = false;\r\n    }\r\n    }\r\n\r\n";
                this.tex_per5 = "        require(open == true);\r\n";

                console.log("update: ", this.tex_per);
            } else {
                this.tex_per = "";
                this.tex_per1 = "";
                this.tex_per3 = "";
                this.tex_per4 = "";
                this.tex_per5 = "";

                console.log("update: ", this.tex_per);
            }
        },
        funAut() {
            // first, second, third
            console.log(this.sel_aut);
            this.tex_aut = "";
            if (this.sel_aut == "first") {
                this.tex_aut = this.tex_man3;
                console.log(this.sel_aut);
            } else {
                this.tex_aut = "";
                console.log(this.sel_aut);
            }
        },
    },
};
</script>
