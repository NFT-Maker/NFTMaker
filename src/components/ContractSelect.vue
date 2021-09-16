<template>
    <div>
        <textarea name="" id="" cols="30" rows="10" v-model="createContractCode"></textarea>

        <div>{{createContractCode}}</div>
    </div>
</template>
<script>
export default {
    name: 'ContractSelect',
    components: {},
    data () {
        return {
            createContractCode: ''
        }
    },
    created () {},
    mounted () {},
    updated () {},
    unmounted () {},
    methods: {

        
    }
}
</script>
