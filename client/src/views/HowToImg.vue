<template>
    <div>
        <Nav />
        <div class="bg-warning container-fluid">
            <!-- 자신만의 컨트랙트를 만드는 화면 -->
            <div class="d-flex justify-content-center">
                <a href="#/"
                    ><b-button variant="dark"
                        >이미지 편집 + 컨트랙트 편집</b-button
                    ></a
                >
            </div>
            <br />
            <br />
            <div class="d-flex justify-content-center">
                <a href="#/"
                    ><b-button variant="dark" @click="onlyNFT()"
                        >이미지 편집(NFT Maker)</b-button
                    ></a
                >
            </div>
            <!-- NFT Maker의 컨트랙트로 NFT 만드는 화면 -->
            <br /><br />

            <div class="input-group mb-3">
                <input
                    type="text"
                    v-model="text"
                    class="form-control"
                    placeholder="기존 컨트랙트 주소 입력"
                    aria-label="기존 컨트랙트 주소 입력"
                    aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                    <b-button variant="dark" @click="alreadyContract()">
                        이미지 편집 + 기존 컨트랙트
                    </b-button>
                </div>
            </div>
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
            text: "",
        };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
        alreadyContract() {
            this.$store.state.contract = this.text;
            this.$api("/api/list", "post", {
                param: [this.$store.state.contract],
            }).then((result) => {
                console.log(result);
                this.$store.state.abi = result[0].CA_abi;
                console.log(this.$store.state.abi);
            });
        },
    },
};
</script>
