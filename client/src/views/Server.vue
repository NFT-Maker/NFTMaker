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
            list3: [],
            list4: [],
            list5: [],
            list6: [],

            productId: 1,
        };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
        //t_eoa 불러오기
        async testServer() {
            this.list = await this.$api("/api/list", "post");
            console.table(this.list);
        },
        //t_mySet 불러오기
        async callMySet() {
            this.list2 = await this.$api("/api/makeMySet", "post");
            console.table(this.list2);
        },
        //t_bacic 블러오기
        async callBasic() {
            this.list3 = await this.$api("/api/makeBasicList", "post");
            console.table(this.list3);
        },

        async testServer1() {
            this.list1 = await this.$api("/api/listUp", "post");
            console.table(this.list1);
        },

        //t_eoa에 공개키. 컨트랙트 주소, abi 저장
        async test11() {
            var test1 = {};
            (test1.EOA = "hello"), //eoa
                (test1.CA = "world"), //ca
                (test1.CA_abi = testDo.abi); //ca의 abi

            this.list4 = await this.$api("/api/test11", "post", {
                param: [test1],
            });
            console.log(this.list4);
        },

        //t_mySet에 개인 서식 양식 저장
        async mySetListUp() {
            var test2 = {};
            (test2.EOA = "hello"), //eoa
                (test2.name = "world"), //서식 이름
                (test2.CA_abi = testDo.abi); //내가 만든 이미지 서식을 변환한 json파일

            this.list5 = await this.$api("/api/test11", "post", {
                param: [test2],
            });
            console.log(this.list5);
        },

        //t_basic 에 이미지 업로드
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
