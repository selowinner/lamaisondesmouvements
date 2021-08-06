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
    /* FOR LUGGAGE EXPREDITION 
   ----- a refaire-------*/
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






    ///////////////////////////
    /* FOR COMPANIES STATIONS */
    //////////////////////////

    async addLuggage({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            denomination: 'required', 
            description: 'required',
            min_weight: 'required', 
            max_weight: 'required',
            min_size: 'required',
            max_size: 'required', 
            unit_price: 'required',
            company_id: 'required',
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }


        // LUGGAGE TYPE ADDING
        // Verify if this luggage is alway registred
        const exittLuggage = await Luggages
        .query()
        .where('denomination', body.denomination)
        .first()

        let newLuggage

        if (exittLuggage) {
            newLuggage = exittLuggage.toJSON()
        }else{
            // LUGGAGE TYPE ADDING
            const luggageData = new Object()
            luggageData.denomination = body.denomination
            luggageData.description = body.description
            luggageData.company_id = body.company_id
            newLuggage = await Luggages.create(luggageData)
        }
        
        // PRICE BY SIYE AND OTHER ADDING
        const PriceAndOtherData = new Object()
        PriceAndOtherData.min_weight = body.min_weight
        PriceAndOtherData.max_weight = body.max_weight
        PriceAndOtherData.min_size = body.min_size
        PriceAndOtherData.max_size = body.max_size
        PriceAndOtherData.unit_price = body.unit_price
        PriceAndOtherData.luggage_type_id = newLuggage.id

        const newPriceAndOther= await LuggagesPriseBy.create(PriceAndOtherData)

        // response
        response.json({
            message: 'success',
        })  
         
       
       
    
    }

    async getListOfLuggage({params, response}){

        // GET LUGGAGE PRISE
        const ListOfLaggageNotInJson = await LuggagesPriseBy
        .query()
        .innerJoin('luggage_types', 'luggage_types.id', 'luggage_price_by_weight_and_sizes.luggage_type_id')
        .select('luggage_price_by_weight_and_sizes.id', 'min_weight', 'max_weight','min_size', 'max_size', 'unit_price',
                'luggage_type_id', 'denomination','description')
        .where('luggage_types.company_id', params.id)
        .fetch()

        // "id": 1,
        //     "min_weight": 15,
        //     "max_weight": 50,
        //     "min_size": 1,
        //     "max_size": 2,
        //     "unit_price": 1500,
        //     "luggage_type_id": 1,
        //     "created_at": null,
        //     "updated_at": null,
        //     "denomination": "Régime de Banane",
        //     "description": "truck y'a banane dessus là",

        const ListOfLaggagePrices = ListOfLaggageNotInJson.toJSON()

        response.json({
            message: 'success',
            data: ListOfLaggagePrices
        })


        
    }

    
    async updateLuggage({request, response}){

        // GET DATA
        const body = request.all()

        let TheLuggagetype
        let ThepriceBy
        
        if (body.denomination || body.description) {
            const updatedata1 = {
                denomination: body.denomination,
                description: body.description
            }
            TheLuggagetype = await Luggages.find(body.luggage_type_id)
            TheLuggagetype.merge(updatedata1)
            await TheLuggagetype.save()
        }

        if (body.min_weight || body.max_weight || body.min_size || body.max_size || body.unit_price) {
            const updatedata2 = {
                min_weight: body.min_weight,
                max_weight: body.max_weight,
                min_size: body.min_size,
                max_size: body.max_size,
                unit_price: body.unit_price,
            }

            console.log(body.id);
            ThepriceBy  = await LuggagesPriseBy.find(body.id)
            ThepriceBy.merge(updatedata2)
            await ThepriceBy.save()
        }

        if (TheLuggagetype || ThepriceBy) {
            return { message: 'success' }
        }else{
            return { message: 'Aucune modification éffectuée' }
        }

    }


    async CancelLuggage({params, response}){

        //  // GET DATA
        //  const body = request.all()
        
        //  // DATA VALIDATION         
        //  const rules = {
        //      id: 'required', 
        //  }
        //  const bodyValidation = await validateAll(body, rules)
        //  if (bodyValidation.fails()) {
        //      return { message: 'vous avez manqué de remplir un champs obligation' }
        //  }

        // DELETE LUGGAGE PRISE FOR THIS LUGGAGE TYPE
        const ListOfLaggageNotInJson = await LuggagesPriseBy
        .query()
        .where('luggage_type_id', params.id)
        .fetch()
        const ListOfLaggagePrices = ListOfLaggageNotInJson.toJSON()
        for (let index = 0; index < ListOfLaggagePrices.length; index++) {
            const post = await LuggagesPriseBy.find(ListOfLaggagePrices[index].id)  
            post.delete() 
        }

        // DELETE LUGGAGE TYPE
        const todelete = await Luggages.find(params.id)  
        todelete.delete() 


        // RESPONSE
         response.json({
            message: 'success'
        })
    }




}

module.exports = LuggageController
