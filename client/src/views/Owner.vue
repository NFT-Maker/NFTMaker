<template>
    <div>
        <Nav />

        <div class="bg-light container-fluid">
            <main>
                <div class="container">
                    <h2 class="text-center">서식 양식 등록</h2>
                    <div class="mb-3 row border border-warning">
                        <label class="col-md-3 col-form-label"
                            >저장된 서식 총 갯수</label
                        >
                        <div class="col-md-9">
                            {{ list3.length }}
                        </div>
                    </div>
                    <div class="mb-3 row border border-warning">
                        <label class="col-md-3 col-form-label">상장 서식</label>
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
                                        <div
                                            class="position-absolute-top text-right"
                                            style="cursor:pointer;"
                                            @click="
                                                deleteImage(`${m.basic_id}`)
                                            "
                                        >
                                            X
                                        </div>

                                        <img
                                            :src="
                                                `http://localhost:3000/download/${m.type}/${m.path}`
                                            "
                                            class="img-fluid"
                                        />
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
                                    <li>상장 서식</li>
                                    <li>파일 확장자 : png, jpg만 가능</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 row border border-warning">
                        <label class="col-md-3 col-form-label"
                            >봉사활동 인증서</label
                        >
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
                                        <div
                                            class="position-absolute-top text-right"
                                            style="cursor:pointer;"
                                            @click="
                                                deleteImage(`${m.basic_id}`)
                                            "
                                        >
                                            X
                                        </div>
                                        <img
                                            :src="
                                                `http://localhost:3000/download/${m.type}/${m.path}`
                                            "
                                            class="img-fluid"
                                        />
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
                                    <li>봉사 활동 인증서 서식</li>
                                    <li>파일 확장자 : png, jpg만 가능</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 row border border-warning">
                        <label class="col-md-3 col-form-label"
                            >정부 교육 이수증</label
                        >
                        <div class="col-md-9">
                            <div class="row">
                                <div
                                    class="col-lg-3 col-md-4 col-sm-2"
                                    :key="i"
                                    v-for="(m, i) in list3.filter(
                                        (c) => c.type == 2
                                    )"
                                >
                                    <div class="position-relative">
                                        <div
                                            class="position-absolute-top text-right"
                                            style="cursor:pointer;"
                                            @click="
                                                deleteImage(`${m.basic_id}`)
                                            "
                                        >
                                            X
                                        </div>
                                        <img
                                            :src="
                                                `http://localhost:3000/download/${m.type}/${m.path}`
                                            "
                                            class="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>

                            <input
                                type="file"
                                class="form-control"
                                accept="image/png,image/jpeg"
                                @change="uploadFile($event.target.files, 2)"
                            />
                            <div class="alert alert-secondary" role="alert">
                                <ul>
                                    <li>정부 교육 이수 서식 파일</li>
                                    <li>
                                        파일 확장자 : png, jpg만 가능
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 row border border-warning">
                        <label class="col-md-3 col-form-label">
                            <div>
                                <b-button v-b-modal.modal-scrollable
                                    >꾸미기 스티커 보기</b-button
                                >

                                <b-modal
                                    id="modal-scrollable"
                                    scrollable
                                    title="Scrollable Content"
                                >
                                    <div class="row">
                                        <div
                                            class="col-lg-3 col-md-4 col-sm-2"
                                            :key="i"
                                            v-for="(m, i) in list3.filter(
                                                (c) => c.type == 100
                                            )"
                                        >
                                            <div class="position-relative">
                                                <div
                                                    class="position-absolute-top text-right"
                                                    style="cursor:pointer;"
                                                    @click="
                                                        deleteImage(
                                                            `${m.basic_id}`
                                                        )
                                                    "
                                                >
                                                    X
                                                </div>
                                                <img
                                                    :src="
                                                        `http://localhost:3000/download/${m.type}/${m.path}`
                                                    "
                                                    class="img-fluid"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </b-modal>
                            </div>
                        </label>
                        <div class="col-md-9">
                            <input
                                type="file"
                                class="form-control"
                                accept="image/png,image/jpeg"
                                @change="uploadFile($event.target.files, 100)"
                            />
                            <div class="alert alert-secondary" role="alert">
                                <ul>
                                    <li>
                                        각종 꾸밀 수 있는 스티커 업로드
                                    </li>
                                    <li>
                                        파일 확장자 : png, jpg만 가능
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script>
// import FileUp from "../components/FileUp.vue";
import Nav from "../components/Nav123.vue";
import $Swal from "sweetalert2";

export default {
    computed: {
        account() {
            return this.$store.state.account;
        },
    },
    name: "",
    components: {
        // FileUp,
        Nav,
    },
    data() {
        return {
            list3: [],
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
                return new $Swal(
                    "이미지 업로드 실패했습니다. 다시 시도하세요."
                );
            }
            new $Swal("이미지가 업로드 되었습니다.");
            setTimeout(() => {
                this.callBasic();
            }, 1000);
        },

        deleteImage(id) {
            $Swal
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
                        this.callBasic();
                        $Swal.fire("삭제되었습니다!", "", "success");
                    }
                });
        },

        async callBasic() {
            this.list3 = await this.$api("/api/makeBasicList", "post");
            console.table(this.list3);
        },
    },
};
</script>
