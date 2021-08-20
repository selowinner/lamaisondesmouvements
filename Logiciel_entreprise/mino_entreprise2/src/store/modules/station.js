
import Vue from 'vue'
const state = {
    stations : [],
    mino_code : [],
    stations_with_details : [],
}



const getters = {
    Stations: state => {
        let station = state.stations

        return station
    },
    Mino_code: state => {
        let code = state.mino_code

        return code
    },
    Stations_with_details: state => {
        let stationw = state.stations_with_details

        return stationw
    },

}


const mutations = {

    SET_STATION (state, data){
        state.stations = data
    },
    SET_MINO_CODE (state, data){
        state.mino_code = data
    },
    SET_STATION_WITH_DETAILS (state, data){
        state.stations_with_details = data
    },

}

const actions = {
    init_stations: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/station/List/1')
            .then(res => {
                commit('SET_STATION', res.data.data)
            })
            .catch(error => console.log(error))
    }, 
    init_mino_code: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/minoCode/List/8')
            .then(res => {
                commit('SET_MINO_CODE', res.data.data)
            })
            .catch(error => console.log(error))
    }, 
    init_station_with_details: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/station/List/withDetatils/8')
            .then(res => {
                commit('SET_STATION_WITH_DETAILS', res.data.data)
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