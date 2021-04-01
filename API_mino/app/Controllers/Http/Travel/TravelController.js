'use strict'

const { validateAll } = use('Validator')
const Travels = use('App/Models/Travel')
const TravelIntermadiateStations = use('App/Models/TravelIntermadiateStation')






class TravelController {

    ///////////////////////////
    /* FOR PLACE RESERVATION */
    //////////////////////////

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
            console.log(CurrentDateInTime + " :::::: " + TotaldepartureDateInTime)




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
    




    

}

module.exports = TravelController
