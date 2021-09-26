<template>
    <div>
        <Nav />

        <DoInterface/>
    </div>
</template>
<script>
import DoInterface from "../components/DoInterface";
import Nav from "../components/Nav123";

export default {
    name: '',
    components: {
        DoInterface,
        Nav
    },
    data () {
        return {
            sampleData: ''
        }
    },
    created () {},
    mounted () {},
    updated () {},
    unmounted () {},
    methods: {}
}
</script>
