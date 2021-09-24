<template>
    <div class="row d-flex justify-content-center bg-warning container-fluid">
        <img
            src="../assets/img/metamask.jpg"
            style="cursor:pointer;"
            @click="init()"
        />
    </div>
</template>
<script>
import Web3 from "web3";
import { $swal } from "../../dapp";

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
                this.$store.state.web3 = new Web3(window.ethereum);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    // Acccounts now exposed
                    this.$store.state.web3.eth
                        .getAccounts()
                        .then((accounts) => {
                            // console.log(accounts[0]);
                            // window.account = accounts[0];
                            this.$store.state.account = accounts[0];
                            console.log(this.$store.state.account);
                            this.$router.push({ path: "select" });
                        });
                } catch (error) {
                    console.log("error");
                    $swal(
                        "메타마스트 접속에 실패하였습니다. 다시 시도해 주세요"
                    );
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                // Use Mist/MetaMask's provider.
                this.$store.state.web3 = window.web3;
                console.log("Injected web3 detected.");
            }
        },
    },
};
</script>
