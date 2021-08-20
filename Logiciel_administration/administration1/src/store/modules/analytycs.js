import axios from "axios"
// import Vue from 'vue'
const state = {
    analytycs : [],
}



const getters = {
    Analytics: state => {
        let analytics = state.analytycs

        return analytics
    },

}


const mutations = {

    SET_ANALITYCS (state, data){
        state.analytycs = data
    },

}

const actions = {
    init_analytycs: ({commit}) => {
        // Vue.prototype.$http
        axios.get('administration/analytics')
            .then(res => {
                commit('SET_ANALITYCS', res.data.data)
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