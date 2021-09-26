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
                    <b-button variant="dark" class="mx-1 my-1"
                        @click="$refs.fileInput1.$el.querySelector('input[type=file]').click()">이미지
                        추가</b-button>
                    <b-form-file accept="image/*" id="uploader" no-drop ref="fileInput1" style="display:none;">
                    </b-form-file>
                    <b-button v-b-modal.modal-1 class="mx-1 my-1" variant="dark">캔버스 사이즈 변경</b-button>
                    <b-button id="download" class="mx-1 my-1" variant="dark">이미지 다운로드</b-button>
                    <b-button variant="dark" class="mx-1 my-1" @click="ipfsUpload()">IPFS 이미지 업로드
                    </b-button>
                    <b-button variant="dark" class="mx-1 my-1" @click="[show=true,ipfsDownload()]">IPFS 이미지 미리보기
                    </b-button>
                </div>

            </b-card>
        </b-card>
        <!-----------------   서버 연동 이미지 불러오기  ----------------------->
        <div>
            <select v-model="selectId">
                <option :key="i" v-for="(m, i) in basicList" :value="`${m.basic_id}`">{{ m.path }}</option>
            </select>
            <img :key="i" v-for="(m, i) in basicList.filter(
                        (c) => c.basic_id == selectId
                    )" :src="`http://localhost:3000/download/${m.type}/${m.path}`" alt="" />
        </div>

        <!-- ---------------------- 사이드 --------------------------------- -->
        <!-- 사이드 IPFS 이미지 보기 -->
        <b-button v-b-toggle.sidebar-IPFS >편집도구</b-button>

        <b-sidebar id="sidebar-IPFS" title="편집도구" bg-variant="light">
            <template #footer="{ hide }">
                <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                    <strong class="mr-auto">NFT Maker</strong>
                    <b-button size="sm" @click="hide">닫기</b-button>
                </div>
            </template>
            <!-- 기능들 -->
                <b-card class="mx-2">

                </b-card>

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
                    {{this.cidImgLink}}
                </b-card-text>
            </b-card>
            <template #modal-footer>
                <div class="w-100">
                    <h5 class="float-left">NFT Maker</h5>

                    <b-button variant="warning" size="sm" class="float-right" @click="show=false">
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
    const IPFS = require("ipfs");

    import {
        fabric
    } from "fabric";


    export default {
        name: "",
        components: {

        },
        data() {
            return {
                reader: new FileReader(),
                cidImg: "",
                cidImgLink: "",
                node: "",
                canvasWidth: "",
                canvasHeight: "",
                formCanvasWidth: "",
                formCanvasHeight: "",
                show: false,
                basicList: [],
                selectId: 999,
            };
        },
        created: async function () {
            const IPFS = require('ipfs')
            var node = await IPFS.create()
            this.node = node
        },
        mounted() {
            const ref = this.$refs.can;
            const canvas = new fabric.Canvas(ref);

            //캔버스에 사각형 추가
            const rect1 = new fabric.Rect({
                fill: "red",
                width: 200,
                height: 200,
            });

            //종합적으로 추가
            canvas.add(rect1)

            // 이미지 넣기
            // fabric.Image.fromURL(
            //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAAEDCAMAAABQ/CumAAAAbFBMVEX///8AAAD09PTj4+OlpaX6+vrv7++pqanFxcXX19fm5uZnZ2eQkJC4uLjd3d3KysqBgYFRUVFBQUE1NTUnJyctLS2Xl5daWlp9fX08PDyHh4fR0dEQEBC+vr4VFRVOTk6dnZ0iIiJwcHBgYGDeHYUDAAACpklEQVR4nO3c6ZaiMBiEYYMC4jKIa0uPW/f932PP0dAKRo/QP76pmfe5gqrDkhBNej0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP5X/XRSTgZZbJ2js+ncXSwGkXWWTpKNu1r8so7TQX/paobWgVqLVq5B7jqMmw3cwjpSS+93DZxLrUO18xGooHUZomWggtbTkIUaaN1JebDC0TpWG8NghbV1rDZCLyTnBtax2ugHK+ysY7URz0MVEutYrUwCDTbWodpJft9XyKxDtZTeNXizjtTaW6PBQfDTbVZ/EAQb/LmX9tcGE+swHSXr7Tn/suxbR/mBUZZnyvkBAAAAAAAAAAAAAAAAAP+U5H232+Uj6xidRWnh/zI8X2u2SGt7YWZ6f1ON7zaFqW3Ni4r7f50frUO1c78xz4ntgxmEGkhdhyjcQOl5eHARnDvJbHsOPMvezDrai5L9wwpOZIwbPW7gSutwrwlvapN6Gp5dBZGXUmhDmNqdFNxa6M2tw71m9qSC05iyhvfZeiJbzzdPKuTW4V4zevJAq+wYzusdFuX1RIapdbZX9bfXAttpfLPlU6ZCr7f7PJ0jF5fBLFG7kc6iLB9eV2AOvoLG8Bz06Suobdy+UX1EaMzzQqoDDVbWQbqL/Gv2wzpId9UMXOpcmLqpryDy5Rnih+fCOscP6I3NTf4+2mt8LQT5sVlqWbXOn5e01x3Xqq9p4Tfq8dJA8UwVr1ob053hVdMjqXO26vyoNrbO0Z0/sGqu+zbyDVZaB4XdKn0D2eld7D83t7LXID/5J1l1QEiq5WHVmVGc+kuwEFlFbYoG1W+GIr+JNGVltaY6FlmLb0i+11MPovfQ96yueLdO0tm5wn6mOy89VyhS2bHsLFlzUh4AAAAAAAAA/K2+AH1QEuHRB+MLAAAAAElFTkSuQmCC",
            //     function (oImg) {
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
                        canvas.add(img).setActiveObject(img).renderAll();
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
            const download = document.getElementById('download');

            download.addEventListener('click', function () {
                console.log(canvas.toDataURL());
                var link = document.createElement('a');
                link.download = 'download.png';
                link.href = canvas.toDataURL();
                link.click();
                link.delete;
            });

            // 서버 연동
            this.$api("/api/makeBasicList", "post").then((result) => {
                this.basicList = result;
                console.log(this.basicList);
            });
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

                let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

                const {
                    cid
                } = await this.node.add((imageBlob), {
                    cidVersion: 1,
                    hashAlg: "sha2-256"
                })
                console.log(cid.toString())
                // 위에것과 동일
                // console.info(`cid: ${cid}`)

                // cidImg에 cid 저장 서버에 저장할때는 cid.toString()을 저장하면 됨
                this.cidImg = cid.toString()
                // 로컬스토리지에 저장
                localStorage.setItem('ipfsCidImgLink', "https:/" + this.cidImg + ".ipfs.dweb.link");
                console.log(localStorage.getItem('ipfsCidImgLink'))

            },

            // ipfs 주소
            async ipfsDownload() {
                //IPFS에 업로드 된 해시값을 http링크로 변환
                var link = "https:/" + this.cidImg + ".ipfs.dweb.link"
                console.log(link)

                //cidImgLink 값에 link 저장 => img.src로 v-bind
                this.cidImgLink = link
                console.log("완료:", this.cidImg)
                if (this.cidImg = " ") {
                    console.log("없다")
                } else {
                    {
                        console.log("같지않다")
                    }
                }
            },

            // test() {
            //     console.log(localStorage.getItem('ipfsCidImgLink'))
            // }


        },
    };
</script>
<style scoped>
    #canvas {
        position: absolute;
        border: 3px solid black;
    }
</style>