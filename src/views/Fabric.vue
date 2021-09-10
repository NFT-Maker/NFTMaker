<template>
  <div>
    <!-- 이미지 업로드 버튼 -->
    <div><input id="uploader" type="file" /><br /></div>

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

    // 이미지 넣기
    fabric.Image.fromURL(
      "https://lh3.googleusercontent.com/proxy/YQROzUEhEg98iyEDFHUMHglXSZ5egK5eRaZQxAucbCPbJO-qCYQfTCoqQ12b6dHP9IROgbNeL43r7DV_ftotmXUgSm-fGuBrbz6mA_35ekaTYBj3cmK0Pwi2Lud46-GgwLD75Ta-mSKBnUBfVhU_0Gw",
      function (oImg) {
        canvas.add(oImg);
      }
    );

    canvas.add(rect1).add(rect2).add(cir1);

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
                        top: 60
                    });
                    img.scaleToWidth(200);
                    canvas.add(img).setActiveObject(img).renderAll();
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
  },
  updated() {},
  unmounted() {},
  methods: {},
};
</script>
<style scoped>
canvas {
  border: 5px solid black;
}
</style>
