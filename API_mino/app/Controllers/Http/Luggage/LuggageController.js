'use strict'

const { validateAll } = use('Validator')
const Luggages = use('App/Models/LuggageType')
const LuggagesPriseBy = use('App/Models/LuggagePriceByWeightAndSize')







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



     ///////////////////////////
    /* FOR LUGGAGE EXPREDITION */
    //////////////////////////

    async getListOfLuggageNature({response}){

        // GET LIST OF AVAILABLE LUGGAGE NATURE
        const ListOfLaggageNotInJson = await Luggages
        .query().distinct('denomination').select('denomination').fetch()

        const ListOfLaggage = ListOfLaggageNotInJson.toJSON()

        response.json({
            message: 'success',
            data: ListOfLaggage
        })


        
    }

    async getListOfLuggagePrice({request, response}){

        //GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            LuggageType_id: 'required',
            company_id: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        // GET LUGGAGE PRISE
        const ListOfLaggageNotInJson = await LuggagesPriseBy
        .query()
        .innerJoin('luggage_types', 'luggage_types.id', 'luggage_price_by_weight_and_sizes.luggage_type_id')
        .where('luggage_price_by_weight_and_sizes.luggage_type_id', body.LuggageType_id)
        .where('luggage_types.company_id', body.company_id)
        .fetch()


        const ListOfLaggagePrices = ListOfLaggageNotInJson.toJSON()

        response.json({
            message: 'success',
            data: ListOfLaggagePrices
        })


        
    }




}

module.exports = LuggageController
