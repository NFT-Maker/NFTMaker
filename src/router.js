import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ShoppingCart from "./views/ShoppingCart.vue";
import Payments from "./views/Payments.vue";
import Fabric from "./views/Fabric.vue";
import Web3 from "./views/Web3.vue";
import Compile from "./views/Compile.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/shopping",
      name: "shopping",
      component: ShoppingCart,
    },
    {
      path: "/payments",
      name: "payments",
      component: Payments,
    },
    {
      path: "/fabric",
      name: "Fabric",
      component: Fabric,
    },
    {
      path: "/web3",
      name: "Web3",
      component: Web3,
    },
    {
      path: "/compile",
      name: "Compile",
      component: Compile,
    },
  ],
});
