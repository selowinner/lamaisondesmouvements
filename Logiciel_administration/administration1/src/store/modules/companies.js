
import Vue from 'vue'
const state = {
    companies : [],
}



const getters = {
    Companies: state => {
        let compagny = state.companies

        return compagny
    },

}


const mutations = {

    SET_COMPANIES (state, data){
        state.companies = data
    },

}

const actions = {
    init_companies: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/compangny/List')
            .then(res => {
                commit('SET_COMPANIES', res.data.data)
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