<template>
    <div>
        <Nav />
        <b-card
            class="mx-2 my-2"
            header-bg-variant="warning"
            header-text-variant="dark"
        >
            <!-- 헤더 -->
            <template #header>
                <h6 class="mb-0">NFT Maker Main</h6>
            </template>
            <b-container fluid class="p-4 bg-light" style="height: 77vh">
                <b-row class="text-center">
                    <b-col>
                        <a href="#/howToImg">
                            <b-img
                                title="이미지 제작으로 이동"
                                thumbnail
                                fluid
                                src="../assets/img/drawing2.jpg"
                                alt="Image 1"
                            ></b-img
                            ><br />
                            이미지 제작</a
                        >
                    </b-col>
                    <b-col>
                        <a href="#/gallery">
                            <b-img
                                title="내 갤러리로 이동"
                                thumbnail
                                fluid
                                src="../assets/img/gall3.png"
                                alt="Image 2"
                            ></b-img
                            ><br />내 갤러리</a
                        >
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>
</template>
<script>
import Nav from "../components/Nav123.vue";

export default {
    computed: {
        account() {
            return this.$store.state.account;
        },
    },
    name: "",
    components: {
        Nav,
    },
    data() {
        return {
            currentAccount: "",
        };
    },
    setup() {},
    created() {},
    mounted() {
        setInterval(async () => {
            // // 계정이 바뀌었는지 확인
            // console.log("web3", this.$store.state.web3);
            // console.log("어카운트", this.$store.state.account);

            await this.$store.state.web3.eth.getAccounts().then((accounts) => {
                this.currentAccount = accounts[0];
            });
            // console.log("현재 어카운트", this.currentAccount);
            // 현재 유저가 들고있는 계정(currentAccount)가 브라우저가 인식하는 계정(userAccount)와 다르다면
            if (this.currentAccount !== (await this.$store.state.account)) {
                // 계정을 업데이트 해준다
                this.$store.commit("accountSave", this.currentAccount);

                // 새 계정에 대한 UI로 업데이트하기 위한 함수 호출 및 메시지 알림
                alert(
                    "계정 주소가" +
                        this.$store.state.account +
                        "로 바뀌었습니다"
                );
                if (
                    this.$store.state.account ==
                    0xee442796570052932841b7588ab037255ce81183
                ) {
                    this.$store.commit("showSave", true);
                } else {
                    this.$store.commit("showSave", false);
                }
            }
        }, 5000);
    },
    unmounted() {},
    methods: {},
};
</script>
