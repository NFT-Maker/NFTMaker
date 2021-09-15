<template>
  <div>
    <button @click="testServer()">testServer</button><br />
    <div>{{ list }}</div>
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
  },
};
</script>
