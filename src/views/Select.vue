<template>
    <div>
        <Nav />
        <div class="row align-items-center">
            <a class="col-xl-6 col-md-4 mb-4" href="">
                <img src="../assets/img/tool.jpg" alt="" /><br />
                이미지 제작</a
            >
            <a class="col-xl-6 col-md-4 mb-4" href="">
                <img src="../assets/img/gall.png" alt="" /><br />
                내 갤러리</a
            >
        </div>
    </div>
</template>
<script>
import Nav from "../components/Nav123.vue";
export default {
    name: "",
    components: {
        Nav,
    },
    data() {
        return {
            sampleData: "",
        };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {},
};
</script>
