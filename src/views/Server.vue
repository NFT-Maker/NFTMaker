<template>
    <div>
        <button @click="testServer()">testServer</button><br />
        <div>{{ list }}</div>
        <br />
        <button @click="testServer1()">testServer</button><br />
        <div>{{ list1 }}</div>
        <br />
        <button @click="test11()">test11</button><br />
        <div>{{ list2 }}</div>
        <br />
        <button @click="deleteImage(1)">모달창 테스트</button><br />
    </div>
</template>
<script>
import { testDo } from "../../dapp";
export default {
    name: "",
    components: {},
    data() {
        return {
            sampleData: "",
            list: [],
            list1: [],
            list2: [],
        };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
        async testServer() {
            this.list = await this.$api("/api/list", "post");
            console.table(this.list);
        },
        async testServer1() {
            this.list1 = await this.$api("/api/listUp", "post");
            console.table(this.list1);
        },

        async test11() {
            var test1 = {};
            (test1.EOA = "hello"),
                (test1.CA = "world"),
                (test1.CA_abi = testDo.abi);

            this.list2 = await this.$api("/api/test11", "post", {
                param: [test1],
            });
            console.log(this.list2);
        },

        deleteImage(id) {
            console.log(this.$swal);
            this.$swal
                .fire({
                    title: "정말 삭제 하시겠습니까?",
                    showCancelButton: true,
                    confirmButtonText: `삭제`,
                    cancelButtonText: `취소`,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await this.$api("/api/imageDelete", { param: [id] });
                        this.getProductImage();
                        this.$swal.fire("삭제되었습니다!", "", "success");
                    }
                });
        },

        async uploadFile(files, type) {
            let name = "";
            let data = null;
            if (files) {
                name = files[0].name;
                data = await this.$base64(files[0]);
            }
            const { error } = await this.$api(
                `/upload/${this.productId}/${type}/${name}`,
                {
                    data,
                }
            );
            if (error) {
                return this.$swal(
                    "이미지 업로드 실패했습니다. 다시 시도하세요."
                );
            }
            this.$swal("이미지가 업로드 되었습니다.");
            setTimeout(() => {
                this.getProductImage();
            }, 1000);
        },
    },
};
</script>
