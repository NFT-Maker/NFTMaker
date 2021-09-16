<template>
  <div>
    <div class="my-4">
      <div>내 주소: {{ account }}</div>
      <b-button @click="init()">지갑연결</b-button>
    </div>

    <div class="my-4">
      <b-button @click="createContract()">컨트렉트 생성</b-button>
    </div>

    <div class="my-4">
      <div>생성된 컨트렉트 주소: {{createContractAddress}}</div>
      <div>생성된 컨트렉트 주소: {{ contract._address}}</div>
      <div><input type="text" v-model="createContractAddress" placeholder="컨트렉트 주소 입력" /></div>
      <b-button @click="connectContract()">컨트렉트 연결</b-button>
    </div>

    <div class="my-4">
      <div>viewName함수 : {{ oldName }}</div>
      <b-button @click="viewName()">viewName</b-button>
    </div>

    <div class="my-4">
      <div><input type="text" v-model="newName" placeholder="문자를 넣고 버튼을 눌러 변경" /></div>
      <b-button @click="changeName()">changeName</b-button>
    </div>

     <div class="my-4">
      <div>viewNum함수 : {{ oldNum }}</div>
      <b-button @click="viewNum()">viewNum</b-button>
    </div>

    <div class="my-4">
      <div><input type="text" v-model="newNum" placeholder="숫자을 넣고 버튼을 눌러 변경" /></div>
      <b-button @click="changeNum()">changeNum</b-button>
    </div>


    <b-button @click="test">test</b-button>

    <h1>data 확인하기</h1>
    <!-- 성공 -->
    <!-- <p>oldName</p>
    <div>{{oldName}}</div> -->

    <!-- 성공 지갑연결하면 내 지갑 주소 출력-->
    <!-- <p>account</p>
    <div>{{account}}</div> -->

    <!-- 성공 -->
    <!-- <p>abi</p>
    <div>{{abi}}</div> -->

    <!-- 성공 -->
    <!-- <p>newName</p>
    <div>{{newName}}</div> -->

    <!-- 성공 -->
    <!-- <p>createContractAddress</p>
    <div>{{createContractAddress}}</div> -->

  </div>
</template>
<script>
  import Web3 from "web3";
  import {
    testDo
  } from '../../dapp'

  export default {
    name: "",
    components: {},
    data() {
      return {
        // 내 지갑 주소
        account: "",
        // 컨트렉트 저장
        contract: {},
        // abi 저장
        abi: JSON.parse(testDo.abi),
        // bytecode 저장
        bytecode: testDo.bytecode,
        // 생성된 컨트렉트 주소
        createContractAddress: "",
        // viewName으로 불러온 값
        oldName: "",
        // changeName 실행할 값(데이터바인딩)
        newName: "",
        // viewNum으로 불러온 값
        oldNum: "",
        // changeNum 실행할 값(데이터바인딩)
        newNum: "",

      }
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

      //기존 파일 주소
      createContract() {
        new this.web3.eth.Contract(this.abi)
          .deploy({
            data: this.bytecode
          })
          .send({
            from: this.account
          })
          .then((result) => {
            // 컨트렉트 주소 가져오기
            this.createContractAddress = result.options.address
            console.log(result.options.address);
            // 컨트렉트 정보 가져오기
            this.contract = result;
          });
      },

      //컨트랙트 연결
      connectContract() {
        this.contract = new this.web3.eth.Contract(
          this.abi,
          this.createContractAddress
        );
        // this.contract1 = window.contract;
        // console.log(this.contract1);

        // 이벤트 리슨
        // this.contract.events.changeName({}, (error, event) => {
        //   console.log(event);
        //   this.listening =
        //     event.returnValues.name + ", " + event.returnValues.sender;
        // });
        // this.listening = "Listening...";
      },

      // 이름 가져오기
      viewName() {
        this.contract.methods
          .viewName()
          .call()
          .then((result) => {
            console.log(result);
            this.oldName = result;
          });
      },

      // 이름 저장하기
      async changeName() {
        await this.contract.methods
          .changeName(this.newName)
          .send({
            from: this.account
          });
        this.viewName();
      },

      // 번호 불러오기
      viewNum() {
        this.contract.methods
          .viewNum()
          .call()
          .then((result) => {
            console.log(result);
            this.oldNum = result;
          });
      },

      // 번호 저장하기
      async changeNum() {
        await this.contract.methods
          .changeNum(this.newNum)
          .send({
            from: this.account
          });
        // this.viewNum();
      },

      test() {
        alert(this.newName);
      },


    },
  };
</script>