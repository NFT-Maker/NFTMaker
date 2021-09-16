<template>
    <div>
        <button @click="testServer()">testServer</button><br />
        <div>{{ list }}</div>
        <br />
        <button @click="testServer1()">testServer</button><br />
        <div>{{ list1 }}</div>
        <br />
        <button @click="test11()">test11</button><br />
        <div>{{ list2 }}</div>
    </div>
</template>
<script>
export default {
    name: "",
    components: {},
    data() {
        return {
            sampleData: "",
            list: [],
            list1: [],
            list2: [],
        };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
        async testServer() {
            this.list = await this.$api("/api/list", "post");
            console.table(this.list);
        },
        async testServer1() {
            this.list1 = await this.$api("/api/listUp", "post");
            console.table(this.list1);
        },

        async test11() {
            var test1 = {};
            (test1.EOA = "hello"), (test1.CA = "world");

            this.list2 = await this.$api("/api/test11", "post", {
                param: [test1],
            });
            console.log(this.list2);
        },
    },
};
</script>
