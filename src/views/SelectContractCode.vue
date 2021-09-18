<template>
    <div>
        <ContractSelect1 />
        <ContractSelectDeploy />
    </div>
</template>
<script>
    import ContractSelect1 from "../components/ContractSelect1"
    import ContractSelectDeploy from "../components/ContractSelectDeploy"

    export default {
        name: '',
        components: {
            ContractSelect1,
            ContractSelectDeploy
        },
        data() {
            return {
                sampleData: ''
            }
        },
        created() {},
        mounted() {},
        updated() {},
        unmounted() {},
        methods: {}
    }
</script>