'use strict'

const Luggages = use('App/Models/LuggageType')







class LuggageController {

    ///////////////////////////
    /* FOR PLACE RESERVATION */
    //////////////////////////

    async getListForAReservation({params, response}){

        // GET THE TRAVEL LIST SUGGESTION
        const ListOfLaggageNotInJson = await Luggages
        .query()
        .where('company_id', params.id)
        .with('luggagePriceByWeightAndSize')
        .fetch()

        const ListOfLaggage = ListOfLaggageNotInJson.toJSON()

        response.json({
            message: 'success',
            data: ListOfLaggage
        })


        
    }



}

module.exports = LuggageController
