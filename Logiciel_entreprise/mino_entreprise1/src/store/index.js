import Vue from "vue";
import Vuex from "vuex";
// import axios from 'axios' 

import travel from "./modules/travel";
import lostObjet from "./modules/lostObjet";
import expedition from "./modules/expedition";
import senders from "./modules/senders";
import analytics from "./modules/analytics";


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    travelcomponentKey:0,
    lostObjetcomponentKey:0,
    sendercomponentKey:1,
  },
  getters: {},
  mutations: {},
  actions: {},

  modules: {
    travel,
    lostObjet,
    analytics,
    expedition,
    senders,
  },
});
