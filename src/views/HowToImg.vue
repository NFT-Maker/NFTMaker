<template>
    <div>
        <b-button variant="success">이미지 편집 + 컨트랙트 편집</b-button
        ><br /><br />
        <b-button variant="primary">이미지 편집 + NFT Maker</b-button
        ><br /><br />
        <!-- <b-col xl="9"></b-col> -->
        <b-form-input
            v-model="text"
            placeholder="기존 컨트랙트 주소 입력"
        ></b-form-input>
        <b-button variant="primary" @click="alreadyContract()"
            >이미지 편집 + 기존 컨트랙트</b-button
        >
    </div>
</template>
<script>
export default {
    name: "",
    components: {},
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
