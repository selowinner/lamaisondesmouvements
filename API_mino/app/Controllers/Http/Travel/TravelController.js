'use strict'

const { validateAll } = use('Validator')
const Travels = use('App/Models/Travel')
const TravelIntermadiateStations = use('App/Models/TravelIntermadiateStation')
const TravelPlaces = use('App/Models/TravelPlace')






class TravelController {

    /////////////////////////////////////////////
    /* FOR PLACE RESERVATION IN THE MOBILE APP */
    ////////////////////////////////////////////

    async getListForAReservation({request, response}){


        const body = request.only(['departure_date', 'departure_place', 'destination', 'departure_time'])
        
        // DATA VALIDATION
        const rules = {
            departure_date: 'required',
            departure_place: 'required',
            destination: 'required',
            departure_time: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs' }
          
        }


        // VERIFY IF LE INPUT TIME IS NOT A PASSED TIME OR PASSED DATE
        // Convert input date to second
        const departureDate = body.departure_date + "T" + body.departure_time
        const TotaldepartureDate = new Date(departureDate);
        const TotaldepartureDateInTime = Math.round(TotaldepartureDate.getTime() / 1000)
        // Currente time in second
        const CurrentDate =  new Date()
        const CurrentDateInTime = Math.round(CurrentDate.getTime() / 1000)
        // verification
        if (CurrentDateInTime > TotaldepartureDateInTime) {
            
            // response
            response.json({
                message: 'Les départs pour de cette heure ont déjà été effectués',
            })
            // console.log(CurrentDateInTime + " :::::: " + TotaldepartureDateInTime)




        }else{



            // TIME INTERVAL CALCULATION
        const departure_time = body.departure_time 
        const heure = departure_time.substr(0, 2)
        const departure_time_proposition_limit = parseInt(heure) + 1 + departure_time.substr(2)

         // GET THE PRINCIPAL TRAVEL LIST
        const pricipalTravelListeNotInJson = await Travels
        .query()
        .innerJoin('Companies', 'companies.id', 'Travels.company_id')
        .where('departure_date', body.departure_date)
        .where('departure_place', body.departure_place)
        .where('destination', body.destination)
        .whereBetween('departure_time', [departure_time,  departure_time_proposition_limit])
        .select('Travels.id', 'Travels.place_price', 'companies.denomination')
        .fetch() 
        // chercher à parfaire la requête pour limité la liste des informations pour chaque voyage

        const pricipalTtravelListe = pricipalTravelListeNotInJson.toJSON()


        // GET THE TRAVEL LIST SUGGESTION
        const SuggestionTravelListeNotInJson = await Travels
        .query()
        .innerJoin('Companies', 'Companies.id', 'Travels.company_id')
        .where('departure_date', body.departure_date)
        .where('departure_place', body.departure_place)
        .where('destination', body.destination)
        .whereNotBetween('departure_time', [departure_time,  departure_time_proposition_limit])
        .select('Travels.id', 'Travels.place_price', 'Travels.departure_time', 'Companies.denomination')
        .fetch() 

        const SuggestionTtravelListe = SuggestionTravelListeNotInJson.toJSON()


        // LIST OF TRAVEL RETURN
        const travelListe = new Object()
        travelListe.pricipal = pricipalTtravelListe
        travelListe.Suggestion =  SuggestionTtravelListe
        
        response.json({
            message: 'success',
            data: travelListe
        })


        }


        
    }


    async getTodayListOfCountryForAReservation({response}){

        // Currente time
        const CurrentDate =  new Date() 
        const currentMonthPlusOne = CurrentDate.getMonth()+1
        const kkk = CurrentDate.getFullYear() + "-" + currentMonthPlusOne  + "-" + CurrentDate.getDate() 
 
        // GET THE TRAVEL LIST SUGGESTION
        const ListOfCountryNotInJson = await Travels
        .query()
        .where('departure_date', kkk)
        .select('departure_place')
        .groupBy('departure_place')
        .fetch()

        const ListOfCountry = ListOfCountryNotInJson.toJSON()

        response.json({
            message: 'success',
            data: ListOfCountry
        })
        

        
    }


    async getWeekListOfCountryForAReservation({response}){

        // Currente time
        const CurrentDate =  new Date() 
        const currentMonthPlusOne = CurrentDate.getMonth()+1
        const CurrentDateInTime = CurrentDate.getFullYear() + "-" + currentMonthPlusOne  + "-" + CurrentDate.getDate() 
       
        // GET THE TRAVEL LIST SUGGESTION
        const ListOfCountryNotInJson = await Travels
        .query()
        .whereBetween('departure_date', [CurrentDateInTime,  "2050-07-05"])
        .select('departure_place')
        .groupBy('departure_place')
        .fetch()

        const ListOfCountry = ListOfCountryNotInJson.toJSON()

        response.json({
            message: 'success',
            data: ListOfCountry
        })
        

        
    }


    async getListIntermadiateStationForAReservation({request, response}){

        const body = request.only(['travel_id'])

       // GET THE TRAVEL INTERMADIATES STATIONS LIST SUGGESTION
       const IntermadiateStationNotInJson = await TravelIntermadiateStations
       .query()
       .where('travel_id', body.travel_id)
       .select('id', 'station_name')
       .fetch()

       const IntermadiateStation = IntermadiateStationNotInJson.toJSON()

       response.json({
           message: 'success',
           data: IntermadiateStation
       })

        

        
    }
    




    ///////////////////////////////////////////////////////////
    /* FOR TRAVEL DECLARATION IN THE COMPANIES SOFTWARE TOOL */
    ///////////////////////////////////////////////////////////

    async addTravel({request, response}){


        const body = request.all
        
        // DATA VALIDATION
        const rules = {
            car_informations: 'required',
            car_matriculation: 'required',
            departure_place: 'required',
            destination: 'required',
            departure_time: 'required',
            departure_date: 'required',
            // place_to_sell_by_mino_number: 'required',
            total_car_place_number: 'required',
            place_price: 'required',
            // annulation_of_reservation_Limit_Time: 'required',
            company_id: 'required',
            user_id: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs' }
        }


        if (body.place_to_sell_by_mino_number) {
            const option1Travel = new Object()
            option1Travel.car_informations = body.car_informations
            option1Travel.car_matriculation = body.car_matriculation
            option1Travel.departure_place = body.departure_place
            option1Travel.destination = body.destination
            option1Travel.departure_time = body.departure_time

            option1Travel.departure_date = body.departure_date
            option1Travel.place_to_sell_by_mino_number = body.place_to_sell_by_mino_number
            option1Travel.total_car_place_number = body.total_car_place_number
            option1Travel.place_price = body.place_price

            option1Travel.annulation_of_reservation_Limit_Time = "10:00:00"
            option1Travel.company_id = body.company_id
            option1Travel.user_id = body.user_id

            const newoption1Travel = await Travels.create(option1Travel)



            // FAIRE UN AJOUT MULTIPLE DE CHAQUE PLACE

            for (let index = 1; index < place_to_sell_by_mino_number; index++) {
                const element = array[index];

                let travelPlace = new Object()
                travelPlace.place = index
                travelPlace.travel_id = newoption1Travel.id

                const newTravelPlace = await TravelPlaces.create(travelPlace)

                
            }

            

            // RESPONSE
            response.json({
                message: 'success',
                data: {newoption1Travel}
            })


        } else {


            const option1Travel = new Object()
            option2Travel.car_informations = body.car_informations
            option2Travel.car_matriculation = body.car_matriculation
            option2Travel.departure_place = body.departure_place
            option2Travel.destination = body.destination
            option2Travel.departure_time = body.departure_time

            option2Travel.departure_date = body.departure_date
            option2Travel.place_to_sell_by_mino_number = body.total_car_place_number
            option2Travel.total_car_place_number = body.total_car_place_number
            option2Travel.place_price = body.place_price

            option2Travel.annulation_of_reservation_Limit_Time = "20:00:00"
            option2Travel.company_id = body.company_id
            option2Travel.user_id = body.user_id

            const newoption2Travel = await Travels.create(option2Travel)

            // FAIRE UN AJOUT MULTIPLE DE CHAQUE PLACE


            for (let index = 1; index < place_to_sell_by_mino_number; index++) {
            const element = array[index];

            let travelPlace = new Object()
            travelPlace.place = index
            travelPlace.travel_id = newoption2Travel.id

            const newTravelPlace = await TravelPlaces.create(travelPlace)

            
            }



             // RESPONSE
             response.json({
                message: 'success',
                data: {newoption2Travel}
            })
            
        }

        


        
    }


    async getListeOfTravel({params, response}){

 
        // GET THE TRAVEL LIST 
        const ListOfTravelNotInJson = await Travels
        .query()
        .where('company_id', params.id)
        .fetch()

        const ListOfTravel = ListOfTravelNotInJson.toJSON()

        for (let i = 0; i < ListOfTravel.length; i++) {
            const reservedPlaceNumber = await TravelPlaces
                .query()
                .where('travel_id', ListOfTravel[i].id)
                .where('reservation_state', 1)
                .count()

            ListOfTravel[i].reservedPlaceNumber = reservedPlaceNumber[0]['count(*)']      
            
        }

        response.json({
            message: 'success',
            data: ListOfTravel
        })
        

        
    }



}

module.exports = TravelController
