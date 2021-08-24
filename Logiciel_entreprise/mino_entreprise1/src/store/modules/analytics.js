import Vue from "vue";
const state = {
  analytics: "",
};

const getters = {
  Analytics: (state) => {
    let analytic = state.analytics;

    return analytic;
  },
};

const mutations = {
  SET_ANALYTICS(state, data) {
    state.analytics = data;
  },
};

const actions = {
  init_analitic: ({ commit }) => {
    Vue.prototype.$http
      .get(
        "http://127.0.0.1:3333/analytics/" +
          localStorage.getItem("user-station")
      )
      .then((res) => {
        commit("SET_ANALYTICS", res.data.data);
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
