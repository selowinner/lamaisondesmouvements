
import Vue from 'vue'
const state = {
    travelsDo : [],
    travelsDeclared : [],
    clientReservation : [],
}



const getters = {
    TravelsDo: state => {
        let travel = state.travelsDo

        return travel
    },
    TravelsDeclared: state => {
        let travel = state.travelsDeclared

        return travel
    },
    ClientReservation: state => {
        let client = state.clientReservation

        return client
    },

}


const mutations = {

    SET_TRAVEL_DO (state, data){
        state.travelsDo = data
    },

    SET_TRAVEL_DECLARED (state, data){
        state.travelsDeclared = data
    },

    SET_CLIENT_RESERVATION (state, data){
        state.clientReservation = data
    },

}

const actions = {
    init_travelsDo: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/travelDo/Liste/1')
            .then(res => {
                commit('SET_TRAVEL_DO', res.data.data)
            })
            .catch(error => console.log(error))
    },

    init_travelsDeclared: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/TravelDeclared/Liste/1')
            .then(res => {
                commit('SET_TRAVEL_DECLARED', res.data.data)
            })
            .catch(error => console.log(error))
    },
    
    init_clientReservation: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/reservation/Liste/1')
            .then(res => {
                commit('SET_CLIENT_RESERVATION', res.data.data)
            })
            .catch(error => console.log(error))
    }, 
}


export default({
    state,
    mutations,
    actions,
    getters
  });