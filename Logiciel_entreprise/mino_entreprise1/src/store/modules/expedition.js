
import Vue from 'vue'
const state = {
    expedition : [],
}



const getters = {
    Expeditions: state => {
        let expedition = state.expedition

        return expedition
    },

}


const mutations = {

    SET_EXPEDITION (state, data){
        state.expedition = data
    },

}

const actions = {
    init_expedition: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/expedition/expeditionList/1')
            .then(res => {
                commit('SET_EXPEDITION', res.data.data)
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