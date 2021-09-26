<template>
    <div>
        <Nav />

        <FabricCore />
    </div>
</template>
<script>
import Nav from "../components/Nav123.vue";
import FabricCore from "../components/FabricCore";

export default {
    computed: {
        account() {
            return this.$store.state.account;
        },
    },
    name: "",
    components: {
        Nav,
        FabricCore,
    },
    data() {
        return {};
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {},
};
</script>
