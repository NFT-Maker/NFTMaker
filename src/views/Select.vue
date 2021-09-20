<template>
    <div>
        <Nav />
        <b-container fluid class="p-4 bg-dark">
            <b-row>
                <b-col>
                    <a href="#/howToImg">
                        <b-img
                            thumbnail
                            fluid
                            src="../assets/img/tool.jpg"
                            alt="Image 1"
                        ></b-img
                        ><br />
                        이미지 제작</a
                    >
                </b-col>
                <b-col>
                    <a href="">
                        <b-img
                            thumbnail
                            fluid
                            src="../assets/img/gall.png"
                            alt="Image 2"
                        ></b-img
                        ><br />내 갤러리</a
                    >
                </b-col>
            </b-row>
        </b-container>
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
