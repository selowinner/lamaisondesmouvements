import Vue from "vue";
const state = {
  travelsDo: [],
  travelsDeclared: [],
  clientReservation: [],
};

const getters = {
  TravelsDo: (state) => {
    let travel = state.travelsDo;

    return travel;
  },
  TravelsDeclared: (state) => {
    let travel = state.travelsDeclared;

    return travel;
  },
  ClientReservations: (state) => {
    let client = state.clientReservation;

    return client;
  },
};

const mutations = {
  SET_TRAVEL_DO(state, data) {
    state.travelsDo = data;
  },

  SET_TRAVEL_DECLARED(state, data) {
    state.travelsDeclared = data;
  },

  SET_CLIENT_RESERVATION(state, data) {
    state.clientReservation = data;
  },
};

const actions = {
  init_travelsDo: ({ commit }, station) => {
    Vue.prototype.$http
      .get("http://127.0.0.1:3333/travelDo/Liste/" + station)
      .then((res) => {
        commit("SET_TRAVEL_DO", res.data.data);
      })
      .catch((error) => console.log(error));
  },

  init_travelsDeclared: ({ commit }, station) => {
    Vue.prototype.$http
      .get("http://127.0.0.1:3333/TravelDeclared/Liste/" + station)
      .then((res) => {
        commit("SET_TRAVEL_DECLARED", res.data.data);
      })
      .catch((error) => console.log(error));
  },

  init_clientReservation: ({ commit }, station) => {
    console.log(station);
    Vue.prototype.$http
      .get("http://127.0.0.1:3333/reservation/Liste/" + station)
      .then((res) => {
        console.log(res.data.data);
        commit("SET_CLIENT_RESERVATION", res.data.data);
      })
      .catch((error) => console.log(error));
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
