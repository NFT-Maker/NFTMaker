<template>
    <div>
        <FileUp />
        <select v-model="select">
            <option :value="0">상장</option>
            <option :value="1">봉사증</option>
            <option :value="2">이수증</option>
        </select>

        <main class="mt-3">
            <div class="container">
                <h2 class="text-center">제품 사진 등록</h2>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">제품ID</label>
                    <div class="col-md-9">
                        {{ list3.length }}
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">제품명</label>
                    <div class="col-md-9"></div>
                </div>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">썸네일이미지</label>
                    <div class="col-md-9">
                        <div class="row">
                            <div
                                class="col-lg-3 col-md-4 col-sm-2"
                                :key="i"
                                v-for="(m, i) in list3.filter(
                                    (c) => c.type == 0
                                )"
                            >
                                <div class="position-relative">
                                    <img
                                        :src="
                                            `http://localhost:3000/download/${m.type}/${m.path}`
                                        "
                                        class="img-fluid"
                                    />
                                    <div
                                        class="position-absolute top-0 end-0"
                                        style="cursor:pointer;"
                                    >
                                        X
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            type="file"
                            class="form-control"
                            accept="image/png,image/jpeg"
                            @change="uploadFile($event.target.files, 0)"
                        />
                        <div class="alert alert-secondary" role="alert">
                            <ul>
                                <li>이미지 사이즈 : 350*350</li>
                                <li>파일 사이즈 : 1M 이하</li>
                                <li>파일 확장자 : png, jpg만 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">제품이미지</label>
                    <div class="col-md-9">
                        <div class="row">
                            <div
                                class="col-lg-3 col-md-4 col-sm-2"
                                :key="i"
                                v-for="(m, i) in list3.filter(
                                    (c) => c.type == 1
                                )"
                            >
                                <div class="position-relative">
                                    <img
                                        :src="
                                            `http://localhost:3000/download/${m.type}/${m.path}`
                                        "
                                        class="img-fluid"
                                    />
                                    <div
                                        class="position-absolute top-0 end-0"
                                        style="cursor:pointer;"
                                    >
                                        X
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            type="file"
                            class="form-control"
                            accept="image/png,image/jpeg"
                            @change="uploadFile($event.target.files, 1)"
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
                </div>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label"
                        >제품설명이미지</label
                    >
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-lg-6 col-md-8">
                                <input
                                    type="file"
                                    class="form-control"
                                    accept="image/png,image/jpeg"
                                    @change="uploadFile($event.target.files, 2)"
                                />
                                <div class="alert alert-secondary" role="alert">
                                    <ul>
                                        <li>파일 사이즈 : 5M 이하</li>
                                        <li>
                                            파일 확장자 : png, jpg만 가능
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                class="col-lg-6 col-md-4"
                                :key="i"
                                v-for="(m, i) in list3.filter(
                                    (c) => c.type == 2
                                )"
                            >
                                <div class="position-relative">
                                    <img
                                        :src="
                                            `http://localhost:3000/download/${m.type}/${m.path}`
                                        "
                                        class="img-fluid"
                                    />
                                    <div
                                        class="position-absolute top-0 end-0"
                                        style="cursor:pointer;color:white;"
                                    >
                                        X
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row m-auto">
                    <button
                        type="button"
                        class="btn btn-lg btn-dark"
                        @click="callBasic1()"
                    >
                        확인
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import FileUp from "../components/FileUp.vue";
import { $swal } from "../../dapp";

export default {
    name: "",
    components: {
        FileUp,
    },
    data() {
        return {
            sampleData: "",
            select: 0,
            list3: [],
            list4: {},
            path: "NFT.JPG",
        };
    },
    setup() {},
    created() {
        if (
            this.$store.state.account !=
            0xee442796570052932841b7588ab037255ce81183
        ) {
            alert("홈페이지 주인만 사용할 수 있는 페이지 입니다.");
            this.$router.push({ path: "home1" });
        }
        this.callBasic();
        // this.callBasic1();
    },
    mounted() {},
    unmounted() {},
    methods: {
        //t_basic 에 이미지 업로드
        async uploadFile(files, type) {
            let name = "";
            let data = null;
            if (files) {
                name = files[0].name;
                data = await this.$base64(files[0]);
            }
            const { error } = await this.$api(
                `/upload/${type}/${name}`,
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
            setTimeout(() => {
                this.callBasic();
            }, 1000);
        },

        async callBasic() {
            this.list3 = await this.$api("/api/makeBasicList", "post");
            console.table(this.list3);
        },
        async callBasic1() {
            this.list4 = await this.$api("/download/0/metamask.jpg", "get");
            console.log(this.list4);
        },
    },
};
</script>
