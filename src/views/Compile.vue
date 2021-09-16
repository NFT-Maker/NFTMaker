<template>
  <div class='container'>
    <div class="mb-4">
      <router-link to="/">Home</router-link> |
      <router-link to="/shopping">Shopping Cart</router-link> |
    </div>

     <TestDoDeploy  />
    <TestDoInterface   />
     


  </div>
</template>

<script>
  import TestDoDeploy from '@/components/TestDoDeploy.vue'
  import TestDoInterface from '@/components/TestDoInterface.vue'

  export default {
    name: 'testDo',
    components: {
      TestDoInterface,
      TestDoDeploy
    },
    computed: {
      contract: function () {
        return this.$store.state.contract
      }
      
    },
    methods: {
      changeContract: function () {
        this.$store.commit('setContract', '')
      }
    }
  }
</script>