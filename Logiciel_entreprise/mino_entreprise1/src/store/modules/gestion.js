import Vue from "vue";
const state = {
  adminitrators: [],
};

const getters = {
  Adminitrators: (state) => {
    let adminitrator = state.adminitrators;

    return adminitrator;
  },

};

const mutations = {
  SET_ADMINISTRATOR(state, data) {
    state.adminitrators = data;
  },

};

const actions = {
  init_adminitrator: ({ commit }) => {
    Vue.prototype.$http
      .get(
        "http://127.0.0.1:3333/station/user/list/" +
          localStorage.getItem("user-station")
      )
      .then((res) => {
        commit("SET_ADMINISTRATOR", res.data.data);
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
