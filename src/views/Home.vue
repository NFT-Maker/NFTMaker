<template>
  <div id="main" class="d-flex justify-content-center align-items-center">
    <div id="nav">
      <router-link to="/payments">
        <b-button type="button" class="btn btn-primary mt-4"
          >Go to Payments</b-button
        > </router-link
      ><br />

      <router-link to="/shopping">
        <b-button type="button" class="btn btn-primary mt-4">
          Got to Shopping
        </b-button> </router-link
      ><br />

      <router-link to="/fabric">
        <b-button type="button" class="btn btn-primary mt-4">
          Fabric
        </b-button> </router-link
      ><br />

      <router-link to="/web3">
        <b-button type="button" class="btn btn-primary mt-4">
          Web3
        </b-button> </router-link
      ><br />

      <router-link to="/testDoHard">
        <b-button type="button" class="btn btn-primary mt-4">
          TestDoHard
        </b-button> </router-link
      >
      <router-link to="/testDoSimple">
        <b-button type="button" class="btn btn-primary mt-4">
          TestDoSimple
        </b-button> </router-link
      ><br />

      <router-link to="/server">
        <b-button type="button" class="btn btn-primary mt-4">
          server
        </b-button> </router-link
      ><br />
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
