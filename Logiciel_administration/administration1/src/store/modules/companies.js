import axios from "axios";
// import Vue from 'vue'
const state = {
  companies: [],
};

const getters = {
  Companies: (state) => {
    let compagny = state.companies;

    return compagny;
  },
};

const mutations = {
  SET_COMPANIES(state, data) {
    state.companies = data;
  },
};

const actions = {
  init_companies: ({ commit }) => {
    axios({ url: "compangny/List", method: "GET" })
      .then((res) => {
        commit("SET_COMPANIES", res.data.data);
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
