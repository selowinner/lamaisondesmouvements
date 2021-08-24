import Vue from "vue";
const state = {
  expedition: [],
  withdrawal: [],
};

const getters = {
  Expeditions: (state) => {
    let expedition = state.expedition;

    return expedition;
  },

  Withdrawals: (state) => {
    let withdrawals = state.withdrawal;

    return withdrawals;
  },
};

const mutations = {
  SET_EXPEDITION(state, data) {
    state.expedition = data;
  },

  SET_WITHDRAWAL(state, data) {
    state.withdrawal = data;
  },
};

const actions = {
  init_expedition: ({ commit }) => {
    Vue.prototype.$http
      .get(
        "http://127.0.0.1:3333/expedition/expeditionList/" +
          localStorage.getItem("user-station")
      )
      .then((res) => {
        commit("SET_EXPEDITION", res.data.data);
      })
      .catch((error) => console.log(error));
  },

  init_withdrawal: ({ commit }) => {
    Vue.prototype.$http
      .get(
        "http://127.0.0.1:3333/withdrawal/List/" +
          localStorage.getItem("user-station")
      )
      .then((res) => {
        commit("SET_WITHDRAWAL", res.data.data);
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
