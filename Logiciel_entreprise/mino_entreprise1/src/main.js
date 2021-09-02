import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/apexcharts";
import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/styles/global.css";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "http://127.0.0.1:3333/";


// pour garder l'autorisation dans le header, lorsqu'il y a rechargement de page. parcequ'au recharegment
// le header est suprimé, mais pas le localeStorage
const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
