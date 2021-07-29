
import Vue from 'vue'
const state = {
    senders : [],
}



const getters = {
    Senders: state => {
        let sender = state.senders

        return sender
    },

}


const mutations = {

    SET_SENDER (state, data){
        state.senders = data
    },

}

const actions = {
    init_sender: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/expedition/senderList/1')
            .then(res => {
                commit('SET_SENDER', res.data.data)
            })
            .catch(error => console.log(error))
    } 
}


export default({
    state,
    mutations,
    actions,
    getters
  });