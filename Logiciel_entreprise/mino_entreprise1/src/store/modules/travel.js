// import travel from "../../data/travel"
import Vue from 'vue'
const state = {
  travels : []
}



const getters = {
    Travels: state => {
        let travelListe = state.travels.map(travel => {
            let gain = travel.place_price * travel.reservedPlaceNumber
            let restPlace = travel.place_to_sell_by_mino_number - travel.reservedPlaceNumber
            return {
                destination: travel.destination,
                departure_date: travel.departure_date,
                departure_time: travel.departure_time,
                details:{
                    vendus: travel.reservedPlaceNumber,
                    aVendre: travel.place_to_sell_by_mino_number,
                    restant: restPlace,
                    annules: travel.canceledReservationNumber,
                    gains: gain
                }
            }
        })

        return travelListe
    }
}


const mutations = {

    SET_TRAVELS (state, data){
        console.log(state.travels);
        state.travels = data
        console.log(state.travels);
    },

}

const actions = {
    init_travelListe: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/travel/Liste/1')
            .then(res => {
                commit('SET_TRAVELS', res.data.data)
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