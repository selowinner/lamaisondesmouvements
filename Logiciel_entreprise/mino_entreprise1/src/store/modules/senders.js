import Vue from "vue";
const state = {
  senders: [],
  availebleSenders: [],
};

const getters = {
  Senders: (state) => {
    let sender = state.senders;

    return sender;
  },

  AvailableSenders: (state) => {
    let sender = state.availebleSenders;

    return sender;
  },
};

const mutations = {
  SET_SENDER(state, data) {
    state.senders = data;
  },

  SET_AVAILABLE_SENDER(state, data) {
    state.availebleSenders = data;
  },
};

const actions = {
  init_sender: ({ commit }) => {
    Vue.prototype.$http
      .get(
        "http://127.0.0.1:3333/expedition/senderList/" +
          localStorage.getItem("user-station")
      )
      .then((res) => {
        commit("SET_SENDER", res.data.data);
      })
      .catch((error) => console.log(error));
  },

  init_availableSender: ({ commit }) => {
    Vue.prototype.$http
      .get(
        "http://127.0.0.1:3333/expedition/availableSender/" +
          localStorage.getItem("user-station")
      )
      .then((res) => {
        commit("SET_AVAILABLE_SENDER", res.data.data);
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
