<template>
    <div>
        <Nav />

        <b-card-group deck class="mx-auto my-3 col-10" nobody>
            <b-card
                title="NFT 발행"
                @click="setting(1)"
                img-src="../assets/img/화면/nft01.png"
                img-alt="Image"
                style="cursor:pointer; "
                img-top
            >
                <b-card-text style="height: 80px">
                    컨트렉트 발행없이 NFT를 발행할 수 있습니다.
                </b-card-text>

                <b-button variant="dark" block @click="setting(1)"
                    >이동</b-button
                >
            </b-card>

            <b-card
                title="NFT 및 NFT 컨트렉트 발행"
                @click="setting(0)"
                img-src="../assets/img/화면/nft02.png"
                img-alt="Image"
                style="cursor:pointer; "
                img-top
            >
                <b-card-text style="height: 80px">
                    자신만의 컨트렉트를 만들고 컨트렉트 및 NFT를 배포할 수
                    있습니다.
                </b-card-text>

                <b-button variant="dark" block @click="setting(0)"
                    >NFT 및 NFT 컨트렉트 발행하기</b-button
                >
            </b-card>

            <b-card
                title="배포된 컨트렉트로 NFT 발행"
                img-src="../assets/img/화면/nft03.png"
                img-alt="Image"
                img-top
            >
                <b-card-text style="height: 40px">
                    배포된 컨트렉트 주소를 통해 NFT를 발행할 수 있습니다.
                </b-card-text>

                <b-form-input
                    type="text"
                    v-model="text"
                    class="form-control"
                    placeholder="컨트렉트 주소 입력"
                    aria-label="기존 컨트랙트 주소 입력"
                    aria-describedby="basic-addon2"
                ></b-form-input>

                <b-button variant="dark" block @click="alreadyContract()">
                    배포된 컨트렉트로 NFT 발행하기
                </b-button>
            </b-card>
        </b-card-group>
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
            this.$store.commit("contractAccountSave", this.text);
            console.log(this.$store.state.contractAccount);
            this.$api("/api/list", "post", {
                param: [this.$store.state.contractAccount],
            }).then((result) => {
                console.log(result);
                if (result.length == 0) {
                    new $Swal(
                        "'NFT Maker'에서 발행한 컨트랙트 주소가 아닙니다"
                    );
                } else if (result[0].EOA != this.$store.state.account) {
                    new $Swal("당신은 이 컨트랙트의 주인이 아닙니다");
                } else {
                    this.$store.commit("abiSave", result[0].CA_abi);
                    console.log(this.$store.state.abi);
                    this.setting(2);
                }
            });
        },
        setting(num) {
            this.$store.commit("settingNumSave", num);
            this.$router.push({
                path: "imageBasic",
            });
        },
    },
};
</script>
