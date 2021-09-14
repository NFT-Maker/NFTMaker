import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// bootstrap
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// server
import api from "./api.js";

Vue.use(BootstrapVue).mixin(api);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
