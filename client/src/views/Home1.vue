<template>
    <div class="bg-warning fullPage">
        <h5 class="text-center">
            Welcome to NFT Maker
            <br />
            <br />
            <img
                src="../assets/img/NFT MAKER.png"
                v-b-popover.hover.bottom="'메타마스크 버튼을 눌러 시작하세요'"
                title="Welcome to NFT Maker!"
                style="max-width: 20rem;"
            />
        </h5>

        <div class="d-flex justify-content-center ">
            <img
                src="../assets/img/metamask.png"
                style="cursor:pointer; max-width: 15rem; max-height: 15rem;"
                v-b-popover.hover.bottom="'클릭하세요!'"
                title="메타마스크 연결"
                @click="init()"
            />
        </div>
    </div>
</template>
<script>
import Web3 from "web3";
import $Swal from "sweetalert2";

export default {
    name: "",
    components: {},
    data() {
        return {};
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
        async init() {
            if (window.ethereum) {
                this.$store.commit("web3Save", new Web3(window.ethereum));
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    // Acccounts now exposed
                    this.$store.state.web3.eth
                        .getAccounts()
                        .then((accounts) => {
                            // console.log(accounts[0]);
                            // window.account = accounts[0];
                            this.$store.commit("accountSave", accounts[0]);
                            console.log(this.$store.state.account);
                            this.$router.push({ path: "select" });
                        });
                } catch (error) {
                    console.log("error");
                    new $Swal(
                        "메타마스트 접속에 실패하였습니다. 다시 시도해 주세요"
                    );
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                // Use Mist/MetaMask's provider.
                this.$store.commit("web3Save", window.web3);
                console.log("Injected web3 detected.");
            }
        },
    },
};
</script>
<style scoped>
.fullPage {
    height: 100vh;
}
</style>
