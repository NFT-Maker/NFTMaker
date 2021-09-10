<template>
    <div>
        <div>
            <input type="number" v-model.number="numberModel"><br>
            <button id="add" onclick="Add()">Add a rectangle</button>
        </div>

        <canvas ref="can" width="800" height="800" style="border:1px solid #ccc"></canvas>

    </div>
</template>
<script>
    import {
        fabric
    } from 'fabric';

    export default {
        name: '',
        components: {},
        data() {
            return {
                numberModel: 3
            };
        },
        created() {},
        mounted() {
            const ref = this.$refs.can;
            const canvas = new fabric.Canvas(ref);
            const rect1 = new fabric.Rect({
                fill: 'red',
                width: 200,
                height: 200
            });

            const rect2 = new fabric.Rect({
                fill: 'blue',
                width: 300,
                height: 300
            });

            const cir1 = new fabric.Rect({
                fill: "green",
                width: 300,
                height: 300,
            })

            canvas.add(rect1).add(rect2).add(cir1);
        },
        updated() {},
        unmounted() {},
        methods: {}
    }
</script>