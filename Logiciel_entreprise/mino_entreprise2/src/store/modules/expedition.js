import Vue from "vue";
const state = {
  expeditions: [],
};

const getters = {
  Expeditions: (state) => {
    let expedition = state.expeditions;

    return expedition;
  },
};

const mutations = {
  SET_EXPEDITION(state, data) {
    state.expeditions = data;
  },
};

const actions = {
  init_expeditions: ({ commit }, station) => {
    Vue.prototype.$http
      .get("http://127.0.0.1:3333/expedition/expeditionList/" + station)
      .then((res) => {
        commit("SET_EXPEDITION", res.data.data);
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
