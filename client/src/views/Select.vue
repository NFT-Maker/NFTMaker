<template>
    <div>
        <b-container fluid class="p-4 bg-light" style="height: 85vh">
            <b-row class="text-center">
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
                    <a href="#/gallery">
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
export default {
    computed: {
        account() {
            return this.$store.state.account;
        },
    },
    name: "",
    components: {},
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
