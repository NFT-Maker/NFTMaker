<template>
    <div>
        <Nav />
        <div class="bg-light container-fluid">
            <div>
                들어오는 방법에 따라 화면에서 필요한 부분만 바꿔서 보여주면될듯!
            </div>
            <div v-if="this.$store.state.settingNum == 0">
                자신만의 이미지와 컨트랙트 만들기
            </div>
            <button
                v-if="this.$store.state.settingNum == 0"
                @click="goMakeContract()"
            >
                컨트랙트 만들기로 이동
            </button>
            <div v-if="this.$store.state.settingNum == 1">
                NFT 메이커 컨트랙트로 발행
            </div>
            <button
                v-if="this.$store.state.settingNum == 1"
                @click="goGallery()"
            >
                NFT Maker로 NFT 발행
            </button>
            <div v-if="this.$store.state.settingNum == 2">
                자기 컨트랙트로 발행
            </div>
            <button
                v-if="this.$store.state.settingNum == 2"
                :title="`${this.$store.state.contract}` + '에서 NFT 발행'"
                @click="goGallery()"
            >
                내 컨트랙트로 NFT 발행
            </button>
        </div>
    </div>
</template>
<script>
import Nav from "../components/Nav123.vue";
export default {
    name: "",
    components: {
        Nav,
    },
    data() {
        return {
            sampleData: "",
        };
    },
    setup() {},
    created() {
        // 0번 컨트랙트 만들기에서 할것임
        // 2번 이전 화면에서 이미 저장해 둠
        if (this.$store.state.settingNum == 1) {
            this.$store.state.contract =
                "NFT Maker 컨트랙트 주소 만들어서 db에 등록해야함";
            this.$api("/api/list", "post", {
                param: [this.$store.state.contract],
            }).then((result) => {
                console.log(result);
                this.$store.state.abi = result[0].CA_abi;
                console.log(this.$store.state.abi);
            });
        }
    },
    mounted() {},
    unmounted() {},
    methods: {
        goGallery() {
            this.$router.push({ path: "gallery" });
        },
        goMakeContract() {
            this.$router.push({ path: "makeContract" });
        },
    },
};
</script>
