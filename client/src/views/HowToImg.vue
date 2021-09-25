<template>
    <div>
        <Nav />
        <div class="bg-light container-fluid" style="height: 85vh">
            <!-- 자신만의 컨트랙트를 만드는 화면 -->
            <br />
            <br />
            <br />
            <div class="d-flex justify-content-center">
                <b-button variant="dark" @click="setting(0)"
                    >이미지 편집 + 컨트랙트 편집</b-button
                >
            </div>
            <br />
            <br />
            <div class="d-flex justify-content-center">
                <b-button variant="dark" @click="setting(1)"
                    >이미지 편집(NFT Maker)</b-button
                >
            </div>
            <!-- NFT Maker의 컨트랙트로 NFT 만드는 화면 -->
            <br /><br />

            <div class="input-group mb-3">
                <input
                    type="text"
                    v-model="text"
                    class="form-control"
                    placeholder="기존 컨트랙트 주소 입력(12입력하고 버튼클릭하면 이동가능)"
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
import $Swal from "sweetalert2";
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
            this.$store.commit("contractSave", this.text);
            console.log(this.$store.state.contract);
            this.$api("/api/list", "post", {
                param: [this.$store.state.contract],
            }).then((result) => {
                console.log(result);
                if (result.length == 0) {
                    new $Swal(
                        "'NFT Maker'에서 발행한 컨트랙트 주소가 아닙니다"
                    );
                } else {
                    this.$store.commit("abiSave", result[0].CA_abi);
                    console.log(this.$store.state.abi);
                    this.setting(2);
                }
            });
        },
        setting(num) {
            this.$store.commit("settingNumSave", num);
            this.$router.push({ path: "imageBasic" });
        },
    },
};
</script>
