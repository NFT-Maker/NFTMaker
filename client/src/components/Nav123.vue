<template>
    <div>
        <b-navbar toggleable="lg" type="warning" variant="warning">
            <b-navbar-brand href="#/home1">NFT Maker</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if="show" right href="#/owner"
                        >운영자
                    </b-nav-item>
                    <b-nav-item right href="#/howToImg"
                        >이미지 편집
                    </b-nav-item>

                    <b-nav-item right href="#/gallery">
                        내 갤러리
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
export default {
    name: "",
    components: {},
    data() {
        return {
            show: false,
        };
    },
    setup() {},
    created() {},
    mounted() {
        if (
            this.$store.state.account ==
            0xee442796570052932841b7588ab037255ce81183
        ) {
            this.show = true;
        } else {
            this.show = false;
        }
    },
    unmounted() {},
    methods: {},
};
</script>
