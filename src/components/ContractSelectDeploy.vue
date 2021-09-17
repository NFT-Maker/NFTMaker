<template>
    <div>
        <h1>새로운 컴포넌트 : ContractSelectDeploy.vue</h1>
        <div>{{sampleData}}</div>
        <b-textarea class="" rows="10" v-model="sampleData"></b-textarea>
    </div>
</template>
<script>
export default {
    name: '',
    components: {},
    data () {
        return {
            sampleData: JSON.parse(window.localStorage.getItem('arr'))
        }
    },
    created () {},
    mounted () {},
    updated () {},
    unmounted () {},
    methods: {}
}
</script>
