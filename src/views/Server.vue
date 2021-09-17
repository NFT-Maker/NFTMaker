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
        <br />
        <input
            type="file"
            class="form-control"
            accept="image/png,image/jpeg"
            @change="uploadFile($event.target.files, 2)"
        />
        <div class="alert alert-secondary" role="alert">
            <ul>
                <li>최대 5개 가능</li>
                <li>이미지 사이즈 : 700*700</li>
                <li>파일 사이즈 : 1M 이하</li>
                <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
        </div>
    </div>
</template>
<script>
import { testDo, $swal } from "../../dapp";
export default {
    name: "",
    components: {},
    data() {
        return {
            sampleData: "",
            list: [],
            list1: [],
            list2: [],
            productId: 1,
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

        async uploadFile(files, type) {
            let name = "";
            let data = null;
            if (files) {
                name = files[0].name;
                data = await this.$base64(files[0]);
            }
            const { error } = await this.$api(
                `/upload/${this.productId}/${type}/${name}`,
                "post",
                {
                    data,
                }
            );
            if (error) {
                return new $swal(
                    "이미지 업로드 실패했습니다. 다시 시도하세요."
                );
            }
            new $swal("이미지가 업로드 되었습니다.");
            // setTimeout(() => {
            //     this.getProductImage();
            // }, 1000);
        },

        // async uploadFile(files, type) {
        //     let name = "";
        //     let data = null;
        //     if (files) {
        //         name = files[0].name;
        //         data = await this.$base64(files[0]);
        //     }
        //     console.log(data);
        //     const { error } = await this.$api(`/upload/test/${type}/${name}`, {
        //         data,
        //     });
        //     if (error) {
        //         return this.$swal(
        //             "이미지 업로드 실패했습니다. 다시 시도하세요."
        //         );
        //     }
        //     $swal("이미지가 업로드 되었습니다.");
        //     setTimeout(() => {
        //         this.getProductImage();
        //     }, 1000);
        // },

        deleteImage(id) {
            console.log($swal);
            $swal
                .fire({
                    title: "정말 삭제 하시겠습니까?",
                    showCancelButton: true,
                    confirmButtonText: `삭제`,
                    cancelButtonText: `취소`,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await this.$api("/api/imageDelete", "post", {
                            param: [id],
                        });
                        this.getProductImage();
                        $swal.fire("삭제되었습니다!", "", "success");
                    }
                });
        },
    },
};
</script>
