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
    
    // travel liste elelment
    OneSTation: 0,
    forceRdeDeclared:1,

    // EXpedition liste elelment
    OneSTationForExp: 0,

    // Lost objet liste elelment
    OneSTationForLost: 0,

    // For seach bar in dialog
    seachAll: "",
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
