import Vue from "vue";
const state = {
  financials: "",
};

const getters = {
  Financials: (state) => {
    let analytic = state.financials;

    return analytic;
  },
};

const mutations = {
  SET_FINANCIAL(state, data) {
    state.financials = data;
  },
};

const actions = {
  init_financial: ({ commit }, period) => {
    Vue.prototype.$http
      .get(
        "http://127.0.0.1:3333/central/stat/" +
          localStorage.getItem("user-central") +
          "/" +
          period
      )
      .then((res) => {
        commit("SET_FINANCIAL", res.data.data);
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
