// import travel from "../../data/travel"
import Vue from 'vue'
const state = {
  travels : [],
  travel_analytics : '',
}



const getters = {
    Travels: state => {
        let travelListe = state.travels.map(travel => {
            // convert the depparture time
            let dayInLetter = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
            let MonthInLetter = ['', 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
            var date = new Date(travel.departure_date);
            // For the day
            var dayInNum = date.getDate()
            var dayInNumber = date.getDay()
            var day = dayInLetter[dayInNumber]
            // For the month
            var month = MonthInLetter[date.getMonth()+1]

            var year = date.getFullYear();
            // var month = date.getMonth()+1;
            var date_of_departure= day+" "+dayInNum+" "+month+" "+year;

            let gain = travel.place_price * travel.reservedPlaceNumber
            let restPlace = travel.place_to_sell_by_mino_number - travel.reservedPlaceNumber
            return {
                id: travel.id,
                destination: travel.destination,
                departure_date: date_of_departure,
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
    },


    TravelAnalytics: state => {
        let trave_analytic = state.travel_analytics

        return trave_analytic
    },

}


const mutations = {

    SET_TRAVELS (state, data){
        state.travels = data
    },

    SET_TRAVEL_ANALYTICS (state, data){
        state.travel_analytics = data
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
    },

    init_travel_analitic: ({commit}) => {
        Vue.prototype.$http
            .get('http://127.0.0.1:3333/travel/getTravelAnalytics/1')
            .then(res => {
                commit('SET_TRAVEL_ANALYTICS', res.data.data)
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