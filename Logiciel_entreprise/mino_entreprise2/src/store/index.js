import Vue from "vue";
import Vuex from "vuex";

import analytics from "./modules/analytics";
import financialStat from "./modules/financialStat";
import station from "./modules/station"
import travels from "./modules/travels"
import expedition from "./modules/expedition"
import lostObjet from "./modules/lostObjet"



Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stationcomponentKey : 0,
  },
  mutations: {},
  actions: {},



  modules: {
    analytics,
    financialStat,
    station,
    travels,
    expedition,
    lostObjet,
  },
});
