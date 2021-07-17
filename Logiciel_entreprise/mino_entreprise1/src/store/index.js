import Vue from "vue";
import Vuex from "vuex";
// import axios from 'axios' 

import travel from "./modules/travel";
import lostObjet from "./modules/lostObjet";


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    travelcomponentKey:0,
  },
  getters: {},
  mutations: {},
  actions: {},

  modules: {
    travel,
    lostObjet
  },
});
