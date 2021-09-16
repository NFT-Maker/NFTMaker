<template>
  <div class='container'>
    <div class="mb-4">
      <router-link to="/">Home</router-link> |
      <router-link to="/shopping">Shopping Cart</router-link> |
    </div>

     <TestDoSimple  />

  </div>
</template>

<script>
  import TestDoSimple from '@/components/TestDoSimple.vue'

  export default {
    name: 'testDo',
    components: {
      TestDoSimple
    },
    computed: {
      // contract: function () {
      //   return this.$store.state.contract
      // }
      
    },
    methods: {
      
    }
  }
</script>