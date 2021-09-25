<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="warning" class=" mb-1">
            <b-navbar-brand href="#/home1"
                ><img
                    src="../assets/img/NFT MAKER.png"
                    title="홈으로"
                    style="max-width: 4rem;"
            /></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item
                        v-if="this.$store.state.show"
                        right
                        href="#/owner"
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
        return {};
    },
    setup() {},
    created() {},
    mounted() {
        if (
            this.$store.state.account ==
            0xee442796570052932841b7588ab037255ce81183
        ) {
            this.$store.commit("showSave", true);
        } else {
            this.$store.commit("showSave", false);
        }
    },
    unmounted() {},
    methods: {},
};
</script>
