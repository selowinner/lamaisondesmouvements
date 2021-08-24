import Vue from "vue";
const state = {
  stations: [],
};

const getters = {
  Stations: (state) => {
    let station = state.stations;

    return station;
  },
};

const mutations = {
  SET_STATION(state, data) {
    state.stations = data;
  },
};

const actions = {
  init_stations: ({ commit }) => {
    Vue.prototype.$http
      .get("http://127.0.0.1:3333/compangny/stationList")
      .then((res) => {
        commit("SET_STATION", res.data.data);
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
