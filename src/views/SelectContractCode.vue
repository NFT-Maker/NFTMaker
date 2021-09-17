<template>
    <div>
        <ContractSelect />
        <ContractSelectDeploy />
    </div>
</template>
<script>
    import ContractSelect from "../components/ContractSelect"
    import ContractSelectDeploy from "../components/ContractSelectDeploy"

    export default {
        name: '',
        components: {
            ContractSelect,
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