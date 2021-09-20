<template>
    <div>
        <b-button @click="upload()">ipfs 업로드</b-button>

    </div>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {
                sampleData: ''
            }
        },
        created() {},
        mounted() {},
        updated() {},
        unmounted() {},
        methods: {
            async upload() {
                const IPFS = require('ipfs-core')

                const ipfs = await IPFS.create()
                const {
                    cid
                } = await ipfs.add('Hello world')
                console.info(cid)
                // QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf
            }
        }
    }
</script>