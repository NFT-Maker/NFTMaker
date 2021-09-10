<template>
  <div>
    <!-- 이미지 업로드 버튼 -->
    <div><input id="uploader" type="file" /><br /></div>

    <canvas ref="can" id="canvas" width="1000" height="1000"></canvas>
  </div>
</template>
<script>
import { fabric } from "fabric";

export default {
  name: "",
  components: {},
  data() {
    return {
      numberModel: 3,
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

    canvas.add(rect1).add(rect2).add(cir1);
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
