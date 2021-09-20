import Vue from "vue";
const state = {
  messages: [],

};

const getters = {
  Messages: (state) => {
    let message = state.messages;

    return message;
  },
};

const mutations = {
  SET_MESSAGE(state, data) {
    state.messages = data;
  },
  UPDATE_VIEW_MESSAGE() {
    
  },
};

const actions = {
  init_message: ({ commit }) => {
    Vue.prototype.$http
      .get(
        "http://127.0.0.1:3333/station/message/list/" +
          localStorage.getItem("user-station")
      )
      .then((res) => {
        commit("SET_MESSAGE", res.data.data);
      })
      .catch((error) => console.log(error));
  },
  message_view: ({ commit }, message_id) => {
    console.log('lo', message_id);
    Vue.prototype.$http
      .put(
        "http://127.0.0.1:3333/message/view/update/" +
        message_id
      )
      .then((res) => {
        console.log(res.data.data);
        commit("UPDATE_VIEW_MESSAGE");
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
