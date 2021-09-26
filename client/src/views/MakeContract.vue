<template>
    <div>
        <Nav />
        <DoContractDeploy/>
    </div>
</template>
<script>
import Nav from "../components/Nav123.vue";
import DoContractDeploy from "../components/DoContractDeploy.vue";
export default {
    computed: {
        account() {
            return this.$store.state.account;
        },
    },
    name: "",
    components: {
        Nav,
        DoContractDeploy
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
