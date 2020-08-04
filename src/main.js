import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faPlus, faMinus, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

Vue.config.productionTip = false;
Vue.use(Vuex);

library.add(faBars, faPlus, faMinus, faLock, faLockOpen);

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
