import Vue from "vue";
import Vuex from "vuex";

import travel from "./modules/travel";
import lostObjet from "./modules/lostObjet";
import expedition from "./modules/expedition";
import senders from "./modules/senders";
import analytics from "./modules/analytics";
import auth from "./modules/auth";
import gestion from "./modules/gestion";
import message from "./modules/message";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    travelcomponentKey: 0,
    luggagecomponentKey: 1,
    lostObjetcomponentKey: 0,
    sendercomponentKey: 1,
    expeditioncomponentKey: 1,
    withdrawalcomponentKey: 1,

    MessageListRerender:1,

    // For email response
    ResponseTopic:"",
    response_of_id: 0,
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
    auth,
    gestion,
    message,
  },
});
