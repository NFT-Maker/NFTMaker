<template>
    <div>
        <b-card class="mx-2 my-2" header-bg-variant="warning" header-text-variant="dark">
            <!-- 헤더 -->
            <template #header>
                <h6 class="mb-0">NFT 이미지 편집</h6>
            </template>

            <!-- 캔버스 -->
            <div class="mx-auto" style="width: 600px; hight: 600px; border: 5px solid blue">
                <canvas ref="can" id="canvas" width="1000" height="1000"></canvas>
            </div>

            <!-- 부가기능 -->
            <b-card class="my-3">
                <!-- 캔버스 사이즈 변경 -->
                <div class="my-2">
                    <!-----------------   서버 연동 이미지 불러오기  ----------------------->

                    <div>
                        <b-form-select style="max-width: 50rem;" value="999" v-model="selectId">
                            <option value="999">NFT Maker 기본 서식 불러오기</option>
                            <option :key="i" v-for="(m, i) in basicList.filter(
                                    (c) =>
                                        (c.type == 0) |
                                        (c.type == 1) |
                                        (c.type == 2)
                                )" :value="`${m.basic_id}`">{{ m.path }}</option>
                        </b-form-select>
                        <b-button variant="dark" class="mx-1 my-1" @click="tejin()">서식 추가
                        </b-button>
                    </div>
                    <div>
                        <b-form-select style="max-width: 50rem;" value="999" v-model="selectId">
                            <option value="999">NFT Maker 기본 스티커 불러오기</option>
                            <option :key="i" v-for="(m, i) in basicList.filter(
                                    (c) => c.type == 100
                                )" :value="`${m.basic_id}`">{{ m.path }}</option>
                        </b-form-select>
                        <b-button variant="dark" class="mx-1 my-1" @click="tejin()">꾸미기 추가
                        </b-button>
                    </div>
                    <!-- 서버 연동 끝 -->
                    <b-button variant="dark" class="mx-1 my-1" @click="
                            $refs.fileInput1.$el
                                .querySelector('input[type=file]')
                                .click()
                        ">이미지 추가</b-button>
                    <b-form-file accept="image/*" id="uploader" no-drop ref="fileInput1" style="display:none;">
                    </b-form-file>
                    <b-button v-b-modal.modal-1 class="mx-1 my-1" variant="dark">캔버스 사이즈 변경</b-button>
                    <b-button id="download" class="mx-1 my-1" variant="dark">이미지 다운로드</b-button>
                    <b-button variant="dark" class="mx-1 my-1" @click="ipfsUpload()">IPFS 이미지 업로드
                    </b-button>
                    <b-button variant="dark" class="mx-1 my-1" @click="[(show = true), ipfsDownload()]">IPFS 이미지 미리보기
                    </b-button>

                    <b-button variant="warning" class="mx-1 my-1" v-if="this.$store.state.settingNum == 0"
                        @click="goMakeContract()">
                        컨트랙트 만들기로 이동
                    </b-button>

                    <b-button variant="warning" class="mx-1 my-1" v-if="this.$store.state.settingNum == 1"
                        @click="goGallery()">
                        NFT Maker로 NFT 발행
                    </b-button>

                    <b-button variant="warning" class="mx-1 my-1" v-if="this.$store.state.settingNum == 2" :title="
                            `${this.$store.state.contract}` + '에서 NFT 발행'
                        " @click="goGallery()">
                        내 컨트랙트로 NFT 발행
                    </b-button>
                </div>
            </b-card>
        </b-card>

        <!-- ---------------------- 사이드 --------------------------------- -->
        <!-- 사이드 IPFS 이미지 보기 -->
        <b-button v-b-toggle.sidebar-IPFS>편집도구</b-button>

        <b-sidebar id="sidebar-IPFS" title="편집도구" bg-variant="light">
            <template #footer="{ hide }">
                <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                    <strong class="mr-auto">NFT Maker</strong>
                    <b-button size="sm" @click="hide">닫기</b-button>
                </div>
            </template>
            <!-- 기능들 -->
            <b-card class="mx-2"> </b-card>
        </b-sidebar>

        <!-- ---------------------- 모달 --------------------------------- -->

        <!-- 모달1 캔버스 사이즈 변경 -->
        <b-modal id="modal-1" title="캔버스 사이즈 변경">
            <b-form inline>
                <!-- 가로 -->
                <label class="sr-only" for="inline-form-input-width">width</label>
                <b-form-input id="inline-form-input-width" class="mb-2 mr-sm-2 mb-sm-0" v-model="formCanvasWidth"
                    placeholder="가로">
                </b-form-input>

                <!-- 세로 -->
                <label class="sr-only" for="inline-form-input-height">height</label>
                <b-form-input id="inline-form-input-height" class="mb-2 mr-sm-2 mb-sm-0" v-model="formCanvasHeight"
                    placeholder="세로">
                </b-form-input>

                <!-- 변경 -->
                <b-button variant="dark" @click="changeCanvasSize()">변경</b-button>
            </b-form>
        </b-modal>

        <!-- 모달2 업로드된 IPFS 이미지 보기 -->
        <b-modal v-model="show" title="IPFS 업로드 이미지" header-bg-variant="warning" header-text-variant="dark"
            body-bg-variant="light" body-text-variant="dark" footer-bg-variant="dark" footer-text-variant="light">
            <b-img v-bind:src="this.cidImgLink" fluid thumbnail></b-img>
            <b-card title="IPFS 주소" class="mt-2">
                <b-card-text fluid>
                    {{ this.cidImgLink }}
                </b-card-text>
            </b-card>
            <template #modal-footer>
                <div class="w-100">
                    <h5 class="float-left">NFT Maker</h5>

                    <b-button variant="warning" size="sm" class="float-right" @click="show = false">
                        닫기
                    </b-button>
                </div>
            </template>
        </b-modal>

        <!-- ============================ 팝오버 ====================== -->
        <b-popover target="popover-target-1" triggers="hover" placement="top">
            <template #title>Popover Title</template>
            I am popover <b>component</b> content!
        </b-popover>
    </div>
</template>
<script src="https://wzrd.in/standalone/buffer"></script>
<script src="https://unpkg.com/ipfs-api@9.0.0/dist/index.js"
    integrity="sha384-5bXRcW9kyxxnSMbOoHzraqa7Z0PQWIao+cgeg327zit1hz5LZCEbIMx/LWKPReuB" crossorigin="anonymous">
</script>
<script>
    import {
        fabric
    } from "fabric";

    export default {
        name: "",
        components: {},
        data() {
            return {
                reader: new FileReader(),
                cidImg: "",
                cidImgLink: "",
                node: null,
                canvasWidth: "",
                canvasHeight: "",
                formCanvasWidth: "",
                formCanvasHeight: "",
                show: false,
                basicList: [],
                basicList1: [],
                selectId: 999,
                canvas: null,
                // url: "",
            };
        },
        created: async function () {
            if (this.$store.state.ipfs == false) {
                const IPFS = require("ipfs");
                var node = await IPFS.create();
                this.node = node;
                this.$store.commit("setIpfs", node)
                console.log(this.$store.state.ipfs)
            } else {
                console.log("good!")   
                this.node = this.$store.state.ipfs
            }
        },
        mounted() {
            const ref = this.$refs.can;
            const canvas = new fabric.Canvas(ref);
            this.canvas = canvas;
            console.log(canvas);
            console.log(this.canvas);

            //캔버스에 사각형 추가
            const rect1 = new fabric.Rect({
                fill: "red",
                width: 200,
                height: 200,
            });

            //종합적으로 추가
            canvas.add(rect1);

            // 이미지 넣기
            // fabric.Image.fromURL(
            //     "http://localhost:3000/download/0/A4 금박상장_세로1.jpg",
            //     function(oImg) {
            //         canvas.add(oImg);
            //     }
            // );

            // 외부 이미지 업로드
            document.getElementById("uploader").onchange = function (e) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var image = new Image();

                    image.src = e.target.result;
                    image.onload = function () {
                        var img = new fabric.Image(image);
                        img.set({
                            left: 100,
                            top: 60,
                        });
                        img.scaleToWidth(200);
                        canvas
                            .add(img)
                            .setActiveObject(img)
                            .renderAll();
                    };
                };

                reader.readAsDataURL(e.target.files[0]);
            };

            // 텍스트 추가
            var text = new fabric.Text("add Text", {
                left: 100,
                top: 100,
                fontWeight: "blod",
            });
            canvas.add(text);

            //삭제기능
            var deleteIcon =
                "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

            var img = document.createElement("img");
            img.src = deleteIcon;

            fabric.Object.prototype.controls.deleteControl = new fabric.Control({
                x: 0.55,
                y: -0.6,
                offsetY: 16,
                cursorStyle: "pointer",
                mouseUpHandler: deleteObject,
                render: renderIcon,
                cornerSize: 22,
            });

            function deleteObject(eventData, transform) {
                var target = transform.target;
                var canvas = target.canvas;
                canvas.remove(target);
                canvas.requestRenderAll();
            }

            function renderIcon(ctx, left, top, styleOverride, fabricObject) {
                var size = this.cornerSize;
                ctx.save();
                ctx.translate(left, top);
                ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
                ctx.drawImage(img, -size / 2, -size / 2, size, size);
                ctx.restore();
            }

            // 이미지 다운로드
            const download = document.getElementById("download");

            download.addEventListener("click", function () {
                console.log(canvas.toDataURL());
                var link = document.createElement("a");
                link.download = "download.png";
                link.href = canvas.toDataURL();
                link.click();
                link.delete;
            });

            // 서버 연동
            this.$api("/api/makeBasicList", "post").then((result) => {
                this.basicList = result;
                console.log(this.basicList);
            });

            // 0번 컨트랙트 만들기에서 할것임
            // 2번 이전 화면에서 이미 저장해 둠
            if (this.$store.state.settingNum == 1) {
                this.$store.commit(
                    "contractSave",
                    "NFT Maker의 컨트랙트 주소 만들어서 db에 등록해야함"
                );
                this.$api("/api/list", "post", {
                    param: [this.$store.state.contract],
                }).then((result) => {
                    console.log(result);
                    this.$store.commit("abiSave", result[0].CA_abi);
                    console.log(this.$store.state.abi);
                });
            }
        },

        updated() {},
        unmounted() {},
        methods: {
            changeCanvasSize() {
                // this.CanvasWidth = this.formCanvasWidth
                this.canvasHeight = this.formCanvasHeight;
                this.canvasWidth = this.formCanvasWidth;
            },

            //이미지 자체를 올리기 (성공)

            async ipfsUpload() {
                let imageBlob = await new Promise((resolve) =>
                    canvas.toBlob(resolve, "image/png")
                );

                console.log(this.node);
                const {
                    cid
                } = await this.node.add(imageBlob, {
                    cidVersion: 1,
                    hashAlg: "sha2-256",
                });
                console.log("2");

                console.log(cid.toString());
                // 위에것과 동일
                // console.info(`cid: ${cid}`)

                // cidImg에 cid 저장 서버에 저장할때는 cid.toString()을 저장하면 됨
                this.cidImg = cid.toString();
                // 로컬스토리지에 저장
                localStorage.setItem(
                    "ipfsCidImgLink",
                    "https:/" + this.cidImg + ".ipfs.dweb.link"
                );
                console.log(localStorage.getItem("ipfsCidImgLink"));
            },

            // ipfs 주소
            async ipfsDownload() {
                //IPFS에 업로드 된 해시값을 http링크로 변환
                var link = "https:/" + this.cidImg + ".ipfs.dweb.link";
                console.log(link);

                //cidImgLink 값에 link 저장 => img.src로 v-bind
                this.cidImgLink = link;
                console.log("완료:", this.cidImg);
                if ((this.cidImg = " ")) {
                    console.log("없다");
                } else {
                    {
                        console.log("같지않다");
                    }
                }
            },

            // test() {
            //     console.log(localStorage.getItem('ipfsCidImgLink'))
            // }

            goGallery() {
                this.$router.push({
                    path: "gallery"
                });
            },
            goMakeContract() {
                this.$router.push({
                    path: "makeContract"
                });
            },

            tejin() {
                this.basicList1 = this.basicList.filter(
                    (c) => c.basic_id == this.selectId
                );

                fabric.Image.fromURL(
                    `http://localhost:3000/download/${this.basicList1[0].type}/${this.basicList1[0].path}`,
                    (oImg) => {
                        this.canvas.add(oImg);
                    }
                );
            },
        },
    };
</script>
<style scoped>
    #canvas {
        position: absolute;
        border: 3px solid black;
    }
</style>