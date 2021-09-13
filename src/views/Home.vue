<template>
  <div id="main" class="d-flex justify-content-center align-items-center">
    <div id="nav">

      <router-link to="/payments">
        <b-button type="button" class="btn btn-primary mt-4">Go to Payments</b-button>
      </router-link><br />

      <router-link to="/shopping">
        <b-butto type="button" class="btn btn-primary mt-4">
          Got to Shopping
        </b-butto>
      </router-link><br />

      <router-link to="/fabric">
        <b-butto type="button" class="btn btn-primary mt-4">
          Fabric
        </b-butto>
      </router-link><br />

      <router-link to="/web3">
        <b-butto type="button" class="btn btn-primary mt-4">
          Web3
        </b-butto>
      </router-link><br />

      <router-link to="/compile">
        <b-butto type="button" class="btn btn-primary mt-4">
          Compile
        </b-butto>
      </router-link><br />
      
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
  };
</script>

<style scope>
  #main {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>