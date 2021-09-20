import Vue from "vue";
import Vuex from "vuex";

import analytics from "./modules/analytics";
import financialStat from "./modules/financialStat";
import station from "./modules/station";
import travels from "./modules/travels";
import expedition from "./modules/expedition";
import lostObjet from "./modules/lostObjet";
import auth from "./modules/auth";
import message from "./modules/message";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stationcomponentKey: 0,

    // travel liste elelment
    OneSTation: 0,
    forceRdeDeclared: 1,

    // EXpedition liste elelment
    OneSTationForExp: 0,
    forceRdeExp: 1,

    // Lost liste elelment
    OneSTationForLost: 0,
    forceRdeLost: 1,

    // For seach bar in dialog
    seachAllTravel: "",
    seachAllExp: "",
    seachAllLost: "",

    // For email response
    ResponseTopic:"",
    response_of_id: 0,

    // After view updating
    MessageListRerender:1,
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
    auth,
    message,
  },
});
