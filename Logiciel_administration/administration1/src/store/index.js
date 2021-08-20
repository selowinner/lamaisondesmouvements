import Vue from "vue";
import Vuex from "vuex";

import companies from "./modules/companies";
import station from "./modules/station";
import travels from "./modules/travels";
import lostObjet from "./modules/lostObjet";
import expedition from "./modules/expedition";
import analytycs from "./modules/analytycs";
import auth from "./modules/auth";




Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    companiescomponentKey:0,
  },
  getters: {},
  mutations: {},
  actions: {},

  modules: {
    companies,
    station,
    travels,
    lostObjet,
    expedition,
    analytycs,
    auth,
  },
});
