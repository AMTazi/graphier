import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import App from "./App.vue";
import "./plugins/bootstrap-vue";
import router from "./router";
import store from "./store";
import "vis-network/styles/vis-network.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
