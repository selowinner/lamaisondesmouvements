'use strict'

const { validateAll } = use('Validator')
const Travels = use('App/Models/Travel')
const Tickets = use('App/Models/Ticket')
const ReservationReceipt = use('App/Models/ReservationReceipt')





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


        // TIME INTERVAL CALCULATION
        const departure_time = body.departure_time 
        const heure = departure_time.substr(0, 2)
        const departure_time_proposition_limit = parseInt(heure) + 1 + departure_time.substr(2)

         // GET THE PRINCIPAL TRAVEL LIST
        const pricipalTravelListeNotInJson = await Travels
        .query()
        .where('departure_date', body.departure_date)
        .where('departure_place', body.departure_place)
        .where('destination', body.destination)
        .whereBetween('departure_time', [departure_time,  departure_time_proposition_limit])
        .with('company')
        .select('id', 'place_price')
        .fetch() 
        // chercher à parfaire la requête pour limité la liste des informations pour chaque voyage

        const pricipalTtravelListe = pricipalTravelListeNotInJson.toJSON()


        // GET THE TRAVEL LIST SUGGESTION
        const SuggestionTravelListeNotInJson = await Travels
        .query()
        .where('departure_date', body.departure_date)
        .where('departure_place', body.departure_place)
        .where('destination', body.destination)
        .whereNotBetween('departure_time', [departure_time,  departure_time_proposition_limit])
        .with('company')
        .select('id', 'place_price')
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

module.exports = TravelController
