
import Vue from 'vue'
const state = {
    lostObjets : [],
}



const getters = {
    LostObjets: state => {
        let lostObjet = state.lostObjets

        return lostObjet
    },

}


const mutations = {

    SET_LOST_OBJET (state, data){
        state.lostObjets = data
    },

}

const actions = {
    init_lostObjets: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/lostObjet/Liste/1')
            .then(res => {
                commit('SET_LOST_OBJET', res.data.data)
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