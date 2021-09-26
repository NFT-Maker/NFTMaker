<template>
    <div>
        <Nav />
        <FabricCore />
        <!-- <FabricCore1 /> -->
    </div>
</template>
//
<script>
import FabricCore from "../components/FabricCore";
import Nav from "../components/Nav123";
// import FabricCore1 from "../components/FabricCore copy.vue";

export default {
    name: "",
    components: {
        FabricCore,
        // FabricCore1,
        Nav
    },
    data() {
        return {
            sampleData: "",
        };
    },
    created() {},
    mounted() {},
    updated() {},
    unmounted() {},
    methods: {},
};
</script>
