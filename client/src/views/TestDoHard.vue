<template>
  <div>
 <Nav />
    <DoContractDeploy />
  </div>
</template>
<script>

    import DoContractDeploy from "../components/DoContractDeploy"
    import Nav from "../components/Nav123";

export default {
  name: '',
  components: {
            DoContractDeploy,
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
