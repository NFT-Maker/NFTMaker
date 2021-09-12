<template>
    <div>
        <!-- 이미지 업로드 버튼 -->
        <div><input id="uploader" type="file" /><br /></div>

        <!-- 이미지 다운로드 버튼 -->
        <div>
            <b-button @click="cheak()">다운로드</b-button>
        </div>

        <canvas ref="can" id="canvas" width="800" height="800"></canvas>
    </div>
</template>
<script>
import { fabric } from "fabric";

export default {
    name: "",
    components: {},
    data() {
        return {
            reader: new FileReader(),
        };
    },
    created() {},
    mounted() {
        const ref = this.$refs.can;
        const canvas = new fabric.Canvas(ref);

        //캔버스에 사각형 추가
        const rect1 = new fabric.Rect({
            fill: "red",
            width: 200,
            height: 200,
        });

        const rect2 = new fabric.Rect({
            fill: "blue",
            width: 300,
            height: 300,
        });

        const cir1 = new fabric.Rect({
            fill: "green",
            width: 300,
            height: 300,
        });

        //종합적으로 추가
        canvas.add(rect1).add(rect2).add(cir1);

        // 이미지 넣기
        fabric.Image.fromURL(
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAAEDCAMAAABQ/CumAAAAbFBMVEX///8AAAD09PTj4+OlpaX6+vrv7++pqanFxcXX19fm5uZnZ2eQkJC4uLjd3d3KysqBgYFRUVFBQUE1NTUnJyctLS2Xl5daWlp9fX08PDyHh4fR0dEQEBC+vr4VFRVOTk6dnZ0iIiJwcHBgYGDeHYUDAAACpklEQVR4nO3c6ZaiMBiEYYMC4jKIa0uPW/f932PP0dAKRo/QP76pmfe5gqrDkhBNej0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP5X/XRSTgZZbJ2js+ncXSwGkXWWTpKNu1r8so7TQX/paobWgVqLVq5B7jqMmw3cwjpSS+93DZxLrUO18xGooHUZomWggtbTkIUaaN1JebDC0TpWG8NghbV1rDZCLyTnBtax2ugHK+ysY7URz0MVEutYrUwCDTbWodpJft9XyKxDtZTeNXizjtTaW6PBQfDTbVZ/EAQb/LmX9tcGE+swHSXr7Tn/suxbR/mBUZZnyvkBAAAAAAAAAAAAAAAAAP+U5H232+Uj6xidRWnh/zI8X2u2SGt7YWZ6f1ON7zaFqW3Ni4r7f50frUO1c78xz4ntgxmEGkhdhyjcQOl5eHARnDvJbHsOPMvezDrai5L9wwpOZIwbPW7gSutwrwlvapN6Gp5dBZGXUmhDmNqdFNxa6M2tw71m9qSC05iyhvfZeiJbzzdPKuTW4V4zevJAq+wYzusdFuX1RIapdbZX9bfXAttpfLPlU6ZCr7f7PJ0jF5fBLFG7kc6iLB9eV2AOvoLG8Bz06Suobdy+UX1EaMzzQqoDDVbWQbqL/Gv2wzpId9UMXOpcmLqpryDy5Rnih+fCOscP6I3NTf4+2mt8LQT5sVlqWbXOn5e01x3Xqq9p4Tfq8dJA8UwVr1ob053hVdMjqXO26vyoNrbO0Z0/sGqu+zbyDVZaB4XdKn0D2eld7D83t7LXID/5J1l1QEiq5WHVmVGc+kuwEFlFbYoG1W+GIr+JNGVltaY6FlmLb0i+11MPovfQ96yueLdO0tm5wn6mOy89VyhS2bHsLFlzUh4AAAAAAAAA/K2+AH1QEuHRB+MLAAAAAElFTkSuQmCC",
            function (oImg) {
                canvas.add(oImg);
            }
        );

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
            fontSize: 50,
            fontWeight: "blod",

            });
        canvas.add(text);

        //삭제기능
        var deleteIcon =
            "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

        var img = document.createElement("img");
        img.src = deleteIcon;

        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: "pointer",
            mouseUpHandler: deleteObject,
            render: renderIcon,
            cornerSize: 24,
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

   
    },
    updated() {},
    unmounted() {},
    methods: {
        // 캔버스 이미지 URL로 변환
        exportDataURL () {
            var canvas1 = document.getElementById('canvas');
            var dataURL = canvas1.toDataURL();
            console.log(dataURL);
        }
    },
};
</script>
<style scoped>
canvas {
    border: 5px solid black;
}
</style>
