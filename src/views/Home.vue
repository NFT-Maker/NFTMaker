<template>
  <div id="main" class="d-flex justify-content-center align-items-center">
    <div id="nav">
      <router-link to="/payments"
        ><b-button variant="light" type="button" class="btn btn-primary"
          >Go to Payments</b-button
        ></router-link
      >
      <p></p>
      <router-link to="/shopping"
        ><button type="button" class="btn btn-primary mt-4">
          Got to Shopping
        </button></router-link
      ><br />
      <router-link to="/fabric"
        ><button type="button" class="btn btn-primary mt-4">
          Fabric
        </button></router-link
      ><br />
      <router-link to="/web3"
        ><button type="button" class="btn btn-primary mt-4">
          Web3
        </button></router-link
      >
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
